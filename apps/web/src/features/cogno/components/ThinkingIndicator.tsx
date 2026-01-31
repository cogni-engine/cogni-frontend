'use client';

export default function ThinkingIndicator() {
  return (
    <div className='w-full max-w-5xl mx-auto mb-6 px-1 md:px-3'>
      <style jsx>{`
        @keyframes thinking-shine {
          0% {
            background-position: -400px 0;
          }
          100% {
            background-position: 400px 0;
          }
        }
        .shine-text {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.9) 40%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.9) 60%,
            rgba(255, 255, 255, 0.9) 100%
          );
          background-size: 800px 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: thinking-shine 1.5s infinite linear;
        }
      `}</style>
      <span className='shine-text text-base font-medium'>
        Thinking longer for a better answer
      </span>
    </div>
  );
}
