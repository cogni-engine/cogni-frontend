'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>AI Suggestions</CardTitle>
        <CardDescription>
          Enable AI-powered suggestions and recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label htmlFor='ai-suggestion' className='text-base'>
              Enable AI suggestions
            </Label>
          </div>
          <Switch
            id='ai-suggestion'
            checked={enabled}
            onCheckedChange={onToggle}
            disabled={saving}
          />
        </div>
      </CardContent>
    </Card>
  );
}
