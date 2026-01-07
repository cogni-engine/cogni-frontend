import * as Y from 'yjs';

/**
 * Get blockId from node, checking common attribute name variations
 */
function getBlockId(node: Y.XmlElement): string | undefined {
  const attrs = node.getAttributes();
  return (
    (attrs.blockId as string | undefined) ||
    (attrs['block-id'] as string | undefined) ||
    (attrs['data-block-id'] as string | undefined) ||
    (attrs.id as string | undefined)
  );
}

/**
 * Extract text content of element's children (inline content)
 */
function xmlElementChildrenToText(element: Y.XmlElement): string {
  const parts: string[] = [];

  element.forEach(node => {
    if (node instanceof Y.XmlText) {
      parts.push(xmlTextToMarkdown(node));
    } else if (node instanceof Y.XmlElement) {
      const nodeName = node.nodeName;

      // Handle inline mention nodes
      if (nodeName === 'mention') {
        const id = node.getAttribute('id') as string;
        const label = node.getAttribute('label') as string;
        const workspaceMemberId = node.getAttribute(
          'workspaceMemberId'
        ) as string;
        let mentionStr = `[@ id="${id || ''}" label="${label || ''}"`;
        if (workspaceMemberId) {
          mentionStr += ` workspaceMemberId="${workspaceMemberId}"`;
        }
        mentionStr += ']';
        parts.push(mentionStr);
      } else if (nodeName === 'noteMention') {
        const id = node.getAttribute('id') as string;
        const label = node.getAttribute('label') as string;
        const noteId = node.getAttribute('noteId') as string;
        let mentionStr = `[# id="${id || ''}" label="${label || ''}"`;
        if (noteId) {
          mentionStr += ` noteId="${noteId}"`;
        }
        mentionStr += ']';
        parts.push(mentionStr);
      } else if (nodeName === 'fileMention') {
        const label = node.getAttribute('label') as string;
        parts.push(`📎${label || ''}`);
      } else {
        // For nested elements (like paragraph inside listItem), recurse
        parts.push(xmlElementChildrenToText(node));
      }
    }
  });

  return parts.join('');
}

/**
 * Extract text from Y.XmlText with inline formatting (bold, italic, strike)
 */
function xmlTextToMarkdown(xmlText: Y.XmlText): string {
  const delta = xmlText.toDelta();
  let result = '';

  for (const op of delta) {
    if (typeof op.insert === 'string') {
      let text = op.insert;
      const attrs = op.attributes || {};

      // Apply formatting in correct order (innermost first)
      if (attrs.strike) {
        text = `~~${text}~~`;
      }
      if (attrs.italic) {
        text = `*${text}*`;
      }
      if (attrs.bold) {
        text = `**${text}**`;
      }

      result += text;
    }
  }

  return result;
}

/**
 * Process a list element and return formatted markdown
 */
function processList(
  listElement: Y.XmlElement,
  type: 'bullet' | 'ordered' | 'task',
  indentLevel = 0
): string {
  const items: string[] = [];
  const indent = '  '.repeat(indentLevel);
  let itemNumber = 1;

  listElement.forEach(node => {
    if (node instanceof Y.XmlElement) {
      const nodeName = node.nodeName;

      if (nodeName === 'listItem') {
        const content = xmlElementChildrenToText(node);
        if (type === 'ordered') {
          items.push(`${indent}${itemNumber}. ${content}`);
          itemNumber++;
        } else {
          items.push(`${indent}- ${content}`);
        }

        // Check for nested lists
        node.forEach(child => {
          if (child instanceof Y.XmlElement) {
            const childName = child.nodeName;
            if (
              childName === 'bulletList' ||
              childName === 'orderedList' ||
              childName === 'taskList'
            ) {
              const nestedType =
                childName === 'orderedList'
                  ? 'ordered'
                  : childName === 'taskList'
                    ? 'task'
                    : 'bullet';
              items.push(processList(child, nestedType, indentLevel + 1));
            }
          }
        });
      } else if (nodeName === 'taskItem') {
        const checkedAttr = node.getAttribute('checked') as unknown;
        const checked = checkedAttr === true || checkedAttr === 'true';
        const content = xmlElementChildrenToText(node);
        items.push(`${indent}- [${checked ? 'x' : ' '}] ${content}`);

        // Check for nested lists
        node.forEach(child => {
          if (child instanceof Y.XmlElement) {
            const childName = child.nodeName;
            if (
              childName === 'bulletList' ||
              childName === 'orderedList' ||
              childName === 'taskList'
            ) {
              const nestedType =
                childName === 'orderedList'
                  ? 'ordered'
                  : childName === 'taskList'
                    ? 'task'
                    : 'bullet';
              items.push(processList(child, nestedType, indentLevel + 1));
            }
          }
        });
      }
    }
  });

  return items.join('\n');
}

/**
 * Extract annotated markdown from Y.Doc with structural comments
 * Adds block ID comments for top-level blocks
 *
 * @param ydoc - The Y.Doc instance from the editor
 * @returns Annotated markdown string with block ID comments
 */
export function yDocToAnnotatedMarkdown(ydoc: Y.Doc): string {
  const xmlFragment = ydoc.getXmlFragment('default');
  const parts: string[] = [];

  xmlFragment.forEach(node => {
    if (node instanceof Y.XmlText) {
      const text = xmlTextToMarkdown(node);
      if (text) {
        parts.push(`<!-- text -->`);
        parts.push(text);
      }
    } else if (node instanceof Y.XmlElement) {
      const tagName = node.nodeName;
      const blockId = getBlockId(node);
      const childText = xmlElementChildrenToText(node);
      const idPart = blockId ? ` id="${blockId}"` : '';

      switch (tagName) {
        case 'heading': {
          const levelAttr = node.getAttribute('level');
          const level =
            typeof levelAttr === 'number'
              ? levelAttr
              : parseInt(String(levelAttr) || '1', 10);
          parts.push(`<!-- heading${idPart} level=${level} -->`);
          parts.push('#'.repeat(level) + ' ' + childText);
          break;
        }
        case 'paragraph':
          parts.push(`<!-- paragraph${idPart} -->`);
          parts.push(childText);
          break;
        case 'bulletList':
          parts.push(`<!-- bulletList${idPart} -->`);
          parts.push(processList(node, 'bullet'));
          break;
        case 'orderedList':
          parts.push(`<!-- orderedList${idPart} -->`);
          parts.push(processList(node, 'ordered'));
          break;
        case 'taskList':
          parts.push(`<!-- taskList${idPart} -->`);
          parts.push(processList(node, 'task'));
          break;
        case 'listItem': {
          parts.push(`<!-- listItem${idPart} -->`);
          parts.push('- ' + childText);
          break;
        }
        case 'taskItem': {
          const checkedAttr = node.getAttribute('checked') as unknown;
          const checked = checkedAttr === true || checkedAttr === 'true';
          parts.push(`<!-- taskItem${idPart} checked=${checked} -->`);
          parts.push((checked ? '- [x] ' : '- [ ] ') + childText);
          break;
        }
        case 'codeBlock':
          parts.push(`<!-- codeBlock${idPart} -->`);
          parts.push('```\n' + childText + '\n```');
          break;
        case 'blockquote':
          parts.push(`<!-- blockquote${idPart} -->`);
          parts.push('> ' + childText);
          break;
        case 'mention': {
          const id = node.getAttribute('id') as string;
          const label = node.getAttribute('label') as string;
          const workspaceMemberId = node.getAttribute(
            'workspaceMemberId'
          ) as string;
          parts.push(
            `<!-- mention id="${id}" workspaceMemberId="${workspaceMemberId}" -->`
          );
          let mentionStr = `[@ id="${id || ''}" label="${label || ''}"`;
          if (workspaceMemberId) {
            mentionStr += ` workspaceMemberId="${workspaceMemberId}"`;
          }
          mentionStr += ']';
          parts.push(mentionStr);
          break;
        }
        case 'noteMention': {
          const id = node.getAttribute('id') as string;
          const label = node.getAttribute('label') as string;
          const noteId = node.getAttribute('noteId') as string;
          parts.push(`<!-- noteMention id="${id}" noteId="${noteId}" -->`);
          let mentionStr = `[# id="${id || ''}" label="${label || ''}"`;
          if (noteId) {
            mentionStr += ` noteId="${noteId}"`;
          }
          mentionStr += ']';
          parts.push(mentionStr);
          break;
        }
        case 'fileMention': {
          const label = node.getAttribute('label') as string;
          const fileId = node.getAttribute('id') as string;
          parts.push(`<!-- fileMention id="${fileId}" -->`);
          parts.push(`📎${label || ''}`);
          break;
        }
        default:
          parts.push(`<!-- ${tagName}${idPart} -->`);
          if (childText) parts.push(childText);
      }
    }
  });

  return parts
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
