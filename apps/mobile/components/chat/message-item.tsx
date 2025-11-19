import { View, Text, StyleSheet, Animated } from 'react-native';
import { Message, AIMessage, WorkspaceMember, Note } from '@cogni/types';
import { useEffect, useRef } from 'react';

type MessageItemProps = {
  message: Message | AIMessage;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
  isStreaming?: boolean;
};

// Streaming cursor component
function StreamingCursor() {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 530,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 530,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View style={[styles.cursor, { opacity }]}>
      <View style={styles.cursorInner} />
    </Animated.View>
  );
}

export default function MessageItem({
  message,
  workspaceMembers = [],
  workspaceNotes = [],
  isStreaming = false,
}: MessageItemProps) {
  // Assistant messages
  if (message.role === 'assistant') {
    return (
      <View style={styles.assistantContainer}>
        <View style={styles.assistantTextRow}>
          <Text style={styles.assistantText}>{message.content}</Text>
          {isStreaming && <StreamingCursor />}
        </View>
      </View>
    );
  }

  // User messages - right-aligned ChatGPT style
  const hasFiles =
    'files' in message && message.files && message.files.length > 0;

  return (
    <View style={styles.userContainer}>
      <View style={styles.userMessageWrapper}>
        {/* File attachments */}
        {hasFiles && 'files' in message && (
          <View style={styles.filesContainer}>
            {message.files?.map((file, index) => (
              <View key={index} style={styles.fileItem}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {file.original_filename}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Text content */}
        {message.content && (
          <View style={styles.userBubble}>
            <Text style={styles.userText}>{message.content}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  assistantContainer: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  assistantTextRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  assistantText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#ffffff',
  },
  cursor: {
    marginLeft: 2,
    marginBottom: 2,
  },
  cursorInner: {
    width: 8,
    height: 16,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  userContainer: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  userMessageWrapper: {
    maxWidth: '75%',
    alignItems: 'flex-end',
    gap: 8,
  },
  filesContainer: {
    width: '100%',
    gap: 8,
  },
  fileItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  fileName: {
    fontSize: 12,
    color: '#ffffff',
  },
  userBubble: {
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 8,
  },
  userText: {
    fontSize: 14,
    color: '#ffffff',
  },
});

