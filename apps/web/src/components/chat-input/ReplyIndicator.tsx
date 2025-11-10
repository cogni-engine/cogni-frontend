export const ReplyIndicator = ({
  replyingTo,
  onCancelReply,
}: {
  replyingTo: { id: number; text: string; authorName?: string };
  onCancelReply?: () => void;
}) => {
  return (
    <div className='flex items-center justify-between bg-white/8 backdrop-blur-xl border border-black rounded-2xl px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]'>
      <div className='flex-1 min-w-0'>
        <p className='text-xs text-white/60 mb-1'>
          Replying to {replyingTo.authorName || 'message'}
        </p>
        <p className='text-xs text-white/40 truncate'>
          {replyingTo.text.slice(0, 100)}
          {replyingTo.text.length > 100 ? '...' : ''}
        </p>
      </div>
      {onCancelReply && (
        <button
          onClick={onCancelReply}
          className='ml-3 text-white/60 hover:text-white/80 transition-colors text-sm'
        >
          ✕
        </button>
      )}
    </div>
  );
};
