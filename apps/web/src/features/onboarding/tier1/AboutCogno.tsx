import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { NextStepButton } from '../components/NextStepButton';

interface AboutCognoAppProps {
  error: string | null;
  loading: boolean;
  handleGetStarted: () => void;
}

interface OnboardingSlideData {
  title: string;
  description: string;
  phoneFrame: {
    svg: string;
    aspectRatio: number; // width / height ratio
  };
  screenContent?: {
    screenshot?: string;
    alt?: string;
  };
}

const onboardingSlides: OnboardingSlideData[] = [
  {
    title: 'Cogni helps you work smarter',
    description:
      'Your AI-powered workspace for notes, tasks, and seamless collaboration',
    phoneFrame: {
      svg: '/iPhoneX.svg',
      aspectRatio: 423 / 860, // iPhoneX.svg aspect ratio
    },
    screenContent: {
      // screenshot: '/screenshots/onboarding-1.png',
      // alt: 'Cogni workspace preview',
    },
  },
  {
    title: 'Organize everything in one place',
    description: 'Keep your notes, tasks and team organized',
    phoneFrame: {
      svg: '/iPhoneX.svg',
      aspectRatio: 423 / 860,
    },
    screenContent: {
      // screenshot: '/screenshots/onboarding-2.png',
      // alt: 'Organization features preview',
    },
  },
  {
    title: 'Collaborate with your team',
    description:
      'Work together seamlessly with real-time collaboration and AI assistance',
    phoneFrame: {
      svg: '/iPhoneX.svg',
      aspectRatio: 423 / 860,
    },
    screenContent: {
      // screenshot: '/screenshots/onboarding-3.png',
      // alt: 'Collaboration features preview',
    },
  },
];

export function AboutCognoApp({
  error,
  loading,
  handleGetStarted,
}: AboutCognoAppProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

  const isLastSlide = currentSlide === onboardingSlides.length - 1;
  const isFirstSlide = currentSlide === 0;

  const handleContinue = () => {
    if (isLastSlide) {
      handleGetStarted();
    } else {
      goToSlide(currentSlide + 1);
    }
  };

  const goToSlide = (index: number) => {
    if (index < 0 || index >= onboardingSlides.length || isTransitioning) {
      return;
    }
    setIsTransitioning(true);
    setCurrentSlide(index);
    setDragOffset(0);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current || !isDragging.current) {
      return;
    }

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = touchX - touchStartX.current;
    const deltaY = Math.abs(touchY - touchStartY.current);

    // Only handle horizontal swipes (ignore vertical scrolling)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      e.preventDefault();
      const maxOffset = containerRef.current?.clientWidth || 0;
      let offset = deltaX;

      // Prevent dragging beyond boundaries
      if (isFirstSlide && offset > 0) {
        offset = Math.min(offset, maxOffset * 0.3);
      }
      if (isLastSlide && offset < 0) {
        offset = Math.max(offset, -maxOffset * 0.3);
      }

      setDragOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !isDragging.current) {
      return;
    }

    const minSwipeDistance = 50;
    const deltaX = dragOffset;

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0 && !isFirstSlide) {
        goToSlide(currentSlide - 1); // Swipe right - go to previous
      } else if (deltaX < 0 && !isLastSlide) {
        goToSlide(currentSlide + 1); // Swipe left - go to next
      } else {
        setDragOffset(0);
      }
    } else {
      setDragOffset(0);
    }

    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
  };

  // Mouse handlers for desktop drag support
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!touchStartX.current || !touchStartY.current || !isDragging.current) {
      return;
    }

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const deltaX = mouseX - touchStartX.current;
    const deltaY = Math.abs(mouseY - touchStartY.current);

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      const maxOffset = containerRef.current?.clientWidth || 0;
      let offset = deltaX;

      if (isFirstSlide && offset > 0)
        offset = Math.min(offset, maxOffset * 0.3);
      if (isLastSlide && offset < 0)
        offset = Math.max(offset, -maxOffset * 0.3);

      setDragOffset(offset);
    }
  };

  const handleMouseUp = () => {
    handleTouchEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      setDragOffset(0);
      touchStartX.current = null;
      touchStartY.current = null;
      isDragging.current = false;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isDragging.current = false;
    };
  }, []);

  const slideWidth = 100; // Percentage

  return (
    <div className='flex flex-col items-center justify-between h-full animate-in fade-in duration-500'>
      {/* App Preview/Mockup - Swipeable Container */}
      <div
        ref={containerRef}
        className='flex items-center justify-center w-full max-w-sm mx-auto overflow-hidden relative'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className='flex transition-transform duration-500 ease-out relative w-full'
          style={{
            transform: `translateX(calc(-${currentSlide * slideWidth}% + ${dragOffset}px))`,
            willChange: isDragging.current ? 'transform' : 'auto',
          }}
        >
          {onboardingSlides.map((slideData, index) => (
            <div
              key={index}
              className='shrink-0 h-full flex items-center justify-center'
              style={{ width: `${slideWidth}%` }}
            >
              <div
                className='relative transition-opacity duration-500 w-full h-full max-h-[60vh]'
                style={{
                  aspectRatio: slideData.phoneFrame.aspectRatio,
                  opacity: Math.abs(index - currentSlide) > 1 ? 0.3 : 1,
                }}
              >
                <Image
                  src={slideData.phoneFrame.svg}
                  alt='iPhone X mockup'
                  fill
                  className='object-contain'
                  priority={index === 0}
                  sizes='(max-width: 768px) 64vw, 264px'
                />
                {slideData.screenContent?.screenshot && (
                  <div className='absolute top-[5.5%] left-[5.4%] right-[5.4%] bottom-[2.8%] rounded-[2.5rem] overflow-hidden'>
                    <Image
                      src={slideData.screenContent.screenshot}
                      alt={slideData.screenContent.alt || 'App preview'}
                      fill
                      className='object-cover'
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        className='text-center mt-4 px-4 w-full overflow-hidden relative shrink-0'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className='flex transition-transform duration-500 ease-out'
          style={{
            transform: `translateX(calc(-${currentSlide * slideWidth}% + ${dragOffset}px))`,
            willChange: isDragging.current ? 'transform' : 'auto',
            alignItems: 'flex-start',
          }}
        >
          {onboardingSlides.map((slideData, index) => {
            const distance = Math.abs(index - currentSlide);

            return (
              <div
                key={index}
                className='shrink-0 space-y-2 px-4'
                style={{
                  width: `${slideWidth}%`,
                  opacity: distance === 0 ? 1 : distance === 1 ? 0.7 : 0.4,
                  transform: `scale(${distance === 0 ? 1 : 0.96})`,
                  transition: isDragging.current
                    ? 'none'
                    : 'opacity 0.3s, transform 0.3s',
                }}
              >
                <h1 className='text-2xl md:text-4xl font-bold text-white leading-tight'>
                  {slideData.title}
                </h1>
                <p className='text-md md:text-xl text-gray-300 max-w-md mx-auto'>
                  {slideData.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className='flex items-center justify-center pt-4'>
          <div className='flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full'>
            {onboardingSlides.map((_, index) => (
              <button
                key={index}
                type='button'
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className='bg-red-900/30 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm mt-4'>
          <p className='text-red-300 text-sm'>{error}</p>
        </div>
      )}

      {/* Continue Button */}
      <div className='w-full max-w-md mx-auto px-4 mt-6'>
        <NextStepButton
          type='button'
          onClick={handleContinue}
          loading={loading}
          variant='secondary'
          text={isLastSlide ? 'Get Started' : 'Continue'}
          loadingText='Loading...'
        />
      </div>
    </div>
  );
}
