export const ReplyIndicator = ({
  replyingTo,
  onCancelReply,
}: {
  replyingTo: { id: number; text: string; authorName?: string };
  onCancelReply: () => void;
}) => {
  return (
    <div className='flex items-center justify-between mx-2 px-4 pt-3 pb-2 border-b border-white/15'>
      <div className='flex-1 min-w-0'>
        <p className='text-xs text-white/60 mb-1'>
          Replying to {replyingTo.authorName || 'message'}
        </p>
        <p className='text-xs text-white/40 truncate'>
          {replyingTo.text.slice(0, 100)}
          {replyingTo.text.length > 100 ? '...' : ''}
        </p>
      </div>
      <button
        onClick={onCancelReply}
        className='ml-3 text-white/60 hover:text-white/80 transition-colors text-sm'
      >
        ✕
      </button>
    </div>
  );
};
