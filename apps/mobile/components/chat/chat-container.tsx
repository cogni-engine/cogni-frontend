import { View, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { forwardRef, useRef, useImperativeHandle } from 'react';
import { Message, AIMessage, WorkspaceMember, Note } from '@cogni/types';
import MessageItem from './message-item';
import EmptyState from './empty-state';

type ChatContainerProps = {
  messages: Message[] | AIMessage[];
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
  isStreaming?: boolean;
};

export type ChatContainerRef = {
  scrollToEnd: () => void;
};

const ChatContainer = forwardRef<ChatContainerRef, ChatContainerProps>(
  ({ messages, workspaceMembers = [], workspaceNotes = [], isStreaming = false }, ref) => {
    const flatListRef = useRef<FlatList>(null);

    useImperativeHandle(ref, () => ({
      scrollToEnd: () => {
        if (flatListRef.current && messages.length > 0) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      },
    }));

    const renderItem: ListRenderItem<Message | AIMessage> = ({ item, index }) => {
      // Show streaming cursor on last message if it's an assistant message and streaming is active
      const isLastMessage = index === messages.length - 1;
      const showStreaming = isLastMessage && isStreaming && item.role === 'assistant';
      
      return (
        <MessageItem
          message={item}
          workspaceMembers={workspaceMembers}
          workspaceNotes={workspaceNotes}
          isStreaming={showStreaming}
        />
      );
    };

    const keyExtractor = (item: Message | AIMessage, index: number) => {
      if ('id' in item) {
        return typeof item.id === 'string' ? item.id : `msg-${item.id}`;
      }
      return `msg-${index}`;
    };

    if (messages.length === 0) {
      return (
        <View style={styles.container}>
          <EmptyState />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToEnd({ animated: true });
            }
          }}
        />
      </View>
    );
  }
);

ChatContainer.displayName = 'ChatContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    paddingTop: 80,
    paddingBottom: 24,
    flexGrow: 1,
  },
});

export default ChatContainer;

