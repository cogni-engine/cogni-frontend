'use client';

import CollaborativeNoteEditor from '@/features/notes/CollaborativeNoteEditor';
import { use } from 'react';

export default function CollaborativeNoteTestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <CollaborativeNoteEditor noteId={id} />;
}
