'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useWorkspaceChat } from '@/hooks/useWorkspaceChat';
import { createClient } from '@/lib/supabase/browserClient';
import { ChatInput, type ChatInputRef } from '@/components/chat-input';
import GlassButton from '@/components/glass-design/GlassButton';
import WorkspaceMessageList from '@/features/workspace/components/WorkspaceMessageList';
import { ChevronDown } from 'lucide-react';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import { useNotes } from '@cogni/api';
import ScrollableView from '@/components/layout/ScrollableView';

export default function WorkspaceChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const workspaceId = parseInt(params.id as string);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const prevMessageCountRef = useRef(0);
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLoadingMoreRef = useRef(false);
  const prevScrollHeightRef = useRef(0);
  const lastScrollTopRef = useRef(0);
  const hasScrolledUpRef = useRef(false);
  const prevMessagesRef = useRef<typeof messages>([]);
  const chatInputRef = useRef<ChatInputRef>(null);
  const [highlightedMessageId, setHighlightedMessageId] = useState<
    number | null
  >(null);
  const [replyingTo, setReplyingTo] = useState<{
    id: number;
    text: string;
    authorName?: string;
  } | null>(null);
  const {
    messages,
    sendMessage: originalSendMessage,
    isLoading,
    isLoadingMore,
    error,
    isConnected,
    loadMoreMessages,
    hasMoreMessages,
  } = useWorkspaceChat(workspaceId);

  // Fetch workspace members for mentions
  const { members } = useWorkspaceMembers(workspaceId);

  // Defer fetching workspace notes until after initial render to improve performance
  const [enableNotesFetch, setEnableNotesFetch] = useState(false);

  // Enable notes fetch after messages are loaded
  useEffect(() => {
    if (messages.length > 0 || !isLoading) {
      // Defer by 200ms to let messages render first
      const timer = setTimeout(() => {
        setEnableNotesFetch(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [messages.length, isLoading]);

  const { notes: workspaceNotes } = useNotes({
    workspaceId: workspaceId,
    includeDeleted: false,
    autoFetch: enableNotesFetch,
  });

  // Scroll to bottom function
  // Note: With column-reverse, bottom is at scrollTop = 0
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior,
      });
    }
  }, []);

  // Track when we send a message to avoid conflicts with useEffect scroll logic
  const sendingMessageRef = useRef(false);

  // Wrap sendMessage to scroll to bottom after sending
  const sendMessage = useCallback(
    async (
      text: string,
      workspaceFileIds?: number[],
      mentionedMemberIds?: number[],
      mentionedNoteIds?: number[]
    ) => {
      sendingMessageRef.current = true;
      const replyToId = replyingTo?.id ?? null;
      try {
        await originalSendMessage(
          text,
          replyToId,
          workspaceFileIds,
          mentionedMemberIds,
          mentionedNoteIds
        );
        // Clear reply state after sending
        setReplyingTo(null);
        // Scroll to bottom after sending message
        // Use a delay to ensure the message is in the DOM via realtime
        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
          }
          sendingMessageRef.current = false;
        }, 100);
      } catch (error) {
        sendingMessageRef.current = false;
        throw error;
      }
    },
    [originalSendMessage, replyingTo]
  );

  // Handle reply action
  const handleReply = useCallback(
    (messageId: number) => {
      const message = messages.find(m => m.id === messageId);
      if (message) {
        const authorName =
          message.workspace_member?.user_profile?.name ?? 'Unknown';
        setReplyingTo({
          id: message.id,
          text: message.text,
          authorName,
        });
        // Focus input after setting reply
        setTimeout(() => {
          chatInputRef.current?.focus();
        }, 100);
      }
    },
    [messages]
  );

  // Cancel reply
  const handleCancelReply = useCallback(() => {
    setReplyingTo(null);
  }, []);

  // Scroll to a specific message by ID
  const scrollToMessage = useCallback((messageId: number) => {
    if (!scrollContainerRef.current) return;

    // Find the message element by data attribute
    const messageElement = scrollContainerRef.current.querySelector(
      `[data-message-id="${messageId}"]`
    ) as HTMLElement;

    if (!messageElement) return;

    // Check if the message is already in view
    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const elementRect = messageElement.getBoundingClientRect();

    // Check if element is visible within the container viewport
    const isInView =
      elementRect.top >= containerRect.top &&
      elementRect.bottom <= containerRect.bottom &&
      elementRect.left >= containerRect.left &&
      elementRect.right <= containerRect.right;

    // Only scroll if not already in view
    if (!isInView) {
      // Use scrollIntoView with block: 'center' to center the message
      // This works well with column-reverse layout
      messageElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });

      // Trigger bounce animation after scroll has started (longer delay for scrolling)
      setTimeout(() => {
        setHighlightedMessageId(messageId);
        // Clear highlight after animation completes
        setTimeout(() => {
          setHighlightedMessageId(null);
        }, 600);
      }, 300);
    } else {
      // Message is already in view - trigger bounce immediately
      setHighlightedMessageId(messageId);
      // Clear highlight after animation completes
      setTimeout(() => {
        setHighlightedMessageId(null);
      }, 600);
    }
  }, []);

  // Listen for navigation commands from mobile app via postMessage
  useEffect(() => {
    const handlePostMessage = (event: MessageEvent) => {
      // Validate origin for security (in production, check specific origins)
      // For mobile WebView, origin might be 'file://' or similar

      try {
        const data = event.data;

        if (data.type === 'NAVIGATE_TO_MESSAGE') {
          const targetWorkspaceId = data.workspaceId;
          const targetMessageId = data.messageId;

          console.log('Received navigation command:', {
            targetWorkspaceId,
            targetMessageId,
          });

          // Check if we're on the right workspace
          if (targetWorkspaceId && targetWorkspaceId !== workspaceId) {
            // Navigate to the correct workspace first
            router.push(
              `/workspace/${targetWorkspaceId}/chat?messageId=${targetMessageId}`
            );
          } else if (targetMessageId) {
            // We're on the right workspace, just scroll to message
            scrollToMessage(targetMessageId);
          }
        }
      } catch (error) {
        // Ignore errors from unrelated postMessage events
        console.debug('Error processing postMessage:', error);
      }
    };

    window.addEventListener('message', handlePostMessage);

    return () => {
      window.removeEventListener('message', handlePostMessage);
    };
  }, [workspaceId, scrollToMessage, router]);

  // Handle navigation from URL query parameters (e.g., from notifications)
  useEffect(() => {
    const messageIdParam = searchParams.get('messageId');

    if (messageIdParam && messages.length > 0) {
      const messageId = parseInt(messageIdParam, 10);

      if (!isNaN(messageId)) {
        // Wait a bit for messages to render
        setTimeout(() => {
          scrollToMessage(messageId);

          // Clear the query parameter after navigating
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete('messageId');
          router.replace(newUrl.pathname + newUrl.search, { scroll: false });
        }, 500);
      }
    }
  }, [searchParams, messages.length, scrollToMessage, router]);

  // Check if user is near bottom (within threshold)
  // Note: With column-reverse, scrollTop 0 or positive small values are at the bottom
  const isNearBottom = useCallback(() => {
    if (!scrollContainerRef.current) {
      return true;
    }
    const container = scrollContainerRef.current;
    const threshold = 1000;
    const scrollTop = container.scrollTop;
    const scrollTopAbs = Math.abs(scrollTop);
    // With column-reverse, bottom is at scrollTop = 0 or small positive values
    // Negative values mean we're scrolled away from bottom (toward top)
    const result = scrollTopAbs <= threshold;
    return result;
  }, []);

  // Check if user is near top (within 800px - triggers earlier for faster loading)
  // Note: With column-reverse, scrollTop can be negative, which means we're at the top
  const isNearTop = useCallback(() => {
    if (!scrollContainerRef.current) return false;
    const container = scrollContainerRef.current;
    const threshold = 800;

    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    // With flex-col-reverse, negative scrollTop means we're scrolled to the top (oldest messages)
    // This is a browser quirk with flex-col-reverse
    // From logs: scrollTop is around -628 to -667 when scrolled up, which means we're near the top
    if (scrollTop < 0) {
      // If scrollTop is negative, we're scrolled up toward older messages
      // The more negative, the more we've scrolled up
      // Trigger if we're scrolled up significantly (absolute value > 200px threshold)
      return Math.abs(scrollTop) > 200;
    }

    // Calculate max scroll position
    const maxScrollTop = scrollHeight - clientHeight;

    // Handle edge case where content is smaller than container
    if (maxScrollTop <= 0) return false;

    // For positive scrollTop, check if we're within threshold of the max scroll
    const distanceFromTop = maxScrollTop - scrollTop;
    return distanceFromTop < threshold;
  }, []);

  // Handle scroll events to show/hide button
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const currentScrollTop = container.scrollTop;

      // Detect if user is scrolling up
      // With column-reverse, increasing scrollTop means scrolling up (away from bottom)
      if (currentScrollTop > lastScrollTopRef.current) {
        hasScrolledUpRef.current = true;
      }

      // Reset scrolled up flag if user reaches near bottom
      if (isNearBottom()) {
        hasScrolledUpRef.current = false;
      }

      lastScrollTopRef.current = currentScrollTop;
      isUserScrollingRef.current = true;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 300); // Increased timeout to be more reliable

      // Check if we should show the scroll button
      const nearBottom = isNearBottom();
      setShowScrollButton(!nearBottom);

      // Check if we're near top and should load more messages
      // With column-reverse, "top" (for loading older messages) is at high scrollTop values
      const nearTop = isNearTop();

      if (
        nearTop &&
        hasMoreMessages &&
        !isLoadingMoreRef.current &&
        !isLoadingMore
      ) {
        isLoadingMoreRef.current = true;
        // Store current scrollHeight to restore position after loading
        prevScrollHeightRef.current = container.scrollHeight;
        loadMoreMessages().finally(() => {
          isLoadingMoreRef.current = false;
        });
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [
    isNearBottom,
    isNearTop,
    hasMoreMessages,
    loadMoreMessages,
    isLoadingMore,
  ]);

  // No initial scroll needed - CSS column-reverse handles it automatically!
  // Removed useLayoutEffect and useEffect for initial scroll

  // Preserve scroll position when messages change (from loading older messages or realtime updates)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const prevMessages = prevMessagesRef.current;

    // Early exit if no messages changed
    if (
      prevMessages.length === messages.length &&
      prevMessages.length > 0 &&
      messages.length > 0 &&
      prevMessages[0]?.id === messages[0]?.id &&
      prevMessages[prevMessages.length - 1]?.id ===
        messages[messages.length - 1]?.id
    ) {
      return;
    }

    // Case 1: Loading older messages (prepending) - preserve scroll position
    if (
      prevScrollHeightRef.current > 0 &&
      messages.length > prevMessages.length &&
      prevMessages.length > 0
    ) {
      // Single requestAnimationFrame is sufficient for scroll adjustment
      requestAnimationFrame(() => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;

        const scrollHeightDifference =
          container.scrollHeight - prevScrollHeightRef.current;

        if (scrollHeightDifference > 0) {
          // Adjust scroll position to maintain visual position
          container.scrollTop += scrollHeightDifference;
        }

        // Reset after adjustment
        prevScrollHeightRef.current = 0;
      });
    }
    // Case 2: Realtime update - only preserve if user scrolled away from bottom
    else if (
      messages.length > 0 &&
      prevMessages.length > 0 &&
      !isLoadingMore &&
      !sendingMessageRef.current &&
      !isNearBottom()
    ) {
      const scrollTopToPreserve = container.scrollTop;

      // Single requestAnimationFrame is sufficient
      requestAnimationFrame(() => {
        if (scrollContainerRef.current && !isNearBottom()) {
          scrollContainerRef.current.scrollTop = scrollTopToPreserve;
        }
      });
    }

    // Update prev messages after processing
    prevMessagesRef.current = messages;
  }, [messages, isLoadingMore, isNearBottom]);

  // Track message count (no auto-scroll - removed as per user request)
  useEffect(() => {
    prevMessageCountRef.current = messages.length;
  }, [messages.length]);

  // Get current user ID
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id || null);
    });
  }, []);

  return (
    <div className='flex flex-col h-full relative'>
      {/* Error Display */}
      {error && (
        <div className='px-4 py-2 mb-2 bg-white/8 backdrop-blur-xl border border-black rounded-4xl text-center text-sm text-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]'>
          {error}
        </div>
      )}

      {/* Messages */}
      {/* Using flex-direction: column-reverse makes the list naturally start at bottom */}
      <ScrollableView
        ref={scrollContainerRef}
        className='relative flex flex-col-reverse pt-30 pb-20'
      >
        {/* Spacer: with column-reverse, first DOM child appears at visual bottom.
            flex-1 makes it grow to fill remaining space, pushing messages to visual top when few */}
        <div className='flex-1 min-h-0' />

        {/* Loading indicator for older messages - appears at top when scrolling up */}
        {isLoadingMore && (
          <div className='flex items-center justify-center py-4'>
            <div className='flex items-center gap-2 text-gray-400 text-sm'>
              <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400'></div>
              <span>Loading older messages...</span>
            </div>
          </div>
        )}

        {(isConnected || messages.length > 0) && currentUserId ? (
          <WorkspaceMessageList
            messages={messages}
            currentUserId={currentUserId}
            onReply={handleReply}
            onJumpToMessage={scrollToMessage}
            highlightedMessageId={highlightedMessageId}
            workspaceMembers={members}
            workspaceNotes={workspaceNotes}
          />
        ) : (
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center'>
              <p className='text-gray-400 font-medium animate-pulse'>
                Connecting to real-time chat...
              </p>
            </div>
          </div>
        )}
      </ScrollableView>

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <div className='absolute bottom-24 right-4 z-10'>
          <GlassButton
            type='button'
            onClick={() => scrollToBottom('smooth')}
            className='size-12 hover:scale-102'
            aria-label='Scroll to bottom'
          >
            <ChevronDown className='h-5 w-5' />
          </GlassButton>
        </div>
      )}

      {/* Absolutely positioned ChatInput with transparent background */}
      <div className='absolute bottom-0 left-0 right-0 z-100'>
        <ChatInput
          ref={chatInputRef}
          onSend={sendMessage}
          isLoading={isLoading}
          placeholder='Message'
          canStop={false}
          replyingTo={replyingTo}
          onCancelReply={handleCancelReply}
          workspaceId={workspaceId}
          workspaceMembers={members}
          workspaceNotes={workspaceNotes}
        />
      </div>
    </div>
  );
}
