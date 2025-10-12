"use client";

import NoteEditor from "@/components/notes/NoteEditor";
import { use } from "react";

export default function NoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  return <NoteEditor noteId={id} />;
}

