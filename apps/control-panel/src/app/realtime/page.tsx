'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { RealtimeMonitor } from '@/components/realtime/RealtimeMonitor';

export default function RealtimePage() {
  return (
    <div>
      <PageHeader title='Realtime' description='Live database change feed' />
      <RealtimeMonitor />
    </div>
  );
}
