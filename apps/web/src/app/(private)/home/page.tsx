'use client';

import { useRef } from 'react';
import HomeCognoChat from '@/features/cogno/HomeCognoChat';

export default function HomePage() {
  const isInitialMount = useRef(true);

  return <HomeCognoChat isInitialMount={isInitialMount} />;
}
