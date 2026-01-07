'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Drawer, DrawerContent, DrawerBody } from '@/components/ui/drawer';
import GlassButton from '@/components/glass-design/GlassButton';

interface TextInputDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (text: string) => void;
  isSubmitting?: boolean;
}

export default function TextInputDrawer({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: TextInputDrawerProps) {
  const [inputText, setInputText] = useState('');

  const handleClose = () => {
    setInputText('');
    onOpenChange(false);
  };

  const handleSubmit = () => {
    onSubmit(inputText);
    setInputText('');
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent zIndex={210} maxHeight='85vh'>
        {/* Custom Header */}
        <div className='flex items-center justify-between p-4 border-b border-white/10'>
          <GlassButton
            onClick={handleClose}
            size='icon'
            className='size-12'
            disabled={isSubmitting}
          >
            <X className='w-5 h-5 text-white' />
          </GlassButton>

          <h2 className='text-lg font-semibold text-white'>Note</h2>

          <GlassButton
            onClick={handleSubmit}
            size='icon'
            className='size-12'
            disabled={isSubmitting}
          >
            <Check className='w-5 h-5 text-white' />
          </GlassButton>
        </div>

        {/* Body with large text input */}
        <DrawerBody>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder='Note'
            className='w-full min-h-[300px] p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 resize-none'
            disabled={isSubmitting}
            autoFocus
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
