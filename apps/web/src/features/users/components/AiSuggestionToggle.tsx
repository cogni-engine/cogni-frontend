'use client';

import { Switch } from '@/components/ui/switch';

type AiSuggestionToggleProps = {
  enabled: boolean;
  onToggle: () => void;
  saving: boolean;
};

export function AiSuggestionToggle({
  enabled,
  onToggle,
  saving,
}: AiSuggestionToggleProps) {
  return (
    <div className='flex items-center justify-between lg:grid lg:grid-cols-[200px_1fr] lg:gap-10'>
      <div>
        <h3 className='text-base font-semibold text-text-primary'>
          Smart Assist
        </h3>
        <p className='text-sm text-text-muted'>
          Cogno suggests ideas as you work.
        </p>
      </div>
      <div className='lg:flex lg:items-center'>
        <Switch
          id='ai-suggestion'
          checked={enabled}
          onCheckedChange={onToggle}
          disabled={saving}
        />
      </div>
    </div>
  );
}
