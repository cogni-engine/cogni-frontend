'use client';

import { User } from 'lucide-react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TiptapRenderer } from '@/components/tiptap/TiptapRenderer';
import type { WorkspaceMessage, WorkspaceMember } from '@/types/workspace';
import type { Note } from '@/types/note';
import { useGlobalUI } from '@/contexts/GlobalUIContext';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import { useNotes } from '@cogni/api';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerBody,
} from '@/components/ui/drawer';

type ChatMessageDrawerProps = {
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
};

export default function ChatMessageDrawer({
  workspaceMembers: propsMembers,
  workspaceNotes: propsNotes,
}: ChatMessageDrawerProps) {
  const {
    selectedChatMessage,
    chatMessageDrawerOpen,
    closeChatMessageDrawer,
    openNoteDrawer,
  } = useGlobalUI();

  const message = selectedChatMessage;
  const workspaceId = message?.workspace_id;

  // Fetch workspace members for mentions if not provided
  const { members: fetchedMembers } = useWorkspaceMembers(workspaceId || 0);
  const workspaceMembers = propsMembers || fetchedMembers || [];

  // Fetch workspace notes for mentions if not provided
  const { notes: fetchedNotes } = useNotes({
    workspaceId: workspaceId || 0,
    includeDeleted: false,
    autoFetch: !!workspaceId && !propsNotes,
  });
  const workspaceNotes = propsNotes || fetchedNotes || [];

  if (!message) return null;

  const profile = message.workspace_member?.user_profile ?? null;
  const name = profile?.name ?? 'Unknown';
  const avatarUrl = profile?.avatar_url ?? '';
  const readCount = message.read_count ?? message.reads?.length ?? 0;

  const RepliedMessagePreview = ({
    repliedMessage,
  }: {
    repliedMessage: WorkspaceMessage;
  }) => {
    const repliedProfile = repliedMessage.workspace_member?.user_profile;
    const repliedName = repliedProfile?.name ?? 'Unknown';
    const repliedText =
      repliedMessage.text.slice(0, 100) +
      (repliedMessage.text.length > 100 ? '...' : '');

    return (
      <div className='mb-4 p-3 bg-white/5 border border-white/10 rounded-lg'>
        <div className='flex items-start gap-2'>
          <Avatar className='h-6 w-6 border border-white/15 bg-white/10 text-[10px] font-medium shrink-0'>
            {repliedProfile?.avatar_url ? (
              <AvatarImage src={repliedProfile.avatar_url} alt={repliedName} />
            ) : (
              <AvatarFallback>
                <User className='h-3.5 w-3.5' />
              </AvatarFallback>
            )}
          </Avatar>
          <div className='min-w-0 flex-1'>
            <p className='text-xs text-white/50 mb-1'>
              Replying to {repliedName}
            </p>
            <div className='text-xs text-white/40'>
              <TiptapRenderer
                content={repliedText}
                contentType='markdown'
                enableMemberMentions
                enableNoteMentions
                workspaceMembers={workspaceMembers}
                workspaceNotes={workspaceNotes}
                className='tiptap-reply-preview'
                onNoteMentionClick={openNoteDrawer}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Drawer
      open={chatMessageDrawerOpen}
      onOpenChange={open => {
        if (!open) closeChatMessageDrawer();
      }}
    >
      <DrawerContent maxHeight='85vh'>
        <DrawerHandle />

        <DrawerHeader>
          <div className='flex items-center gap-3 w-full'>
            <Avatar className='h-10 w-10 border border-white/15 bg-white/10'>
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={name} />
              ) : (
                <AvatarFallback>
                  <User className='h-5 w-5' />
                </AvatarFallback>
              )}
            </Avatar>
            <div className='flex-1 min-w-0'>
              <h3 className='text-sm font-medium text-white truncate'>
                {name}
              </h3>
              <p className='text-xs text-gray-400'>
                {format(new Date(message.created_at), 'MMM d, yyyy • HH:mm')}
              </p>
            </div>
          </div>
        </DrawerHeader>

        <DrawerBody className='space-y-4'>
          {message.replied_message && (
            <RepliedMessagePreview repliedMessage={message.replied_message} />
          )}

          {message.text && (
            <div className='text-sm text-white leading-relaxed'>
              <TiptapRenderer
                content={message.text}
                contentType='markdown'
                enableMemberMentions
                enableNoteMentions
                workspaceMembers={workspaceMembers}
                workspaceNotes={workspaceNotes}
                className='tiptap-message-content'
                onNoteMentionClick={openNoteDrawer}
              />
            </div>
          )}

          {readCount > 0 && (
            <div className='pt-2 border-t border-white/10'>
              <p className='text-xs text-gray-400'>
                Read by {readCount} {readCount === 1 ? 'person' : 'people'}
              </p>
            </div>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
