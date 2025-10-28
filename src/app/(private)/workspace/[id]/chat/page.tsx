'use client';

import { MessageSquare } from 'lucide-react';

export default function WorkspaceChatPage() {
  return (
    <div className='h-full overflow-y-auto flex items-center justify-center'>
      <div className='text-center'>
        <MessageSquare className='w-16 h-16 text-gray-400 mx-auto mb-4' />
        <h3 className='text-xl font-semibold text-gray-300 mb-2'>
          Chat Coming Soon
        </h3>
        <p className='text-gray-400'>
          Chat functionality will be available soon.
        </p>
      </div>
    </div>
  );
}
