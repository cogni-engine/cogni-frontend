import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import { useAuthContext } from '@/hooks/use-auth-context';
import React, { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useChat } from '@cogni/api';
import { useThreadContext } from '@/contexts/thread-context';
import ChatContainer, {
  ChatContainerRef,
} from '@/components/chat/chat-container';
import ChatInput from '@/components/chat/chat-input';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { Config } from '@/constants/config';
import Header from '@/components/layout/header';
import ThreadSidebar from '@/components/thread-sidebar';

export default function HomeScreen() {
  const { isLoading: authLoading, isLoggedIn, session } = useAuthContext();
  const { workspaceId, isLoading: workspaceLoading, error: workspaceError } = useWorkspaceId();
  const { selectedThreadId, setSelectedThreadId } = useThreadContext();
  const chatContainerRef = useRef<ChatContainerRef>(null);
  const [isThreadSidebarOpen, setIsThreadSidebarOpen] = React.useState(false);

  // Create auth headers for API requests (send as cookies to Python backend)
  const authHeaders = React.useMemo((): Record<string, string> => {
    const cookies: string[] = [];
    if (session?.user?.id) {
      cookies.push(`current_user_id=${session.user.id}`);
    }
    if (workspaceId) {
      cookies.push(`personal_workspace_id=${workspaceId}`);
    }
    
    if (cookies.length === 0) {
      return {};
    }
    
    return {
      'Cookie': cookies.join('; ')
    };
  }, [session?.user?.id, workspaceId]);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.replace('/login' as any);
    }
  }, [authLoading, isLoggedIn]);

  // Debug logging
  useEffect(() => {
    console.log('🏠 Home Screen State:', {
      authLoading,
      isLoggedIn,
      workspaceLoading,
      workspaceId,
      workspaceError: workspaceError?.message,
      apiBaseUrl: Config.apiBaseUrl,
      authHeaders,
    });
  }, [authLoading, isLoggedIn, workspaceLoading, workspaceId, workspaceError, authHeaders]);

  // Pass thread selection state to useChat
  const chat = useChat({
    workspaceId,
    selectedThreadId,
    onThreadSelect: setSelectedThreadId,
    apiBaseUrl: 'https://cogni-backend-kur6.onrender.com/api',
    headers: authHeaders,
  });

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (chat.messages.length > 0) {
      // Small delay to ensure the message is rendered before scrolling
      setTimeout(() => {
        chatContainerRef.current?.scrollToEnd();
      }, 100);
    }
  }, [chat.messages]);

  if (authLoading || workspaceLoading || !workspaceId) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#ffffff' />
      </ThemedView>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  const handleCreateThread = async () => {
    try {
      const now = new Date();
      const dateTimeTitle = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      const newThread = await chat.createThread(dateTimeTitle);
      if (newThread?.id) {
        setSelectedThreadId(newThread.id);
      }
    } catch (error) {
      console.error('Failed to create thread:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Thread Sidebar */}
      <ThreadSidebar
        isOpen={isThreadSidebarOpen}
        onClose={() => setIsThreadSidebarOpen(false)}
        threads={chat.threads}
        selectedThreadId={selectedThreadId}
        onSelectThread={setSelectedThreadId}
        onUpdateThread={async (id, title) => {
          await chat.updateThread(id, title);
        }}
        onDeleteThread={async (id) => {
          await chat.deleteThread(id);
        }}
      />

      {/* Custom Header */}
      <Header
        showThreadControls={true}
        onMenuPress={() => setIsThreadSidebarOpen(true)}
        onNewThreadPress={handleCreateThread}
        onNotificationsPress={() => console.log('Notifications pressed')}
      />

      {/* Top gradient overlay */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
        style={styles.topGradient}
        pointerEvents="none"
      />

      <ChatContainer
        ref={chatContainerRef}
        messages={chat.messages as any}
        workspaceMembers={[]}
        workspaceNotes={[]}
        isStreaming={chat.isSending}
      />

      <ChatInput
        onSend={(
          content: string,
          fileIds?: number[],
          mentionedMemberIds?: number[],
          mentionedNoteIds?: number[]
        ) => {
          void chat.sendMessage({
            content,
            fileIds,
            mentionedMemberIds,
            mentionedNoteIds,
          });
        }}
        onStop={chat.stopStream}
        isLoading={chat.isSending}
        canStop={true}
        threadId={selectedThreadId}
        workspaceMembers={[]}
        workspaceNotes={[]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 128,
    zIndex: 50,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
});
