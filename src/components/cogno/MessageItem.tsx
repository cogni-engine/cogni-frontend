import { Message } from "@/types/chat";

type MessageItemProps = {
  message: Message;
  isNotification?: boolean;
};

export default function MessageItem({ message, isNotification = false }: MessageItemProps) {
  return (
    <div className={`text-lg md:text-xl leading-relaxed whitespace-pre-line ${
      isNotification 
        ? 'bg-white/10 border border-white/30 rounded-2xl p-6 md:p-8 shadow-[0_0_60px_rgba(255,255,255,0.1),0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-md text-white ring-1 ring-white/20' 
        : 'text-white'
    }`}>
      {message.content}
    </div>
  );
}

