import { TextWithParsedMentions } from '@/components/TextWithParsedMentions';

export const ReplyIndicator = ({
  replyingTo,
  onCancelReply,
}: {
  replyingTo: { id: number; text: string; authorName?: string };
  onCancelReply: () => void;
}) => {
  return (
    <div className='flex items-center justify-between mx-2 px-4 pt-3 pb-2 border-b border-border-default'>
      <div className='flex-1 min-w-0'>
        <p className='text-xs text-text-secondary mb-1'>
          Replying to {replyingTo.authorName || 'message'}
        </p>
        <p className='text-xs text-text-muted truncate'>
          <TextWithParsedMentions text={replyingTo.text} />
        </p>
      </div>
      <button
        onClick={onCancelReply}
        className='ml-3 text-text-secondary hover:text-text-primary transition-colors text-sm'
      >
        ✕
      </button>
    </div>
  );
};
