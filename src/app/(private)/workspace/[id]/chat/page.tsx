'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useWorkspaceChat } from '@/hooks/useWorkspaceChat';
import { createClient } from '@/lib/supabase/browserClient';
import InputArea, { type InputAreaRef } from '@/components/input/InputArea';
import WorkspaceMessageList from '@/features/workspace/components/WorkspaceMessageList';
import { ChevronDown } from 'lucide-react';
import { useUserSettings } from '@/features/users/hooks/useUserSettings';
import { useCopilotReadable } from '@copilotkit/react-core';

export default function WorkspaceChatPage() {
  const params = useParams();
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
  const inputAreaRef = useRef<InputAreaRef>(null);
  const [highlightedMessageId, setHighlightedMessageId] = useState<
    number | null
  >(null);
  const { enableAiSuggestion } = useUserSettings();
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

  useCopilotReadable({
    description: 'workspace chat history',
    value: messages
      .slice(-20)
      .map(message => message.text)
      .join('\n'),
    categories: ['workspace_chat'],
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
    async (text: string) => {
      sendingMessageRef.current = true;
      const replyToId = replyingTo?.id ?? null;
      await originalSendMessage(text, replyToId);
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
          inputAreaRef.current?.focus();
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

  // Check if user is near bottom (within threshold)
  // Note: With column-reverse, scrollTop 0 or positive small values are at the bottom
  const isNearBottom = useCallback(() => {
    if (!scrollContainerRef.current) return true;
    const container = scrollContainerRef.current;
    const threshold = 200;
    const scrollTop = container.scrollTop;
    // With column-reverse, bottom is at scrollTop = 0 or small positive values
    // Negative values mean we're scrolled away from bottom (toward top)
    return scrollTop >= 0 && scrollTop < threshold;
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
    const messagesChanged =
      prevMessages.length !== messages.length ||
      (prevMessages.length > 0 &&
        messages.length > 0 &&
        prevMessages[0]?.id !== messages[0]?.id);

    // If messages changed and user has scrolled up, preserve scroll position
    if (messagesChanged && prevMessages.length > 0) {
      // Case 1: Loading older messages (prepending) - preserve scroll position
      // Check if we stored a scrollHeight and messages increased (new messages were prepended)
      if (
        prevScrollHeightRef.current > 0 &&
        messages.length > prevMessages.length
      ) {
        // Use double requestAnimationFrame to ensure DOM has fully updated with new messages
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!scrollContainerRef.current) return;
            const container = scrollContainerRef.current;

            const scrollHeightDifference =
              container.scrollHeight - prevScrollHeightRef.current;

            if (scrollHeightDifference > 0) {
              // With flex-col-reverse, when older messages are prepended,
              // scrollTop may be negative. We need to adjust it to maintain visual position.
              // Since we're adding content "above" (which in flex-col-reverse is at higher scrollTop),
              // we need to increase the scrollTop value (make it less negative or more positive)
              const oldScrollTop = container.scrollTop;
              // Adding the difference maintains the visual position
              container.scrollTop = oldScrollTop + scrollHeightDifference;
            }

            // Reset after adjustment
            prevScrollHeightRef.current = 0;
          });
        });
        // Update prev messages after processing
        prevMessagesRef.current = messages;
        return; // Don't process realtime updates when loading more
      }
      // Case 2: Realtime update changed messages - preserve scroll if user scrolled up
      // Skip this if we just sent a message (handled by sendMessage wrapper)
      else if (
        messages.length > 0 &&
        !isLoadingMore &&
        !sendingMessageRef.current &&
        !isNearBottom()
      ) {
        // Capture scroll position before React updates DOM
        const scrollTopToPreserve = container.scrollTop;

        // Use double requestAnimationFrame to ensure DOM has fully updated
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!scrollContainerRef.current) return;

            // If user is still not near bottom, restore scroll position
            if (!isNearBottom()) {
              scrollContainerRef.current.scrollTop = scrollTopToPreserve;
            }
          });
        });
      }
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
      <div
        ref={scrollContainerRef}
        className='flex-1 overflow-y-auto relative flex flex-col-reverse'
      >
        {/* Loading indicator for older messages - appears at top when scrolling up */}
        {isLoadingMore && (
          <div className='flex items-center justify-center py-4'>
            <div className='flex items-center gap-2 text-gray-400 text-sm'>
              <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400'></div>
              <span>Loading older messages...</span>
            </div>
          </div>
        )}

        {isConnected || messages.length > 0 ? (
          currentUserId ? (
            <WorkspaceMessageList
              messages={messages}
              currentUserId={currentUserId}
              onReply={handleReply}
              onJumpToMessage={scrollToMessage}
              highlightedMessageId={highlightedMessageId}
            />
          ) : (
            <div className='flex-1 flex items-center justify-center'>
              <div className='text-center'>
                <p className='text-gray-400'>Loading...</p>
              </div>
            </div>
          )
        ) : (
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center'>
              <p className='text-gray-400'>Connecting to real-time chat...</p>
            </div>
          </div>
        )}
      </div>

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <div className='absolute bottom-24 right-4 z-10'>
          <button
            onClick={() => scrollToBottom('smooth')}
            className='w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-black text-white flex items-center justify-center hover:bg-white/15 hover:scale-102 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]'
            aria-label='Scroll to bottom'
          >
            <ChevronDown className='h-5 w-5' />
          </button>
        </div>
      )}

      {/* Input */}
      <InputArea
        ref={inputAreaRef}
        messages={messages}
        onSend={sendMessage}
        isLoading={isLoading}
        placeholder='Message'
        canStop={false}
        ai_augmented_input={enableAiSuggestion}
        replyingTo={replyingTo}
        onCancelReply={handleCancelReply}
      />
    </div>
  );
}
