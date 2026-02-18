'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.id as string;

  useEffect(() => {
    // Redirect to notes page by default
    router.replace(`/workspace/${workspaceId}/notes`);
  }, [workspaceId, router]);

  return (
    <div className='flex justify-center items-center py-12'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-text-primary'></div>
    </div>
  );
}
