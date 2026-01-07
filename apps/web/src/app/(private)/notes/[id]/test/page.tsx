'use client';

import { NoteEditorTestView } from '@/features/notes/NoteEditorTestView';
import { use } from 'react';

export default function NoteTestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <NoteEditorTestView noteId={id} />;
}
