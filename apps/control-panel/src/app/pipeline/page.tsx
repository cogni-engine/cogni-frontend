'use client';

import { useState, useCallback, useRef } from 'react';
import { DateRange } from '@/types/pipeline';
import { PageHeader } from '@/components/layout/PageHeader';
import { DateRangePicker } from '@/components/pipeline/DateRangePicker';
import { PipelineTotalsBar } from '@/components/pipeline/PipelineTotalsBar';
import { FunnelTable } from '@/components/pipeline/FunnelTable';
import { JobStatusPanel } from '@/components/pipeline/JobStatusPanel';
import { WorkspaceDetailPanel } from '@/components/pipeline/WorkspaceDetailPanel';
import { usePipelineFunnel } from '@/hooks/usePipelineFunnel';
import { usePipelineJobs } from '@/hooks/usePipelineJobs';

function defaultRange(): DateRange {
  const to = new Date();
  to.setDate(to.getDate() + 1);
  const from = new Date();
  from.setDate(from.getDate() - 7);
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
}

const MIN_PANEL_WIDTH = 320;
const MAX_PANEL_WIDTH = 1400;
const DEFAULT_PANEL_WIDTH = 440;

export default function PipelinePage() {
  const [range, setRange] = useState<DateRange>(defaultRange);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<number | null>(
    null
  );
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH);
  const dragging = useRef(false);

  const {
    workspaces,
    totals,
    isLoading: funnelLoading,
  } = usePipelineFunnel(range);
  const {
    summary,
    failedJobs,
    isLoading: jobsLoading,
  } = usePipelineJobs(range);

  const selectedWorkspace = workspaces.find(
    w => w.workspace_id === selectedWorkspaceId
  );

  const handleMouseDown = useCallback(() => {
    dragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const newWidth = window.innerWidth - e.clientX - 24;
      setPanelWidth(
        Math.max(MIN_PANEL_WIDTH, Math.min(MAX_PANEL_WIDTH, newWidth))
      );
    };

    const handleMouseUp = () => {
      dragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Cognition Pipeline'
        description='Event processing funnel and job monitoring'
        actions={<DateRangePicker range={range} onChange={setRange} />}
      />

      <PipelineTotalsBar totals={totals} isLoading={funnelLoading} />

      <div className='flex gap-0'>
        {/* Left: Funnel table + Job status */}
        <div
          className={`space-y-6 ${selectedWorkspace ? 'min-w-0 flex-1 pr-0' : 'w-full'}`}
        >
          <div>
            <h3 className='mb-3 text-sm font-semibold text-foreground'>
              Workspace Funnel
            </h3>
            <FunnelTable
              workspaces={workspaces}
              isLoading={funnelLoading}
              selectedWorkspaceId={selectedWorkspaceId}
              onSelectWorkspace={setSelectedWorkspaceId}
            />
          </div>

          <div>
            <h3 className='mb-3 text-sm font-semibold text-foreground'>
              Job Status
            </h3>
            <JobStatusPanel
              summary={summary}
              failedJobs={failedJobs}
              isLoading={jobsLoading}
            />
          </div>
        </div>

        {/* Resize handle + Right panel */}
        {selectedWorkspace && (
          <>
            <div
              onMouseDown={handleMouseDown}
              className='flex w-4 shrink-0 cursor-col-resize items-center justify-center'
            >
              <div className='h-8 w-1 rounded-full bg-border transition-colors hover:bg-accent' />
            </div>
            <div className='shrink-0' style={{ width: panelWidth }}>
              <WorkspaceDetailPanel
                workspace={selectedWorkspace}
                range={range}
                onClose={() => setSelectedWorkspaceId(null)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
