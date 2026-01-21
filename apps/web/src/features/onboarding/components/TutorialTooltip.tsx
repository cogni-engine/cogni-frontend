import React from 'react';
import GlassCard from '@/components/glass-design/GlassCard';
import GlassButton from '@/components/glass-design/GlassButton';
import { X } from 'lucide-react';

interface TutorialTooltipProps {
  title: string;
  description: string;
  onNext?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  className?: string;
}

/**
 * Reusable tooltip component for tier 2 tutorial steps
 * Displays tutorial content with glass morphism design
 */
export default function TutorialTooltip({
  title,
  description,
  onNext,
  onSkip,
  nextLabel = 'Next',
  position = 'center',
  className = '',
}: TutorialTooltipProps) {
  const positionClasses = {
    top: 'top-4 left-1/2 -translate-x-1/2',
    bottom: 'bottom-4 left-1/2 -translate-x-1/2',
    left: 'left-4 top-1/2 -translate-y-1/2',
    right: 'right-4 top-1/2 -translate-y-1/2',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-[100] ${className}`}>
      <GlassCard className='max-w-md p-6 space-y-4 rounded-3xl'>
        {/* Header with title and skip button */}
        <div className='flex items-start justify-between gap-4'>
          <h3 className='text-xl font-semibold text-white'>{title}</h3>
          {onSkip && (
            <button
              onClick={onSkip}
              className='text-gray-400 hover:text-white transition-colors'
              title='Skip tutorial'
            >
              <X className='w-5 h-5' />
            </button>
          )}
        </div>

        {/* Description */}
        <p className='text-gray-300 leading-relaxed'>{description}</p>

        {/* Action buttons */}
        {onNext && (
          <div className='flex justify-end gap-3 pt-2'>
            <GlassButton onClick={onNext} className='px-6 py-2'>
              {nextLabel}
            </GlassButton>
          </div>
        )}
      </GlassCard>

      {/* Overlay backdrop */}
      <div className='fixed inset-0 bg-black/50 -z-10' />
    </div>
  );
}
