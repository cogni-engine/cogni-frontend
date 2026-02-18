import { useState, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { NextStepButton } from '../components/NextStepButton';
import screenshot1 from '../../../../public/screenshots/IMG_0335-portrait.png';
import screenshot2 from '../../../../public/screenshots/IMG_0336-portrait.png';
import screenshot3 from '../../../../public/screenshots/IMG_0338-portrait.png';

interface AboutCognoAppProps {
  error: string | null;
  loading: boolean;
  handleGetStarted: () => void;
}

interface OnboardingSlideData {
  title: string;
  description: string;
  screenContent?: {
    screenshot: StaticImageData;
    alt?: string;
  };
}

const onboardingSlides: OnboardingSlideData[] = [
  {
    title: 'Cogno helps me work\nsmarter, effortlessly',
    description:
      "Move forward using Cogno's smart notes and chats with autonomous AI notifications",
    screenContent: {
      screenshot: screenshot1,
      alt: 'Cogno workspace preview',
    },
  },
  {
    title: 'Cogno acts autonomously, unprompted',
    description:
      'Get notifications and completed tasks, and see how autonomous AI leads to results',
    screenContent: {
      screenshot: screenshot2,
      alt: 'Autonomous AI preview',
    },
  },
  {
    title: 'Cogno empowers our team',
    description:
      "Let's work together as Cogno manages tracking, notifies everyone, and shares team status",
    screenContent: {
      screenshot: screenshot3,
      alt: 'Team collaboration preview',
    },
  },
];

export function AboutCognoApp({
  error,
  loading,
  handleGetStarted,
}: AboutCognoAppProps) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [showContinueButton, setShowContinueButton] = useState(false);
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
    if (index < 0 || index >= onboardingSlides.length) {
      return;
    }
    setCurrentSlide(index);
    setDragOffset(0);
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

    const minSwipeDistance = 30;
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

  // Fade in continue button after 1.2 seconds on welcome screen
  useEffect(() => {
    if (showWelcome) {
      setShowContinueButton(false);
      const timer = setTimeout(() => {
        setShowContinueButton(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  const slideWidth = 100; // Percentage

  return (
    <AnimatePresence mode='wait'>
      {showWelcome ? (
        // Welcome screen - separate from slides
        <motion.div
          key='welcome'
          initial={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -500 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className='flex flex-col items-center justify-between h-full'
        >
          {/* Centered Title */}
          <div className='flex-1 flex items-center justify-center'>
            <h1 className='text-3xl md:text-4xl font-bold text-text-primary leading-tight text-center animate-in fade-in duration-500'>
              Welcome to Cogno
            </h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className='bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/50 rounded-lg p-4 dark:backdrop-blur-sm mt-4'>
              <p className='text-red-600 dark:text-red-300 text-sm'>{error}</p>
            </div>
          )}

          {/* Let's go Button with delayed fade-in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContinueButton ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className='w-full max-w-md mx-auto px-4 mt-6'
          >
            <NextStepButton
              type='button'
              onClick={() => setShowWelcome(false)}
              loading={loading}
              variant='secondary'
              text='Continue'
              loadingText='Loading...'
            />
          </motion.div>
        </motion.div>
      ) : (
        // Slides screen
        <motion.div
          key='slides'
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className='flex flex-col items-center justify-between h-full'
        >
          {/* App Preview/Mockup - Swipeable Container */}
          <div
            ref={containerRef}
            className='flex flex-1 items-start justify-center w-full max-w-sm mx-auto overflow-hidden relative pt-1'
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
              className='flex transition-transform duration-500 ease-out relative w-full h-full'
              style={{
                transform: `translateX(calc(-${currentSlide * slideWidth}% + ${dragOffset}px))`,
                willChange: isDragging.current ? 'transform' : 'auto',
              }}
            >
              {onboardingSlides.map((slideData, index) => (
                <div
                  key={index}
                  className='shrink-0 flex items-center justify-center overflow-hidden'
                  style={{ width: `${slideWidth}%`, height: '100%' }}
                >
                  <div
                    className='relative transition-opacity duration-500 w-full h-full flex items-center justify-center overflow-hidden'
                    style={{
                      opacity: Math.abs(index - currentSlide) > 1 ? 0.3 : 1,
                    }}
                  >
                    {slideData.screenContent?.screenshot ? (
                      <div className='relative w-full h-full flex items-center justify-center z-110'>
                        <Image
                          src={slideData.screenContent.screenshot}
                          alt={slideData.screenContent.alt || 'App preview'}
                          className='object-contain'
                          style={{
                            maxWidth: '100%',
                            height: '100%',
                            width: 'auto',
                          }}
                          sizes='(max-width: 640px) 90vw, (max-width: 1024px) 280px, 300px'
                          quality={75}
                          priority
                          placeholder='blur'
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div
            className='text-center px-4 w-full overflow-hidden relative shrink-0 mt-4'
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
                    <h1 className='text-xl md:text-2xl font-bold text-text-primary leading-tight whitespace-pre-line'>
                      {slideData.title}
                    </h1>
                    <p className='text-sm md:text-base text-text-secondary max-w-md mx-auto mt-4'>
                      {slideData.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots */}
            <div className='flex items-center justify-center pt-4'>
              <div className='flex items-center gap-2 px-3 py-1.5 bg-interactive-hover dark:backdrop-blur-sm rounded-full'>
                {onboardingSlides.map((_, index) => (
                  <button
                    key={index}
                    type='button'
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                      index === currentSlide
                        ? 'bg-text-primary'
                        : 'bg-interactive-active'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className='bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/50 rounded-lg p-4 dark:backdrop-blur-sm mt-4'>
              <p className='text-red-600 dark:text-red-300 text-sm'>{error}</p>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
