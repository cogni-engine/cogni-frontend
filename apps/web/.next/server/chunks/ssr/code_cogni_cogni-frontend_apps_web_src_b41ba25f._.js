module.exports = [
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/notesApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assignNoteToMembers",
    ()=>assignNoteToMembers,
    "combineNoteText",
    ()=>combineNoteText,
    "createNote",
    ()=>createNote,
    "deleteNote",
    ()=>deleteNote,
    "duplicateNote",
    ()=>duplicateNote,
    "emptyTrash",
    ()=>emptyTrash,
    "getNote",
    ()=>getNote,
    "getNoteAssignments",
    ()=>getNoteAssignments,
    "getNotes",
    ()=>getNotes,
    "getUserAssignedNotes",
    ()=>getUserAssignedNotes,
    "parseNoteText",
    ()=>parseNoteText,
    "restoreNote",
    ()=>restoreNote,
    "searchNotes",
    ()=>searchNotes,
    "softDeleteNote",
    ()=>softDeleteNote,
    "updateNote",
    ()=>updateNote
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-ssr] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
function parseNoteText(text) {
    const lines = text.split('\n');
    const title = lines[0] || 'Untitled';
    const content = lines.slice(1).join('\n');
    return {
        title,
        content
    };
}
function combineNoteText(title, content) {
    return `${title}\n${content}`;
}
async function getNotes(workspaceId, includeDeleted = true) {
    let query = supabase.from('notes').select(`
      *,
      workspace_member_note(
        workspace_member_note_role,
        workspace_member:workspace_member_id(
          id,
          user_id,
          user_profiles!user_id(id, name, avatar_url)
        )
      )
    `).eq('workspace_id', workspaceId);
    // Filter by deleted_at if not including deleted
    if (!includeDeleted) {
        query = query.is('deleted_at', null);
    }
    const { data, error } = await query.order('updated_at', {
        ascending: false
    });
    if (error) throw error;
    // Transform the nested structure to match our types
    return (data || []).map((note)=>({
            ...note,
            workspace_member_note: (note.workspace_member_note || []).map((assignment)=>({
                    ...assignment,
                    workspace_member: assignment.workspace_member ? {
                        ...assignment.workspace_member,
                        user_profiles: Array.isArray(assignment.workspace_member.user_profiles) ? assignment.workspace_member.user_profiles[0] : assignment.workspace_member.user_profiles
                    } : undefined
                }))
        }));
}
async function getNote(id) {
    const { data, error } = await supabase.from('notes').select('*').eq('id', id).single();
    if (error) {
        if (error.code === 'PGRST116') {
            // Not found
            return null;
        }
        throw error;
    }
    return data;
}
async function createNote(workspaceId, title, content) {
    const text = combineNoteText(title, content);
    const { data, error } = await supabase.from('notes').insert({
        workspace_id: workspaceId,
        text
    }).select().single();
    if (error) throw error;
    return data;
}
async function updateNote(id, title, content) {
    const text = combineNoteText(title, content);
    const { data, error } = await supabase.from('notes').update({
        text,
        updated_at: new Date().toISOString()
    }).eq('id', id).select().single();
    if (error) throw error;
    return data;
}
async function softDeleteNote(id) {
    const { data, error } = await supabase.from('notes').update({
        deleted_at: new Date().toISOString()
    }).eq('id', id).select().single();
    if (error) throw error;
    return data;
}
async function restoreNote(id) {
    const { data, error } = await supabase.from('notes').update({
        deleted_at: null
    }).eq('id', id).select().single();
    if (error) throw error;
    return data;
}
async function deleteNote(id) {
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) throw error;
}
async function duplicateNote(id) {
    // First, get the note to duplicate
    const { data: originalNote, error: fetchError } = await supabase.from('notes').select('*').eq('id', id).single();
    if (fetchError) throw fetchError;
    // Parse the original title
    const { title, content } = parseNoteText(originalNote.text);
    const newTitle = `${title} (Copy)`;
    const newText = combineNoteText(newTitle, content);
    // Create the duplicate
    const { data, error } = await supabase.from('notes').insert({
        workspace_id: originalNote.workspace_id,
        text: newText
    }).select().single();
    if (error) throw error;
    return data;
}
async function emptyTrash(workspaceId) {
    const { error } = await supabase.from('notes').delete().eq('workspace_id', workspaceId).not('deleted_at', 'is', null);
    if (error) throw error;
}
async function searchNotes(workspaceId, searchQuery) {
    if (!searchQuery.trim()) {
        return getNotes(workspaceId);
    }
    const { data, error } = await supabase.from('notes').select(`
      *,
      workspace:workspace_id(*),
      workspace_member_note(
        workspace_member_note_role,
        workspace_member:workspace_member_id(
          id,
          user_id,
          user_profiles!user_id(id, name, avatar_url)
        )
      )
    `).eq('workspace_id', workspaceId).ilike('text', `%${searchQuery}%`).order('updated_at', {
        ascending: false
    });
    if (error) throw error;
    // Transform the nested structure to match our types
    return (data || []).map((note)=>({
            ...note,
            workspace_member_note: (note.workspace_member_note || []).map((assignment)=>({
                    ...assignment,
                    workspace_member: assignment.workspace_member ? {
                        ...assignment.workspace_member,
                        user_profiles: Array.isArray(assignment.workspace_member.user_profiles) ? assignment.workspace_member.user_profiles[0] : assignment.workspace_member.user_profiles
                    } : undefined
                }))
        }));
}
async function getUserAssignedNotes() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    // 1. Get all workspace_member records for current user
    const { data: members, error: memberError } = await supabase.from('workspace_member').select('id').eq('user_id', user.id);
    if (memberError) throw memberError;
    if (!members || members.length === 0) return [];
    const memberIds = members.map((m)=>m.id);
    // 2. Get note_ids from workspace_member_note
    const { data: assignments, error: assignmentError } = await supabase.from('workspace_member_note').select('note_id').in('workspace_member_id', memberIds);
    if (assignmentError) throw assignmentError;
    if (!assignments || assignments.length === 0) return [];
    const noteIds = [
        ...new Set(assignments.map((a)=>a.note_id))
    ];
    // 3. Get notes with workspace info and assignments
    const { data, error } = await supabase.from('notes').select(`
      *,
      workspace:workspace_id(*),
      workspace_member_note(
        workspace_member_note_role,
        workspace_member:workspace_member_id(
          id,
          user_id,
          user_profiles!user_id(id, name, avatar_url)
        )
      )
    `).in('id', noteIds).order('updated_at', {
        ascending: false
    });
    if (error) throw error;
    // Transform the nested structure to match our types
    return (data || []).map((note)=>({
            ...note,
            workspace_member_note: (note.workspace_member_note || []).map((assignment)=>({
                    ...assignment,
                    workspace_member: assignment.workspace_member ? {
                        ...assignment.workspace_member,
                        user_profiles: Array.isArray(assignment.workspace_member.user_profiles) ? assignment.workspace_member.user_profiles[0] : assignment.workspace_member.user_profiles
                    } : undefined
                }))
        }));
}
async function assignNoteToMembers(noteId, assignerIds, assigneeIds) {
    // Delete existing assignments
    const { error: deleteError } = await supabase.from('workspace_member_note').delete().eq('note_id', noteId);
    if (deleteError) throw deleteError;
    // Create new assignments
    const assignments = [
        ...assignerIds.map((id)=>({
                workspace_member_id: id,
                note_id: noteId,
                workspace_member_note_role: 'assigner'
            })),
        ...assigneeIds.map((id)=>({
                workspace_member_id: id,
                note_id: noteId,
                workspace_member_note_role: 'assignee'
            }))
    ];
    if (assignments.length > 0) {
        const { error } = await supabase.from('workspace_member_note').insert(assignments);
        if (error) throw error;
    }
}
async function getNoteAssignments(noteId) {
    const { data, error } = await supabase.from('workspace_member_note').select(`
      workspace_member_note_role,
      workspace_member:workspace_member_id(
        id,
        user_id,
        user_profiles!user_id(id, name)
      )
    `).eq('note_id', noteId);
    if (error) {
        throw error;
    }
    // Transform nested structure (same pattern as workspaceMessagesApi)
    const transformedData = (data || []).map((item)=>{
        const typedItem = item;
        return {
            workspace_member_note_role: typedItem.workspace_member_note_role,
            workspace_member: typedItem.workspace_member ? {
                ...typedItem.workspace_member,
                user_profile: Array.isArray(typedItem.workspace_member.user_profiles) ? typedItem.workspace_member.user_profiles[0] : typedItem.workspace_member.user_profiles
            } : undefined
        };
    });
    const result = {
        assigners: transformedData.filter((d)=>d.workspace_member_note_role === 'assigner') || [],
        assignees: transformedData.filter((d)=>d.workspace_member_note_role === 'assignee') || []
    };
    return result;
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useNoteEditor.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNoteEditor",
    ()=>useNoteEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/swr@2.3.6_react@19.1.0/node_modules/swr/dist/index/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/notesApi.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const AUTOSAVE_DELAY = 700;
function useNoteEditor(noteId) {
    // Fetch note data using SWR
    const { data: note, error, isLoading, mutate: mutateNote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(noteId ? `/notes/${noteId}` : null, async ()=>{
        if (!noteId) return null;
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNote"])(noteId);
        return data ? {
            ...data,
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNoteText"])(data.text),
            preview: ''
        } : null;
    }, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });
    // Local state for editing
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasInitialized, setHasInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Initialize local state when note data loads
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (note && !hasInitialized) {
            setTitle(note.title);
            setContent(note.content);
            setHasInitialized(true);
        }
    }, [
        note,
        hasInitialized
    ]);
    // Debounced autosave
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!noteId || isLoading || !hasInitialized) return;
        const timeout = setTimeout(async ()=>{
            try {
                setSaving(true);
                // Perform actual update (just like the original implementation)
                const saved = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateNote"])(noteId, title, content);
                const parsedSaved = {
                    ...saved,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNoteText"])(saved.text),
                    preview: ''
                };
                // Silently update the current note cache without revalidation
                await mutateNote(parsedSaved, false);
            } catch (err) {
                console.error('Autosave failed:', err);
            } finally{
                setSaving(false);
            }
        }, AUTOSAVE_DELAY);
        return ()=>clearTimeout(timeout);
    }, [
        title,
        content,
        noteId,
        isLoading,
        hasInitialized,
        mutateNote
    ]);
    // Manual save function (if needed)
    const save = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!noteId || !hasInitialized) return;
        try {
            setSaving(true);
            const saved = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateNote"])(noteId, title, content);
            const parsedSaved = {
                ...saved,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNoteText"])(saved.text),
                preview: ''
            };
            // Update the current note cache without revalidation
            await mutateNote(parsedSaved, false);
        } catch (err) {
            console.error('Save failed:', err);
            throw err;
        } finally{
            setSaving(false);
        }
    }, [
        noteId,
        title,
        content,
        hasInitialized,
        mutateNote
    ]);
    return {
        note,
        title,
        content,
        saving,
        loading: isLoading,
        error: error ? error instanceof Error ? error.message : 'Failed to load note' : null,
        setTitle,
        setContent,
        save,
        refetch: ()=>mutateNote()
    };
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useWorkspace.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWorkspace",
    ()=>useWorkspace,
    "useWorkspaceMembers",
    ()=>useWorkspaceMembers,
    "useWorkspaceMutations",
    ()=>useWorkspaceMutations,
    "useWorkspaces",
    ()=>useWorkspaces
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/swr@2.3.6_react@19.1.0/node_modules/swr/dist/index/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__j__as__mutate$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/swr@2.3.6_react@19.1.0/node_modules/swr/dist/_internal/config-context-client-BoS53ST9.mjs [app-ssr] (ecmascript) <export j as mutate>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/workspaceApi.ts [app-ssr] (ecmascript)");
'use client';
;
;
// SWR keys
const WORKSPACES_KEY = '/workspaces';
const workspaceKey = (id)=>`/workspaces/${id}`;
function useWorkspaces() {
    const { data, error, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(WORKSPACES_KEY, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWorkspaces"], {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });
    return {
        workspaces: data,
        isLoading,
        error
    };
}
function useWorkspace(id) {
    const { data, error, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(id ? workspaceKey(id) : null, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWorkspace"])(id), {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });
    return {
        workspace: data,
        isLoading,
        error
    };
}
function useWorkspaceMembers(workspaceId) {
    const { data, error, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(workspaceId ? `/workspaces/${workspaceId}/members` : null, workspaceId ? async ()=>await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWorkspaceMembers"])(workspaceId) : null, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });
    return {
        members: data || [],
        isLoading,
        error
    };
}
function useWorkspaceMutations() {
    const create = async (title)=>{
        const workspace = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createWorkspace"])(title);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__j__as__mutate$3e$__["mutate"])(WORKSPACES_KEY); // Revalidate list
        return workspace;
    };
    const update = async (id, updates)=>{
        const workspace = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateWorkspace"])(id, updates);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__j__as__mutate$3e$__["mutate"])(workspaceKey(id)); // Revalidate specific workspace
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__j__as__mutate$3e$__["mutate"])(WORKSPACES_KEY); // Revalidate list
        return workspace;
    };
    const remove = async (id)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteWorkspace"])(id);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__j__as__mutate$3e$__["mutate"])(WORKSPACES_KEY); // Revalidate list
    };
    return {
        create,
        update,
        remove
    };
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useWorkspaceNotes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatDate",
    ()=>formatDate,
    "useWorkspaceNotes",
    ()=>useWorkspaceNotes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/notesApi.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/workspaceApi.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
/**
 * Parse note into format with title, content, and preview
 */ function parseNote(note) {
    const { title, content } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNoteText"])(note.text);
    const preview = content.slice(0, 100) + (content.length > 100 ? '...' : '');
    return {
        ...note,
        title,
        content,
        preview
    };
}
/**
 * Format date for display
 */ function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '/');
}
function useWorkspaceNotes(workspaceId) {
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [workspace, setWorkspace] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchNotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setLoading(true);
            setError(null);
            // Fetch workspace info and notes in parallel
            const [workspaceData, notesData] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWorkspace"])(workspaceId),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNotes"])(workspaceId)
            ]);
            setWorkspace(workspaceData);
            const parsedNotes = notesData.map(parseNote);
            setNotes(parsedNotes);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch notes');
            console.error('Error fetching notes:', err);
        } finally{
            setLoading(false);
        }
    }, [
        workspaceId
    ]);
    const searchNotesQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (query)=>{
        try {
            setLoading(true);
            setError(null);
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["searchNotes"])(workspaceId, query);
            const parsedNotes = data.map(parseNote);
            setNotes(parsedNotes);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to search notes');
            console.error('Error searching notes:', err);
        } finally{
            setLoading(false);
        }
    }, [
        workspaceId
    ]);
    const createNewNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (title, content)=>{
        try {
            setError(null);
            const newNote = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createNote"])(workspaceId, title, content);
            const parsedNote = parseNote(newNote);
            setNotes((prev)=>[
                    parsedNote,
                    ...prev
                ]);
            return parsedNote;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create note');
            console.error('Error creating note:', err);
            throw err;
        }
    }, [
        workspaceId
    ]);
    const updateExistingNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id, title, content)=>{
        try {
            setError(null);
            const updatedNote = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateNote"])(id, title, content);
            const parsedNote = parseNote(updatedNote);
            setNotes((prev)=>prev.map((note)=>note.id === id ? parsedNote : note));
            return parsedNote;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update note');
            console.error('Error updating note:', err);
            throw err;
        }
    }, []);
    const deleteExistingNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            setError(null);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteNote"])(id);
            setNotes((prev)=>prev.filter((note)=>note.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete note');
            console.error('Error deleting note:', err);
            throw err;
        }
    }, []);
    const softDeleteExistingNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            setError(null);
            const deletedNote = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["softDeleteNote"])(id);
            const parsedNote = parseNote(deletedNote);
            setNotes((prev)=>prev.map((note)=>note.id === id ? parsedNote : note));
            return parsedNote;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete note');
            console.error('Error soft deleting note:', err);
            throw err;
        }
    }, []);
    const restoreExistingNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            setError(null);
            const restoredNote = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restoreNote"])(id);
            const parsedNote = parseNote(restoredNote);
            setNotes((prev)=>prev.map((note)=>note.id === id ? parsedNote : note));
            return parsedNote;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to restore note');
            console.error('Error restoring note:', err);
            throw err;
        }
    }, []);
    const duplicateExistingNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            setError(null);
            const newNote = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["duplicateNote"])(id);
            const parsedNote = parseNote(newNote);
            setNotes((prev)=>[
                    parsedNote,
                    ...prev
                ]);
            return parsedNote;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to duplicate note');
            console.error('Error duplicating note:', err);
            throw err;
        }
    }, []);
    const emptyWorkspaceTrash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["emptyTrash"])(workspaceId);
            setNotes((prev)=>prev.filter((note)=>!note.deleted_at));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to empty trash');
            console.error('Error emptying trash:', err);
            throw err;
        }
    }, [
        workspaceId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (workspaceId) {
            fetchNotes();
        }
    }, [
        fetchNotes,
        workspaceId
    ]);
    return {
        notes,
        workspace,
        loading,
        error,
        refetch: fetchNotes,
        searchNotes: searchNotesQuery,
        createNote: createNewNote,
        updateNote: updateExistingNote,
        deleteNote: deleteExistingNote,
        softDeleteNote: softDeleteExistingNote,
        restoreNote: restoreExistingNote,
        duplicateNote: duplicateExistingNote,
        emptyTrash: emptyWorkspaceTrash
    };
}
;
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/workspaceFilesApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteWorkspaceFile",
    ()=>deleteWorkspaceFile,
    "getFileUrl",
    ()=>getFileUrl,
    "getWorkspaceFiles",
    ()=>getWorkspaceFiles,
    "linkFilesToMessage",
    ()=>linkFilesToMessage,
    "uploadWorkspaceFile",
    ()=>uploadWorkspaceFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-ssr] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
const WORKSPACE_FILES_BUCKET = 'workspace-files';
async function uploadWorkspaceFile(workspaceId, file) {
    // Generate a UUID for the storage path (not the database ID)
    const storageUuid = crypto.randomUUID();
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    // Storage path: workspace-files/{workspace_id}/uploads/{uuid}/{original_filename}
    const filePath = `${workspaceId}/uploads/${storageUuid}/${sanitizedFilename}`;
    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage.from(WORKSPACE_FILES_BUCKET).upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
    });
    if (uploadError) throw uploadError;
    // Insert file metadata into workspace_files table (database ID is auto-generated bigint)
    const { data: fileData, error: dbError } = await supabase.from('workspace_files').insert({
        orginal_file_name: file.name,
        file_path: filePath,
        mime_type: file.type,
        file_size: file.size,
        workspace_id: workspaceId
    }).select().single();
    if (dbError) throw dbError;
    // Generate signed URL for private bucket (valid for 1 hour)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage.from(WORKSPACE_FILES_BUCKET).createSignedUrl(filePath, 3600); // 1 hour expiration
    if (signedUrlError) {
        console.warn('Error creating signed URL:', signedUrlError);
    }
    // Return file info with workspace_file_id
    return {
        id: fileData.id,
        file_path: filePath,
        url: signedUrlData?.signedUrl || '',
        original_filename: file.name,
        file_size: file.size,
        mime_type: file.type
    };
}
async function getFileUrl(workspaceFileId, expiresIn = 3600) {
    const { data, error } = await supabase.from('workspace_files').select('file_path').eq('id', workspaceFileId).single();
    if (error || !data) {
        console.warn('File not found in database:', error);
        return null;
    }
    // Create signed URL for private bucket
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage.from(WORKSPACE_FILES_BUCKET).createSignedUrl(data.file_path, expiresIn);
    if (signedUrlError || !signedUrlData) {
        console.warn('Error creating signed URL:', signedUrlError);
        return null;
    }
    return signedUrlData.signedUrl;
}
async function linkFilesToMessage(messageId, workspaceFileIds) {
    if (workspaceFileIds.length === 0) return;
    const rows = workspaceFileIds.map((workspaceFileId)=>({
            message_id: messageId,
            workspace_file_id: workspaceFileId
        }));
    const { error } = await supabase.from('workspace_message_files').insert(rows);
    if (error) throw error;
}
async function getWorkspaceFiles(workspaceId, limit = 50) {
    const { data, error } = await supabase.from('workspace_files').select('id, orginal_file_name, file_path, file_size, mime_type, created_at').eq('workspace_id', workspaceId).order('created_at', {
        ascending: false
    }).limit(limit);
    if (error) throw error;
    // Map the typo field name to correct one
    return (data || []).map((file)=>({
            id: file.id,
            original_filename: file.orginal_file_name,
            file_path: file.file_path,
            file_size: file.file_size,
            mime_type: file.mime_type,
            created_at: file.created_at
        }));
}
async function deleteWorkspaceFile(workspaceFileId) {
    // First, get the file path from the database
    const { data: fileData, error: fetchError } = await supabase.from('workspace_files').select('file_path').eq('id', workspaceFileId).single();
    if (fetchError) {
        console.warn('Error fetching file for deletion:', fetchError);
    }
    // Delete from storage if we have the path
    if (fileData?.file_path) {
        const { error: storageError } = await supabase.storage.from(WORKSPACE_FILES_BUCKET).remove([
            fileData.file_path
        ]);
        if (storageError) {
            console.warn('Error deleting file from storage:', storageError);
        }
    }
    // Delete from workspace_files table (CASCADE will handle workspace_message_files)
    const { error: dbError } = await supabase.from('workspace_files').delete().eq('id', workspaceFileId);
    if (dbError) {
        console.warn('Error deleting file from database:', dbError);
    }
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/MentionExtension.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomMention",
    ()=>CustomMention
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+core@3.10.5_@tiptap+pm@3.10.5/node_modules/@tiptap/core/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$mention$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5_$40$ti_hh6eqg7ddb6pjeqz24olwqhvby$2f$node_modules$2f40$tiptap$2f$extension$2d$mention$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+extension-mention@3.10.5_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm@3.10.5_@ti_hh6eqg7ddb6pjeqz24olwqhvby/node_modules/@tiptap/extension-mention/dist/index.js [app-ssr] (ecmascript)");
;
;
const CustomMention = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$mention$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5_$40$ti_hh6eqg7ddb6pjeqz24olwqhvby$2f$node_modules$2f40$tiptap$2f$extension$2d$mention$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend({
    name: 'mention',
    addAttributes () {
        return {
            id: {
                default: null,
                parseHTML: (element)=>element.getAttribute('data-id'),
                renderHTML: (attributes)=>{
                    if (!attributes.id) {
                        return {};
                    }
                    return {
                        'data-id': attributes.id
                    };
                }
            },
            label: {
                default: null,
                parseHTML: (element)=>element.getAttribute('data-label'),
                renderHTML: (attributes)=>{
                    if (!attributes.label) {
                        return {};
                    }
                    return {
                        'data-label': attributes.label
                    };
                }
            },
            workspaceMemberId: {
                default: null,
                parseHTML: (element)=>{
                    const id = element.getAttribute('data-workspace-member-id');
                    return id ? parseInt(id, 10) : null;
                },
                renderHTML: (attributes)=>{
                    if (!attributes.workspaceMemberId) {
                        return {};
                    }
                    return {
                        'data-workspace-member-id': attributes.workspaceMemberId
                    };
                }
            }
        };
    },
    parseHTML () {
        return [
            {
                tag: 'span[data-type="mention"]'
            }
        ];
    },
    renderHTML ({ node, HTMLAttributes }) {
        return [
            'span',
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeAttributes"])({
                'data-type': 'mention'
            }, this.options.HTMLAttributes, HTMLAttributes),
            `@${HTMLAttributes['data-label'] || ''}`
        ];
    },
    renderText ({ node }) {
        return `@${node.attrs.label}`;
    },
    // Markdown support using Tiptap utility
    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createInlineMarkdownSpec"])({
        nodeName: 'mention',
        name: '@',
        selfClosing: true,
        allowedAttributes: [
            'id',
            'label',
            'workspaceMemberId'
        ]
    }),
    addKeyboardShortcuts () {
        return {
            Backspace: ()=>this.editor.commands.command(({ tr, state })=>{
                    let isMention = false;
                    const { selection } = state;
                    const { empty, anchor } = selection;
                    if (!empty) {
                        return false;
                    }
                    state.doc.nodesBetween(anchor - 1, anchor, (node, pos)=>{
                        if (node.type.name === this.name) {
                            isMention = true;
                            tr.insertText('', pos, pos + node.nodeSize);
                            return false;
                        }
                    });
                    return isMention;
                })
        };
    }
});
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MentionList",
    ()=>MentionList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
'use client';
;
;
;
;
const MentionList = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    const [selectedIndex, setSelectedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const selectItem = (index)=>{
        const item = props.items[index];
        if (item) {
            props.command({
                id: `member-${item.id}`,
                label: item.user_profile?.name || 'Unknown',
                workspaceMemberId: item.id
            });
        }
    };
    const upHandler = ()=>{
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
    };
    const downHandler = ()=>{
        setSelectedIndex((selectedIndex + 1) % props.items.length);
    };
    const enterHandler = ()=>{
        selectItem(selectedIndex);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>setSelectedIndex(0), [
        props.items
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, ()=>({
            onKeyDown: ({ event })=>{
                if (event.key === 'ArrowUp') {
                    upHandler();
                    return true;
                }
                if (event.key === 'ArrowDown') {
                    downHandler();
                    return true;
                }
                if (event.key === 'Enter') {
                    enterHandler();
                    return true;
                }
                return false;
            }
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg overflow-hidden max-h-[300px] overflow-y-auto",
        children: props.items.length ? props.items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: `flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors ${index === selectedIndex ? 'bg-white/20' : 'hover:bg-white/10'}`,
                onClick: ()=>selectItem(index),
                type: "button",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                        className: "h-8 w-8 border border-white/20 bg-white/10",
                        children: item.user_profile?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                            src: item.user_profile.avatar_url,
                            alt: item.user_profile.name ?? 'Member'
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx",
                            lineNumber: 93,
                            columnNumber: 19
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                className: "w-4 h-4 text-gray-300"
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx",
                                lineNumber: 99,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx",
                            lineNumber: 98,
                            columnNumber: 19
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx",
                        lineNumber: 91,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white font-medium",
                                children: item.user_profile?.name || 'Unknown'
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx",
                                lineNumber: 104,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-400 capitalize",
                                children: item.role
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx",
                                lineNumber: 107,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx",
                        lineNumber: 103,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, item.id, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx",
                lineNumber: 83,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4 py-3 text-sm text-gray-400",
            children: "No members found"
        }, void 0, false, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx",
            lineNumber: 114,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx",
        lineNumber: 80,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
MentionList.displayName = 'MentionList';
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/mentionSuggestion.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createMentionSuggestion",
    ()=>createMentionSuggestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+react@3.10.5_@floating-ui+dom@1.7.4_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm_jrnslszcjrz3i5z3oeqxfbwply/node_modules/@tiptap/react/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$tippy$2e$js$40$6$2e$3$2e$7$2f$node_modules$2f$tippy$2e$js$2f$dist$2f$tippy$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/tippy.js@6.3.7/node_modules/tippy.js/dist/tippy.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$MentionList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx [app-ssr] (ecmascript)");
;
;
;
const createMentionSuggestion = (getMembersRef)=>({
        items: ({ query })=>{
            const members = getMembersRef();
            return members.filter((member)=>{
                const name = member.user_profile?.name?.toLowerCase() || '';
                return name.includes(query.toLowerCase());
            }).slice(0, 5);
        },
        render: ()=>{
            let component;
            let popup;
            return {
                onStart: (props)=>{
                    component = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactRenderer"](__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$MentionList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MentionList"], {
                        props,
                        editor: props.editor
                    });
                    if (!props.clientRect) {
                        return;
                    }
                    popup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$tippy$2e$js$40$6$2e$3$2e$7$2f$node_modules$2f$tippy$2e$js$2f$dist$2f$tippy$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('body', {
                        getReferenceClientRect: props.clientRect,
                        appendTo: ()=>document.body,
                        content: component.element,
                        showOnCreate: true,
                        interactive: true,
                        trigger: 'manual',
                        placement: 'bottom-start'
                    });
                },
                onUpdate (props) {
                    component?.updateProps(props);
                    if (!props.clientRect) {
                        return;
                    }
                    popup?.[0]?.setProps({
                        getReferenceClientRect: props.clientRect
                    });
                },
                onKeyDown (props) {
                    if (props.event.key === 'Escape') {
                        popup?.[0]?.hide();
                        return true;
                    }
                    return component?.ref?.onKeyDown(props) ?? false;
                },
                onExit () {
                    popup?.[0]?.destroy();
                    component?.destroy();
                }
            };
        }
    });
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/NoteMentionExtension.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoteMention",
    ()=>NoteMention
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+core@3.10.5_@tiptap+pm@3.10.5/node_modules/@tiptap/core/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$mention$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5_$40$ti_hh6eqg7ddb6pjeqz24olwqhvby$2f$node_modules$2f40$tiptap$2f$extension$2d$mention$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+extension-mention@3.10.5_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm@3.10.5_@ti_hh6eqg7ddb6pjeqz24olwqhvby/node_modules/@tiptap/extension-mention/dist/index.js [app-ssr] (ecmascript)");
;
;
const NoteMention = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$mention$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5_$40$ti_hh6eqg7ddb6pjeqz24olwqhvby$2f$node_modules$2f40$tiptap$2f$extension$2d$mention$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend({
    name: 'noteMention',
    addAttributes () {
        return {
            id: {
                default: null,
                parseHTML: (element)=>element.getAttribute('data-id'),
                renderHTML: (attributes)=>{
                    if (!attributes.id) {
                        return {};
                    }
                    return {
                        'data-id': attributes.id
                    };
                }
            },
            label: {
                default: null,
                parseHTML: (element)=>element.getAttribute('data-label'),
                renderHTML: (attributes)=>{
                    if (!attributes.label) {
                        return {};
                    }
                    return {
                        'data-label': attributes.label
                    };
                }
            },
            noteId: {
                default: null,
                parseHTML: (element)=>{
                    const id = element.getAttribute('data-note-id');
                    return id ? parseInt(id, 10) : null;
                },
                renderHTML: (attributes)=>{
                    if (!attributes.noteId) {
                        return {};
                    }
                    return {
                        'data-note-id': attributes.noteId
                    };
                }
            }
        };
    },
    parseHTML () {
        return [
            {
                tag: 'span[data-type="noteMention"]'
            }
        ];
    },
    renderHTML ({ node, HTMLAttributes }) {
        return [
            'span',
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeAttributes"])({
                'data-type': 'noteMention'
            }, this.options.HTMLAttributes, HTMLAttributes),
            `#${HTMLAttributes['data-label'] || ''}`
        ];
    },
    renderText ({ node }) {
        return `#${node.attrs.label}`;
    },
    // Markdown support using Tiptap utility
    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createInlineMarkdownSpec"])({
        nodeName: 'noteMention',
        name: '#',
        selfClosing: true,
        allowedAttributes: [
            'id',
            'label',
            'noteId'
        ]
    }),
    addKeyboardShortcuts () {
        return {
            Backspace: ()=>this.editor.commands.command(({ tr, state })=>{
                    let isNoteMention = false;
                    const { selection } = state;
                    const { empty, anchor } = selection;
                    if (!empty) {
                        return false;
                    }
                    state.doc.nodesBetween(anchor - 1, anchor, (node, pos)=>{
                        if (node.type.name === this.name) {
                            isNoteMention = true;
                            tr.insertText('', pos, pos + node.nodeSize);
                            return false;
                        }
                    });
                    return isNoteMention;
                })
        };
    }
});
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/NoteList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoteList",
    ()=>NoteList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
'use client';
;
;
;
const NoteList = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    const [selectedIndex, setSelectedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const selectItem = (index)=>{
        const item = props.items[index];
        if (item) {
            props.command({
                id: `note-${item.id}`,
                label: item.title || 'Untitled',
                noteId: item.id
            });
        }
    };
    const upHandler = ()=>{
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
    };
    const downHandler = ()=>{
        setSelectedIndex((selectedIndex + 1) % props.items.length);
    };
    const enterHandler = ()=>{
        selectItem(selectedIndex);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>setSelectedIndex(0), [
        props.items
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, ()=>({
            onKeyDown: ({ event })=>{
                if (event.key === 'ArrowUp') {
                    upHandler();
                    return true;
                }
                if (event.key === 'ArrowDown') {
                    downHandler();
                    return true;
                }
                if (event.key === 'Enter') {
                    enterHandler();
                    return true;
                }
                return false;
            }
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg overflow-hidden max-h-[300px] overflow-y-auto",
        children: props.items.length ? props.items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: `flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors ${index === selectedIndex ? 'bg-white/20' : 'hover:bg-white/10'}`,
                onClick: ()=>selectItem(index),
                type: "button",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center w-8 h-8 rounded bg-green-500/20 border border-green-500/30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                            className: "w-4 h-4 text-green-400"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/NoteList.tsx",
                            lineNumber: 86,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/NoteList.tsx",
                        lineNumber: 85,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white font-medium truncate",
                                children: item.title || 'Untitled'
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/NoteList.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            item.content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-400 truncate",
                                children: [
                                    item.content.substring(0, 60),
                                    item.content.length > 60 ? '...' : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/NoteList.tsx",
                                lineNumber: 93,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/NoteList.tsx",
                        lineNumber: 88,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, item.id, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/NoteList.tsx",
                lineNumber: 77,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4 py-3 text-sm text-gray-400",
            children: "No notes found"
        }, void 0, false, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/NoteList.tsx",
            lineNumber: 102,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/NoteList.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
NoteList.displayName = 'NoteList';
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/noteMentionSuggestion.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createNoteMentionSuggestion",
    ()=>createNoteMentionSuggestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+react@3.10.5_@floating-ui+dom@1.7.4_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm_jrnslszcjrz3i5z3oeqxfbwply/node_modules/@tiptap/react/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$tippy$2e$js$40$6$2e$3$2e$7$2f$node_modules$2f$tippy$2e$js$2f$dist$2f$tippy$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/tippy.js@6.3.7/node_modules/tippy.js/dist/tippy.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$NoteList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/NoteList.tsx [app-ssr] (ecmascript)");
;
;
;
const createNoteMentionSuggestion = (getNotesRef)=>({
        char: '#',
        items: ({ query })=>{
            const notes = getNotesRef();
            return notes.filter((note)=>{
                const title = note.title?.toLowerCase() || '';
                const content = note.content?.toLowerCase() || '';
                const queryLower = query.toLowerCase();
                return title.includes(queryLower) || content.includes(queryLower);
            }).slice(0, 5);
        },
        render: ()=>{
            let component;
            let popup;
            return {
                onStart: (props)=>{
                    component = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactRenderer"](__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$NoteList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoteList"], {
                        props,
                        editor: props.editor
                    });
                    if (!props.clientRect) {
                        return;
                    }
                    popup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$tippy$2e$js$40$6$2e$3$2e$7$2f$node_modules$2f$tippy$2e$js$2f$dist$2f$tippy$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('body', {
                        getReferenceClientRect: props.clientRect,
                        appendTo: ()=>document.body,
                        content: component.element,
                        showOnCreate: true,
                        interactive: true,
                        trigger: 'manual',
                        placement: 'bottom-start'
                    });
                },
                onUpdate (props) {
                    component?.updateProps(props);
                    if (!props.clientRect) {
                        return;
                    }
                    popup?.[0]?.setProps({
                        getReferenceClientRect: props.clientRect
                    });
                },
                onKeyDown (props) {
                    if (props.event.key === 'Escape') {
                        popup?.[0]?.hide();
                        return true;
                    }
                    return component?.ref?.onKeyDown(props) ?? false;
                },
                onExit () {
                    popup?.[0]?.destroy();
                    component?.destroy();
                }
            };
        }
    });
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/mentionsApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createMention",
    ()=>createMention,
    "deleteNoteMentions",
    ()=>deleteNoteMentions,
    "getMentionsForSource",
    ()=>getMentionsForSource,
    "getUserMentions",
    ()=>getUserMentions,
    "syncNoteMemberMentions",
    ()=>syncNoteMemberMentions,
    "syncNoteToNoteMentions",
    ()=>syncNoteToNoteMentions,
    "syncWorkspaceMessageFileMentions",
    ()=>syncWorkspaceMessageFileMentions,
    "syncWorkspaceMessageMentions",
    ()=>syncWorkspaceMessageMentions,
    "syncWorkspaceMessageNoteMentions",
    ()=>syncWorkspaceMessageNoteMentions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-ssr] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
async function createMention(workspaceId, sourceType, sourceId, targetType, targetId, createdBy) {
    const { data, error } = await supabase.from('mentions').insert({
        workspace_id: workspaceId,
        source_type: sourceType,
        source_id: sourceId,
        target_type: targetType,
        target_id: targetId,
        created_by: createdBy
    }).select().single();
    if (error) throw error;
    return data;
}
async function getMentionsForSource(sourceType, sourceId) {
    const { data, error } = await supabase.from('mentions').select('*').eq('source_type', sourceType).eq('source_id', sourceId);
    if (error) throw error;
    return data || [];
}
async function syncNoteMemberMentions(noteId, workspaceId, mentionedMemberIds, createdBy) {
    // Get existing member mentions
    const { data: existing, error: fetchError } = await supabase.from('mentions').select('*').eq('source_type', 'note').eq('source_id', noteId).eq('target_type', 'workspace_member');
    if (fetchError) throw fetchError;
    const existingIds = new Set((existing || []).map((m)=>m.target_id));
    const newIds = new Set(mentionedMemberIds);
    // Delete mentions that no longer exist
    const toDelete = (existing || []).filter((m)=>!newIds.has(m.target_id));
    if (toDelete.length > 0) {
        const { error: deleteError } = await supabase.from('mentions').delete().in('id', toDelete.map((m)=>m.id));
        if (deleteError) throw deleteError;
    }
    // Add new mentions
    const toAdd = mentionedMemberIds.filter((id)=>!existingIds.has(id));
    if (toAdd.length > 0) {
        const newMentions = toAdd.map((targetId)=>({
                workspace_id: workspaceId,
                source_type: 'note',
                source_id: noteId,
                target_type: 'workspace_member',
                target_id: targetId,
                created_by: createdBy
            }));
        const { error: insertError } = await supabase.from('mentions').insert(newMentions);
        if (insertError) throw insertError;
    }
}
async function syncNoteToNoteMentions(noteId, workspaceId, mentionedNoteIds, createdBy) {
    // Get existing note mentions
    const { data: existing, error: fetchError } = await supabase.from('mentions').select('*').eq('source_type', 'note').eq('source_id', noteId).eq('target_type', 'note');
    if (fetchError) throw fetchError;
    const existingIds = new Set((existing || []).map((m)=>m.target_id));
    const newIds = new Set(mentionedNoteIds);
    // Delete mentions that no longer exist
    const toDelete = (existing || []).filter((m)=>!newIds.has(m.target_id));
    if (toDelete.length > 0) {
        const { error: deleteError } = await supabase.from('mentions').delete().in('id', toDelete.map((m)=>m.id));
        if (deleteError) throw deleteError;
    }
    // Add new mentions
    const toAdd = mentionedNoteIds.filter((id)=>!existingIds.has(id));
    if (toAdd.length > 0) {
        const newMentions = toAdd.map((targetId)=>({
                workspace_id: workspaceId,
                source_type: 'note',
                source_id: noteId,
                target_type: 'note',
                target_id: targetId,
                created_by: createdBy
            }));
        const { error: insertError } = await supabase.from('mentions').insert(newMentions);
        if (insertError) throw insertError;
    }
}
async function deleteNoteMentions(noteId) {
    const { error } = await supabase.from('mentions').delete().eq('source_type', 'note').eq('source_id', noteId);
    if (error) throw error;
}
async function syncWorkspaceMessageMentions(messageId, workspaceId, mentionedMemberIds, createdBy) {
    // Get existing member mentions
    const { data: existing, error: fetchError } = await supabase.from('mentions').select('*').eq('source_type', 'message').eq('source_id', messageId).eq('target_type', 'workspace_member');
    if (fetchError) throw fetchError;
    const existingIds = new Set((existing || []).map((m)=>m.target_id));
    const newIds = new Set(mentionedMemberIds);
    // Delete mentions that no longer exist
    const toDelete = (existing || []).filter((m)=>!newIds.has(m.target_id));
    if (toDelete.length > 0) {
        const { error: deleteError } = await supabase.from('mentions').delete().in('id', toDelete.map((m)=>m.id));
        if (deleteError) throw deleteError;
    }
    // Add new mentions
    const toAdd = mentionedMemberIds.filter((id)=>!existingIds.has(id));
    if (toAdd.length > 0) {
        const newMentions = toAdd.map((targetId)=>({
                workspace_id: workspaceId,
                source_type: 'message',
                source_id: messageId,
                target_type: 'workspace_member',
                target_id: targetId,
                created_by: createdBy
            }));
        const { error: insertError } = await supabase.from('mentions').insert(newMentions);
        if (insertError) throw insertError;
    }
}
async function syncWorkspaceMessageFileMentions(messageId, workspaceId, mentionedFileIds, createdBy) {
    // Get existing file mentions
    const { data: existing, error: fetchError } = await supabase.from('mentions').select('*').eq('source_type', 'message').eq('source_id', messageId).eq('target_type', 'workspace_file');
    if (fetchError) throw fetchError;
    const existingIds = new Set((existing || []).map((m)=>m.target_id));
    const newIds = new Set(mentionedFileIds);
    // Delete mentions that no longer exist
    const toDelete = (existing || []).filter((m)=>!newIds.has(m.target_id));
    if (toDelete.length > 0) {
        const { error: deleteError } = await supabase.from('mentions').delete().in('id', toDelete.map((m)=>m.id));
        if (deleteError) throw deleteError;
    }
    // Add new mentions
    const toAdd = mentionedFileIds.filter((id)=>!existingIds.has(id));
    if (toAdd.length > 0) {
        const newMentions = toAdd.map((targetId)=>({
                workspace_id: workspaceId,
                source_type: 'message',
                source_id: messageId,
                target_type: 'workspace_file',
                target_id: targetId,
                created_by: createdBy
            }));
        const { error: insertError } = await supabase.from('mentions').insert(newMentions);
        if (insertError) throw insertError;
    }
}
async function syncWorkspaceMessageNoteMentions(messageId, workspaceId, mentionedNoteIds, createdBy) {
    // Get existing note mentions
    const { data: existing, error: fetchError } = await supabase.from('mentions').select('*').eq('source_type', 'message').eq('source_id', messageId).eq('target_type', 'note');
    if (fetchError) throw fetchError;
    const existingIds = new Set((existing || []).map((m)=>m.target_id));
    const newIds = new Set(mentionedNoteIds);
    // Delete mentions that no longer exist
    const toDelete = (existing || []).filter((m)=>!newIds.has(m.target_id));
    if (toDelete.length > 0) {
        const { error: deleteError } = await supabase.from('mentions').delete().in('id', toDelete.map((m)=>m.id));
        if (deleteError) throw deleteError;
    }
    // Add new mentions
    const toAdd = mentionedNoteIds.filter((id)=>!existingIds.has(id));
    if (toAdd.length > 0) {
        const newMentions = toAdd.map((targetId)=>({
                workspace_id: workspaceId,
                source_type: 'message',
                source_id: messageId,
                target_type: 'note',
                target_id: targetId,
                created_by: createdBy
            }));
        const { error: insertError } = await supabase.from('mentions').insert(newMentions);
        if (insertError) throw insertError;
    }
}
async function getUserMentions(workspaceMemberId) {
    const { data, error } = await supabase.from('mentions').select('*').eq('target_type', 'workspace_member').eq('target_id', workspaceMemberId).order('created_at', {
        ascending: false
    });
    if (error) throw error;
    return data || [];
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useAICompletion.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAICompletion",
    ()=>useAICompletion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useAICompletion({ editor, noteId, workspaceId, enabled = true, debounceMs = 4000 }) {
    const [suggestion, setSuggestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const debounceTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastRequestRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])('');
    const abortControllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const generateCompletion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (context, noteTitle)=>{
        console.log('🤖 generateCompletion called', {
            enabled,
            contextLength: context.length,
            noteTitle
        });
        if (!enabled || !context.trim()) {
            console.log('❌ Skipping - not enabled or no context');
            setSuggestion(null);
            return;
        }
        // Cancel any pending request
        if (abortControllerRef.current) {
            console.log('🛑 Aborting previous request');
            abortControllerRef.current.abort();
        }
        console.log('📡 Making API request...');
        setIsLoading(true);
        abortControllerRef.current = new AbortController();
        try {
            // Call our AI completion endpoint
            const response = await fetch('/api/ai-completion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    context,
                    noteTitle: noteTitle || ''
                }),
                signal: abortControllerRef.current.signal
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                throw new Error(errorData.error || 'Failed to generate completion');
            }
            const data = await response.json();
            const completion = data.completion?.trim() || null;
            if (completion && completion.length > 0) {
                setSuggestion(completion);
            } else {
                setSuggestion(null);
            }
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                // Request was cancelled, this is expected
                return;
            }
            console.error('Error generating completion:', error);
            setSuggestion(null);
        } finally{
            setIsLoading(false);
            abortControllerRef.current = null;
        }
    }, [
        enabled
    ]);
    const requestSuggestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((context, noteTitle)=>{
        console.log('🎯 requestSuggestion called', {
            contextLength: context.length,
            noteTitle
        });
        lastRequestRef.current = context;
        // Clear existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        // Don't suggest for very short text
        if (context.trim().length < 10) {
            console.log('❌ Context too short');
            setSuggestion(null);
            return;
        }
        // Debounce the request
        console.log(`⏱️ Scheduling AI request in ${debounceMs}ms`);
        debounceTimerRef.current = setTimeout(()=>{
            console.log('🚀 Calling generateCompletion now');
            generateCompletion(context, noteTitle || '');
        }, debounceMs);
    }, [
        debounceMs,
        generateCompletion
    ]);
    const acceptSuggestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!editor || !suggestion) {
            return;
        }
        // Clear suggestion from React state
        setSuggestion(null);
    }, [
        editor,
        suggestion
    ]);
    const dismissSuggestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setSuggestion(null);
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }, []);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);
    return {
        suggestion,
        isLoading,
        acceptSuggestion,
        dismissSuggestion,
        requestSuggestion
    };
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/AiCompletionExtension.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AiCompletion",
    ()=>AiCompletion,
    "AiCompletionPluginKey",
    ()=>AiCompletionPluginKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+core@3.10.5_@tiptap+pm@3.10.5/node_modules/@tiptap/core/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$pm$2f$dist$2f$model$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+pm@3.10.5/node_modules/@tiptap/pm/dist/model/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$model$40$1$2e$25$2e$4$2f$node_modules$2f$prosemirror$2d$model$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/prosemirror-model@1.25.4/node_modules/prosemirror-model/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$pm$2f$dist$2f$state$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+pm@3.10.5/node_modules/@tiptap/pm/dist/state/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$4$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/prosemirror-state@1.4.4/node_modules/prosemirror-state/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$pm$2f$dist$2f$view$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+pm@3.10.5/node_modules/@tiptap/pm/dist/view/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$view$40$1$2e$41$2e$3$2f$node_modules$2f$prosemirror$2d$view$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/prosemirror-view@1.41.3/node_modules/prosemirror-view/dist/index.js [app-ssr] (ecmascript)");
;
;
;
;
const AiCompletionPluginKey = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$4$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PluginKey"]('aiCompletion');
const AiCompletion = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Extension"].create({
    name: 'aiCompletion',
    priority: 1000,
    addOptions () {
        return {
            suggestion: null,
            onAccept: ()=>{},
            onDismiss: ()=>{},
            enabled: true
        };
    },
    addProseMirrorPlugins () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const extensionThis = this;
        return [
            new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$4$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Plugin"]({
                key: AiCompletionPluginKey,
                state: {
                    init () {
                        return {
                            suggestion: null,
                            enabled: true,
                            decorations: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$view$40$1$2e$41$2e$3$2f$node_modules$2f$prosemirror$2d$view$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DecorationSet"].empty
                        };
                    },
                    apply (tr, oldState) {
                        // Check if there's new metadata in this transaction
                        const metaSuggestion = tr.getMeta('aiCompletionSuggestion');
                        const metaEnabled = tr.getMeta('aiCompletionEnabled');
                        // Update state from metadata if present, otherwise keep old values
                        const suggestion = metaSuggestion !== undefined ? metaSuggestion : oldState.suggestion;
                        const enabled = metaEnabled !== undefined ? metaEnabled : oldState.enabled;
                        // Removed debug logging for cleaner console
                        // Map old decorations through the transaction
                        let decorationSet = oldState.decorations.map(tr.mapping, tr.doc);
                        // Clear decorations if no suggestion or not enabled
                        if (!suggestion || !enabled) {
                            return {
                                suggestion,
                                enabled,
                                decorations: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$view$40$1$2e$41$2e$3$2f$node_modules$2f$prosemirror$2d$view$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DecorationSet"].empty
                            };
                        }
                        // Get current cursor position
                        const { selection } = tr;
                        const { from, to } = selection;
                        // Only show suggestion at cursor position when cursor is collapsed
                        if (from !== to) {
                            return {
                                suggestion,
                                enabled,
                                decorations: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$view$40$1$2e$41$2e$3$2f$node_modules$2f$prosemirror$2d$view$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DecorationSet"].empty
                            };
                        }
                        // Create a widget decoration for the ghost text
                        const widget = document.createElement('span');
                        widget.className = 'ai-completion-ghost-text';
                        const editorAttributes = extensionThis.editor?.options?.editorProps?.attributes;
                        if (editorAttributes) {
                            const resolvedAttributes = typeof editorAttributes === 'function' ? editorAttributes(extensionThis.editor?.state) : editorAttributes;
                            const className = resolvedAttributes?.class;
                            if (className) {
                                widget.className += ` ${className}`;
                            }
                        }
                        const applyMarkdownRendering = ()=>{
                            try {
                                const editor = extensionThis.editor;
                                if (!editor) {
                                    widget.textContent = suggestion;
                                    return;
                                }
                                const markdownManager = editor.storage?.markdown?.manager;
                                const schema = editor.schema;
                                if (!markdownManager) {
                                    widget.textContent = suggestion;
                                    return;
                                }
                                const parsed = markdownManager.parse(suggestion);
                                if (!parsed || parsed.type !== 'doc') {
                                    widget.textContent = suggestion;
                                    return;
                                }
                                const docNode = schema.nodeFromJSON(parsed);
                                const serializer = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$model$40$1$2e$25$2e$4$2f$node_modules$2f$prosemirror$2d$model$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DOMSerializer"].fromSchema(schema);
                                widget.textContent = '';
                                let appendedChild = false;
                                docNode.forEach((child, _offset, index)=>{
                                    const fragment = child.type.name === 'paragraph' ? serializer.serializeFragment(child.content) : serializer.serializeFragment(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$model$40$1$2e$25$2e$4$2f$node_modules$2f$prosemirror$2d$model$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"].from(child));
                                    widget.appendChild(fragment);
                                    appendedChild = true;
                                    if (index < docNode.childCount - 1) {
                                        widget.appendChild(document.createElement('br'));
                                    }
                                });
                                if (!appendedChild) {
                                    widget.textContent = suggestion;
                                }
                            } catch (error) {
                                console.error('Failed to render AI completion markdown', error);
                                widget.textContent = suggestion;
                            }
                        };
                        applyMarkdownRendering();
                        widget.setAttribute('data-suggestion', suggestion);
                        widget.style.cssText = `
              color: rgb(156, 163, 175) !important;
              opacity: 0.5 !important;
              pointer-events: none !important;
              user-select: none !important;
              font-style: italic !important;
              display: inline !important;
              position: relative !important;
            `;
                        const decoration = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$view$40$1$2e$41$2e$3$2f$node_modules$2f$prosemirror$2d$view$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Decoration"].widget(from, widget, {
                            side: 1,
                            key: 'ai-completion'
                        });
                        decorationSet = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$view$40$1$2e$41$2e$3$2f$node_modules$2f$prosemirror$2d$view$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DecorationSet"].create(tr.doc, [
                            decoration
                        ]);
                        return {
                            suggestion,
                            enabled,
                            decorations: decorationSet
                        };
                    }
                },
                props: {
                    decorations (state) {
                        const pluginState = this.getState(state);
                        return pluginState?.decorations || __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$view$40$1$2e$41$2e$3$2f$node_modules$2f$prosemirror$2d$view$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DecorationSet"].empty;
                    },
                    handleKeyDown (view, event) {
                        // Get suggestion from plugin state
                        const pluginState = this.getState(view.state);
                        const suggestion = pluginState?.suggestion;
                        const enabled = pluginState?.enabled;
                        if (!suggestion || !enabled) {
                            return false;
                        }
                        // Accept suggestion with Tab
                        if (event.key === 'Tab' && !event.shiftKey) {
                            event.preventDefault();
                            event.stopPropagation();
                            const editor = extensionThis.editor;
                            if (editor) {
                                const handled = editor.chain().focus().command(({ state, tr, dispatch, editor })=>{
                                    if (!dispatch) {
                                        return true;
                                    }
                                    const { from, to } = state.selection;
                                    let transaction = tr;
                                    let inserted = false;
                                    const markdownManager = editor.storage?.markdown?.manager;
                                    if (markdownManager) {
                                        try {
                                            const parsed = markdownManager.parse(suggestion);
                                            if (parsed?.type === 'doc') {
                                                const docNode = editor.schema.nodeFromJSON(parsed);
                                                if (docNode.childCount === 1 && docNode.firstChild?.type?.name === 'paragraph') {
                                                    const inlineFragment = docNode.firstChild.content;
                                                    if (inlineFragment.childCount > 0) {
                                                        if (from !== to) {
                                                            transaction = transaction.deleteRange(from, to);
                                                        }
                                                        const insertPos = transaction.mapping.map(from);
                                                        transaction = transaction.insert(insertPos, inlineFragment);
                                                        inserted = true;
                                                    }
                                                } else if (docNode.content.childCount > 0) {
                                                    const slice = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$model$40$1$2e$25$2e$4$2f$node_modules$2f$prosemirror$2d$model$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slice"](docNode.content, 0, 0);
                                                    transaction = transaction.replaceRange(from, to, slice);
                                                    inserted = true;
                                                }
                                            }
                                        } catch (error) {
                                            console.error('Failed to insert AI completion markdown', error);
                                        }
                                    }
                                    if (!inserted) {
                                        transaction = transaction.insertText(suggestion, from, to);
                                    }
                                    transaction.setMeta('aiCompletionSuggestion', null);
                                    transaction.setMeta('aiCompletionEnabled', enabled);
                                    dispatch(transaction);
                                    return true;
                                }).run();
                                if (handled) {
                                    try {
                                        extensionThis.options.onAccept();
                                    } catch (e) {
                                        console.error('Error calling onAccept:', e);
                                    }
                                    return true;
                                }
                            }
                            // Fallback if editor instance is unavailable
                            const { from } = view.state.selection;
                            const tr = view.state.tr;
                            tr.insertText(suggestion, from);
                            tr.setMeta('aiCompletionSuggestion', null);
                            tr.setMeta('aiCompletionEnabled', enabled);
                            view.dispatch(tr);
                            try {
                                extensionThis.options.onAccept();
                            } catch (e) {
                                console.error('Error calling onAccept:', e);
                            }
                            return true;
                        }
                        // Dismiss suggestion with Escape
                        if (event.key === 'Escape') {
                            extensionThis.options.onDismiss();
                            // Clear via transaction
                            const tr = view.state.tr;
                            tr.setMeta('aiCompletionSuggestion', null);
                            tr.setMeta('aiCompletionEnabled', enabled);
                            view.dispatch(tr);
                            return true;
                        }
                        // Dismiss on any other typing (will be regenerated if appropriate)
                        if (event.key.length === 1 || event.key === 'Backspace' || event.key === 'Delete') {
                            extensionThis.options.onDismiss();
                            // Clear via transaction
                            const tr = view.state.tr;
                            tr.setMeta('aiCompletionSuggestion', null);
                            tr.setMeta('aiCompletionEnabled', enabled);
                            view.dispatch(tr);
                            return false; // Allow the key to be processed normally
                        }
                        return false;
                    }
                }
            })
        ];
    }
});
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NoteEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$styled$2d$jsx$40$5$2e$1$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/styled-jsx@5.1.6_react@19.1.0/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useNoteEditor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useNoteEditor.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bold$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bold$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/bold.js [app-ssr] (ecmascript) <export default as Bold>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$italic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Italic$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/italic.js [app-ssr] (ecmascript) <export default as Italic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$strikethrough$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Strikethrough$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/strikethrough.js [app-ssr] (ecmascript) <export default as Strikethrough>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/list.js [app-ssr] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$ordered$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListOrdered$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/list-ordered.js [app-ssr] (ecmascript) <export default as ListOrdered>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/quote.js [app-ssr] (ecmascript) <export default as Quote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/undo.js [app-ssr] (ecmascript) <export default as Undo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/redo.js [app-ssr] (ecmascript) <export default as Redo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/image.js [app-ssr] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/square-check-big.js [app-ssr] (ecmascript) <export default as CheckSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+react@3.10.5_@floating-ui+dom@1.7.4_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm_jrnslszcjrz3i5z3oeqxfbwply/node_modules/@tiptap/react/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$starter$2d$kit$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+starter-kit@3.10.5/node_modules/@tiptap/starter-kit/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$markdown$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$markdown$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+markdown@3.10.5_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm@3.10.5/node_modules/@tiptap/markdown/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$placeholder$40$3$2e$10$2e$5_$40$tiptap$2b$extensions$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5_$2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+extension-placeholder@3.10.5_@tiptap+extensions@3.10.5_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm@3.10.5_/node_modules/@tiptap/extension-placeholder/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$image$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$2f$node_modules$2f40$tiptap$2f$extension$2d$image$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+extension-image@3.10.5_@tiptap+core@3.10.5_@tiptap+pm@3.10.5_/node_modules/@tiptap/extension-image/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$task$2d$list$40$3$2e$10$2e$5_$40$tiptap$2b$extension$2d$list$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$_ykidcgu6ozmy5o7vlss5zpeb5u$2f$node_modules$2f40$tiptap$2f$extension$2d$task$2d$list$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+extension-task-list@3.10.5_@tiptap+extension-list@3.10.5_@tiptap+core@3.10.5_@tiptap+_ykidcgu6ozmy5o7vlss5zpeb5u/node_modules/@tiptap/extension-task-list/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$task$2d$item$40$3$2e$10$2e$5_$40$tiptap$2b$extension$2d$list$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$_bvz2afbpogmtx7jlupthozg4l4$2f$node_modules$2f40$tiptap$2f$extension$2d$task$2d$item$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+extension-task-item@3.10.5_@tiptap+extension-list@3.10.5_@tiptap+core@3.10.5_@tiptap+_bvz2afbpogmtx7jlupthozg4l4/node_modules/@tiptap/extension-task-item/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$cookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/cookies.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspace$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useWorkspace.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspaceNotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useWorkspaceNotes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/notesApi.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceFilesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/workspaceFilesApi.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$MentionExtension$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/MentionExtension.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$mentionSuggestion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/mentionSuggestion.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$NoteMentionExtension$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/NoteMentionExtension.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$noteMentionSuggestion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/noteMentionSuggestion.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$mentionsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/mentionsApi.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useAICompletion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useAICompletion.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$AiCompletionExtension$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/AiCompletionExtension.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$HDOG2RTM$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-HDOG2RTM.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function ToolbarButton({ onClick, isActive, disabled, icon, title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        disabled: disabled,
        title: title,
        className: `p-2 rounded-lg transition-all ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
        children: icon
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
function NoteEditor({ noteId }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const id = parseInt(noteId, 10);
    const isValidId = !isNaN(id);
    const { note, title, content, loading, error, setTitle, setContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useNoteEditor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNoteEditor"])(isValidId ? id : null);
    // Check if this is a group workspace note (not personal)
    const personalWorkspaceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$cookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPersonalWorkspaceId"])();
    const isGroupNote = note?.workspace_id !== personalWorkspaceId;
    // Assignment state
    const [showAssignmentDropdown, setShowAssignmentDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [assigneeIds, setAssigneeIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [savingAssignment, setSavingAssignment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Image upload state
    const imageInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [uploadingImage, setUploadingImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // AI Completion state
    const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        // Load from localStorage
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return true;
    });
    // Fetch workspace members if this is a group note
    const { members } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspace$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkspaceMembers"])(isGroupNote && note?.workspace_id ? note.workspace_id : 0);
    // Fetch workspace notes for note mentions
    const { notes: workspaceNotes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspaceNotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkspaceNotes"])(note?.workspace_id || 0);
    // Track initial loaded state to compare against
    const [initialAssigneeIds, setInitialAssigneeIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [assignmentsLoaded, setAssignmentsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Mention state
    const [currentMemberId, setCurrentMemberId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    // Use a ref to always get the latest members for mention suggestions
    const membersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    membersRef.current = members;
    // Use a ref to always get the latest notes for note mention suggestions
    // Filter out the current note from the suggestions
    const notesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    notesRef.current = workspaceNotes.filter((n)=>n.id !== id);
    // Get current user's workspace member ID
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isGroupNote && note?.workspace_id && members.length > 0) {
            const getCurrentMember = async ()=>{
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const member = members.find((m)=>m.user_id === user.id);
                    if (member) {
                        setCurrentMemberId(member.id);
                    }
                }
            };
            getCurrentMember();
        }
    }, [
        isGroupNote,
        note?.workspace_id,
        members,
        supabase.auth
    ]);
    // Load existing assignments
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isGroupNote && note?.id) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNoteAssignments"])(note.id).then(({ assignees })=>{
                const assigneeIdsList = assignees.map((a)=>{
                    return a.workspace_member?.id;
                }).filter((id)=>typeof id === 'number');
                setAssigneeIds(assigneeIdsList);
                setInitialAssigneeIds(assigneeIdsList);
                setAssignmentsLoaded(true);
            }).catch((err)=>{
                console.error('Failed to load assignments:', err);
                setAssignmentsLoaded(true);
            });
        }
    }, [
        isGroupNote,
        note?.id
    ]);
    // Auto-save assignments when changed (only if different from initial)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isGroupNote || !note?.id || savingAssignment || !assignmentsLoaded) return;
        // Check if there's an actual change from the initial state
        const hasChanged = assigneeIds.length !== initialAssigneeIds.length || assigneeIds.some((id)=>!initialAssigneeIds.includes(id)) || initialAssigneeIds.some((id)=>!assigneeIds.includes(id));
        if (!hasChanged) return;
        const saveAssignments = async ()=>{
            try {
                setSavingAssignment(true);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assignNoteToMembers"])(note.id, [], assigneeIds);
                // Update initial state after successful save
                setInitialAssigneeIds(assigneeIds);
            } catch (err) {
                console.error('Failed to save assignments:', err);
            } finally{
                setSavingAssignment(false);
            }
        };
        const timeout = setTimeout(saveAssignments, 500);
        return ()=>clearTimeout(timeout);
    }, [
        assigneeIds,
        initialAssigneeIds,
        isGroupNote,
        note?.id,
        savingAssignment,
        assignmentsLoaded
    ]);
    const toggleAssignee = (memberId)=>{
        if (assigneeIds.includes(memberId)) {
            setAssigneeIds(assigneeIds.filter((id)=>id !== memberId));
        } else {
            setAssigneeIds([
                ...assigneeIds,
                memberId
            ]);
        }
    };
    // Handle image upload
    const handleImageUpload = async (e)=>{
        const file = e.target.files?.[0];
        if (!file || !editor || !note?.workspace_id) return;
        // Validate it's an image
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            e.target.value = '';
            return;
        }
        setUploadingImage(true);
        try {
            // Upload to workspace storage
            const uploaded = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceFilesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadWorkspaceFile"])(note.workspace_id, file);
            // Insert image into editor at current cursor position
            // Store file ID in data attribute for later URL refresh
            const { state, view } = editor;
            const { from } = state.selection;
            // Insert image with all attributes including data-file-id
            const imageNode = state.schema.nodes.image.create({
                src: uploaded.url,
                alt: uploaded.original_filename,
                'data-file-id': uploaded.id.toString()
            });
            const tr = state.tr.insert(from, imageNode);
            view.dispatch(tr);
            editor.commands.focus();
            // Reset input
            e.target.value = '';
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        } finally{
            setUploadingImage(false);
        }
    };
    const triggerImageInput = ()=>{
        imageInputRef.current?.click();
    };
    const handleToggleTaskList = ()=>{
        if (!editor) return;
        const chain = editor.chain().focus();
        if (typeof chain.toggleTaskList === 'function') {
            chain.toggleTaskList().run();
            return;
        }
        const commands = editor.commands;
        if (typeof commands.toggleTaskList === 'function') {
            commands.toggleTaskList();
        } else {
            console.warn('Task list command not available');
        }
    };
    // Initialize TipTap editor
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"])({
        immediatelyRender: false,
        extensions: [
            // AI Completion FIRST - needs to capture Tab before other extensions
            __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$AiCompletionExtension$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AiCompletion"].configure({
                suggestion: null,
                onAccept: ()=>{},
                onDismiss: ()=>{},
                enabled: aiSuggestionsEnabled
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$starter$2d$kit$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].configure({
                heading: {
                    levels: [
                        1,
                        2,
                        3
                    ]
                },
                code: false
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$placeholder$40$3$2e$10$2e$5_$40$tiptap$2b$extensions$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5_$2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].configure({
                placeholder: 'メモを入力...'
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$image$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$2f$node_modules$2f40$tiptap$2f$extension$2d$image$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend({
                addAttributes () {
                    return {
                        ...this.parent?.(),
                        'data-file-id': {
                            default: null,
                            parseHTML: (element)=>element.getAttribute('data-file-id'),
                            renderHTML: (attributes)=>{
                                if (!attributes['data-file-id']) {
                                    return {};
                                }
                                return {
                                    'data-file-id': attributes['data-file-id']
                                };
                            }
                        }
                    };
                }
            }).configure({
                inline: true,
                allowBase64: false,
                HTMLAttributes: {
                    class: 'editor-image'
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$task$2d$list$40$3$2e$10$2e$5_$40$tiptap$2b$extension$2d$list$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$_ykidcgu6ozmy5o7vlss5zpeb5u$2f$node_modules$2f40$tiptap$2f$extension$2d$task$2d$list$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].configure({
                HTMLAttributes: {
                    class: 'task-list'
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$task$2d$item$40$3$2e$10$2e$5_$40$tiptap$2b$extension$2d$list$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$_bvz2afbpogmtx7jlupthozg4l4$2f$node_modules$2f40$tiptap$2f$extension$2d$task$2d$item$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].configure({
                nested: true,
                HTMLAttributes: {
                    class: 'task-item'
                }
            }),
            // Add member mention extension only for group notes
            ...isGroupNote ? [
                __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$MentionExtension$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CustomMention"].configure({
                    HTMLAttributes: {
                        class: 'mention'
                    },
                    suggestion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$mentionSuggestion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createMentionSuggestion"])(()=>membersRef.current)
                })
            ] : [],
            // Add note mention extension (available in all workspaces)
            __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$NoteMentionExtension$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoteMention"].configure({
                HTMLAttributes: {
                    class: 'note-mention'
                },
                suggestion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$noteMentionSuggestion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createNoteMentionSuggestion"])(()=>notesRef.current)
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$markdown$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$markdown$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Markdown"]
        ],
        content: content || '',
        contentType: 'markdown',
        editorProps: {
            attributes: {
                class: 'prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none max-w-none min-h-full text-gray-300'
            }
        },
        onUpdate: ({ editor })=>{
            const markdown = editor.getMarkdown();
            setContent(markdown);
        }
    });
    // Store note title in a ref for AI context
    const noteTitleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(title);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        noteTitleRef.current = title;
    }, [
        title
    ]);
    // Expose editor to window for debugging (optional, can be removed in production)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        editor
    ]);
    // AI Completion hook
    const { suggestion, isLoading: isSuggestionLoading, acceptSuggestion, dismissSuggestion, requestSuggestion } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useAICompletion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAICompletion"])({
        editor,
        noteTitle: title,
        noteId: note?.id,
        workspaceId: note?.workspace_id,
        enabled: aiSuggestionsEnabled,
        debounceMs: 1000
    });
    // Clear suggestion when cursor moves
    const lastCursorPosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!editor || !aiSuggestionsEnabled) return;
        const updateHandler = ()=>{
            const currentPos = editor.state.selection.from;
            // If cursor moved and we have a suggestion, clear it
            if (lastCursorPosRef.current !== null && lastCursorPosRef.current !== currentPos && suggestion) {
                console.log('🔄 Cursor moved, clearing suggestion');
                dismissSuggestion();
            }
            lastCursorPosRef.current = currentPos;
        };
        editor.on('selectionUpdate', updateHandler);
        return ()=>{
            editor.off('selectionUpdate', updateHandler);
        };
    }, [
        editor,
        suggestion,
        dismissSuggestion,
        aiSuggestionsEnabled
    ]);
    // Update AI completion extension options when suggestion changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (editor && !editor.isDestroyed) {
            // Store callbacks in extension options
            const aiCompletionExt = editor.extensionManager.extensions.find((ext)=>ext.name === 'aiCompletion');
            if (aiCompletionExt) {
                aiCompletionExt.options.onAccept = acceptSuggestion;
                aiCompletionExt.options.onDismiss = dismissSuggestion;
            }
            // Pass suggestion through transaction metadata
            const tr = editor.state.tr;
            tr.setMeta('aiCompletionSuggestion', suggestion);
            tr.setMeta('aiCompletionEnabled', aiSuggestionsEnabled);
            editor.view.dispatch(tr);
        }
    }, [
        editor,
        suggestion,
        acceptSuggestion,
        dismissSuggestion,
        aiSuggestionsEnabled
    ]);
    // Trigger AI suggestions on content change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        console.log('🔍 AI suggestion effect triggered', {
            hasEditor: !!editor,
            aiEnabled: aiSuggestionsEnabled,
            isLoading: isSuggestionLoading,
            hasSuggestion: !!suggestion
        });
        if (!editor || !aiSuggestionsEnabled || isSuggestionLoading) {
            console.log('⏹️ Skipping - disabled or loading');
            return;
        }
        // Don't request new suggestions if we already have one showing (saves tokens)
        if (suggestion) {
            console.log('⏹️ Skipping - suggestion already showing');
            return;
        }
        // Get text around cursor for context
        const { from } = editor.state.selection;
        const textBefore = editor.state.doc.textBetween(Math.max(0, from - 500), from, '\n');
        console.log('📝 Text context:', {
            length: textBefore.trim().length,
            preview: textBefore.slice(-50)
        });
        if (textBefore.trim().length > 10) {
            console.log('✅ Requesting AI suggestion');
            requestSuggestion(textBefore, noteTitleRef.current);
        } else {
            console.log('❌ Text too short for suggestion');
        }
    }, [
        content,
        editor,
        aiSuggestionsEnabled,
        isSuggestionLoading,
        requestSuggestion,
        suggestion
    ]);
    // Persist AI suggestions setting to localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        aiSuggestionsEnabled
    ]);
    // Provide context to CopilotKit
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$HDOG2RTM$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCopilotReadable"])({
        description: 'Current note being edited in the editor',
        value: JSON.stringify({
            title: title || 'Untitled',
            content: content?.substring(0, 1000) || '',
            workspaceId: note?.workspace_id,
            noteId: note?.id
        }),
        categories: [
            'note_editor'
        ]
    });
    // Function to extract mentioned member IDs from editor content
    const extractMemberMentions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!editor) return [];
        const mentionedIds = [];
        editor.state.doc.descendants((node)=>{
            if (node.type.name === 'mention' && node.attrs.workspaceMemberId) {
                mentionedIds.push(node.attrs.workspaceMemberId);
            }
        });
        return [
            ...new Set(mentionedIds)
        ]; // Remove duplicates
    }, [
        editor
    ]);
    // Function to extract mentioned note IDs from editor content
    const extractNoteMentions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!editor) return [];
        const mentionedNoteIds = [];
        editor.state.doc.descendants((node)=>{
            if (node.type.name === 'noteMention' && node.attrs.noteId) {
                mentionedNoteIds.push(node.attrs.noteId);
            }
        });
        return [
            ...new Set(mentionedNoteIds)
        ]; // Remove duplicates
    }, [
        editor
    ]);
    // Update editor content when content from hook changes (e.g., after loading)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (editor && content !== undefined && !editor.isDestroyed) {
            const currentMarkdown = editor.getMarkdown();
            // Only update if the content is actually different to avoid cursor jumps
            if (currentMarkdown !== content) {
                editor.commands.setContent(content || '', {
                    contentType: 'markdown'
                });
                // Refresh image URLs after content is loaded (for expired signed URLs)
                const refreshImageUrls = async ()=>{
                    const images = [];
                    editor.state.doc.descendants((node, pos)=>{
                        if (node.type.name === 'image') {
                            const fileId = node.attrs['data-file-id'];
                            if (fileId) {
                                images.push({
                                    node,
                                    pos,
                                    fileId: parseInt(fileId, 10)
                                });
                            }
                        }
                    });
                    if (images.length === 0) return;
                    // Refresh URLs for all images with file IDs
                    for (const { node, pos, fileId } of images){
                        try {
                            const newUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceFilesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFileUrl"])(fileId);
                            if (newUrl && newUrl !== node.attrs.src) {
                                // Update the image at this position
                                const tr = editor.state.tr;
                                tr.setNodeMarkup(pos, undefined, {
                                    ...node.attrs,
                                    src: newUrl
                                });
                                editor.view.dispatch(tr);
                            }
                        } catch (error) {
                            console.error('Error refreshing image URL:', error);
                        }
                    }
                };
                // Small delay to ensure content is fully loaded
                setTimeout(refreshImageUrls, 500);
            }
        }
    }, [
        content,
        editor
    ]);
    // Auto-save member mentions when content changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isGroupNote || !note?.id || !note?.workspace_id || !currentMemberId || !editor) return;
        const saveMemberMentions = async ()=>{
            try {
                const mentionedMemberIds = extractMemberMentions();
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$mentionsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncNoteMemberMentions"])(note.id, note.workspace_id, mentionedMemberIds, currentMemberId);
            } catch (err) {
                console.error('Failed to save member mentions:', err);
            }
        };
        const timeout = setTimeout(saveMemberMentions, 1000);
        return ()=>clearTimeout(timeout);
    }, [
        content,
        isGroupNote,
        note?.id,
        note?.workspace_id,
        currentMemberId,
        extractMemberMentions,
        editor
    ]);
    // Auto-save note mentions when content changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!note?.id || !note?.workspace_id || !currentMemberId || !editor) return;
        const saveNoteMentions = async ()=>{
            try {
                const mentionedNoteIds = extractNoteMentions();
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$mentionsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncNoteToNoteMentions"])(note.id, note.workspace_id, mentionedNoteIds, currentMemberId);
            } catch (err) {
                console.error('Failed to save note mentions:', err);
            }
        };
        const timeout = setTimeout(saveNoteMentions, 1000);
        return ()=>clearTimeout(timeout);
    }, [
        content,
        note?.id,
        note?.workspace_id,
        currentMemberId,
        extractNoteMentions,
        editor
    ]);
    // Validate that noteId is a valid number (after hooks)
    if (!isValidId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-red-300 max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-bold mb-2",
                        children: "Invalid Note ID"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 693,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "The note ID must be a valid number."
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 694,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/notes'),
                        className: "mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition",
                        children: "Back to Notes"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 695,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                lineNumber: 692,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
            lineNumber: 691,
            columnNumber: 7
        }, this);
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-white"
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                lineNumber: 709,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
            lineNumber: 708,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-red-300 max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-bold mb-2",
                        children: "Error"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 718,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 719,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/notes'),
                        className: "mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition",
                        children: "Back to Notes"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 720,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                lineNumber: 717,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
            lineNumber: 716,
            columnNumber: 7
        }, this);
    }
    if (!note && !loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 text-yellow-300 max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-bold mb-2",
                        children: "Note Not Found"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 735,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "This note does not exist or you don't have access to it."
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 736,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/notes'),
                        className: "mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition",
                        children: "Back to Notes"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 737,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                lineNumber: 734,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
            lineNumber: 733,
            columnNumber: 7
        }, this);
    }
    if (!editor) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            willChange: 'scroll-position',
            transform: 'translateZ(0)',
            WebkitOverflowScrolling: 'touch'
        },
        className: "jsx-4516a88350094c88" + " " + 'flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 relative overflow-hidden',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "jsx-4516a88350094c88" + " " + 'flex items-center gap-3 px-4 md:px-6 py-6 relative z-30',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.back(),
                        className: "jsx-4516a88350094c88" + " " + 'w-[50px] h-[50px] rounded-full bg-white/10 backdrop-blur-xl text-white border border-black transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/15 hover:scale-102 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center',
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                            lineNumber: 768,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 764,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: title,
                        onChange: (e)=>setTitle(e.target.value),
                        placeholder: "タイトル",
                        className: "jsx-4516a88350094c88" + " " + 'flex-1 text-2xl font-bold bg-transparent focus:outline-none text-white placeholder-gray-500'
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 770,
                        columnNumber: 9
                    }, this),
                    isGroupNote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4516a88350094c88" + " " + 'relative',
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowAssignmentDropdown(!showAssignmentDropdown),
                                title: "担当者",
                                className: "jsx-4516a88350094c88" + " " + 'w-[50px] h-[50px] rounded-full bg-white/10 backdrop-blur-xl text-white border border-black transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/15 hover:scale-102 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center relative',
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                                        lineNumber: 785,
                                        columnNumber: 15
                                    }, this),
                                    assigneeIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-4516a88350094c88" + " " + 'absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium',
                                        children: assigneeIds.length
                                    }, void 0, false, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                                        lineNumber: 787,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                                lineNumber: 780,
                                columnNumber: 13
                            }, this),
                            showAssignmentDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>setShowAssignmentDropdown(false),
                                        className: "jsx-4516a88350094c88" + " " + 'fixed inset-0 z-30'
                                    }, void 0, false, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                                        lineNumber: 797,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-4516a88350094c88" + " " + 'absolute right-0 top-full mt-2 w-64 bg-white/10 backdrop-blur-xl border border-black rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] z-40 overflow-hidden',
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-4516a88350094c88" + " " + 'px-4 py-3 border-b border-black',
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-4516a88350094c88" + " " + 'text-sm font-medium text-white',
                                                    children: "担当者"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                                                    lineNumber: 804,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                                                lineNumber: 803,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-4516a88350094c88" + " " + 'max-h-64 overflow-y-auto',
                                                children: members.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-4516a88350094c88" + " " + 'px-4 py-3 text-sm text-gray-400',
                                                    children: "メンバーがいません"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                                                    lineNumber: 808,
                                                    columnNumber: 23
                                                }, this) : members.map((member)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>toggleAssignee(member.id),
                                                        className: "jsx-4516a88350094c88" + " " + 'w-full px-4 py-2.5 text-left text-sm hover:bg-white/10 transition-colors flex items-center gap-3',
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-4516a88350094c88" + " " + `w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${assigneeIds.includes(member.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-600'}`,
                                                                children: assigneeIds.includes(member.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    className: "jsx-4516a88350094c88" + " " + 'w-3.5 h-3.5 text-white',
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 3,
                                                                        d: "M5 13l4 4L19 7",
                                                                        className: "jsx-4516a88350094c88"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                                                                        lineNumber: 833,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                                                                    lineNumber: 827,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                                                                lineNumber: 819,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-4516a88350094c88" + " " + 'text-gray-300',
                                                                children: member.user_profile?.name || 'Unknown'
                                                            }, void 0, false, {
                                                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                                                                lineNumber: 842,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, member.id, true, {
                                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                                                        lineNumber: 813,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                                                lineNumber: 806,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                                        lineNumber: 802,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 779,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                lineNumber: 762,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-4516a88350094c88" + " " + 'sticky top-0 z-20 flex flex-wrap gap-2 mx-2 px-3 py-3 rounded-2xl border border-white/10 bg-white/8 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)]',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                        onClick: ()=>editor.chain().focus().toggleBold().run(),
                        isActive: editor.isActive('bold'),
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bold$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bold$3e$__["Bold"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                            lineNumber: 860,
                            columnNumber: 17
                        }, void 0),
                        title: "Bold"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 857,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                        onClick: ()=>editor.chain().focus().toggleItalic().run(),
                        isActive: editor.isActive('italic'),
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$italic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Italic$3e$__["Italic"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                            lineNumber: 866,
                            columnNumber: 17
                        }, void 0),
                        title: "Italic"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 863,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                        onClick: ()=>{
                            const chain = editor.chain().focus();
                            if (chain.toggleStrike) {
                                chain.toggleStrike().run();
                            }
                        },
                        isActive: editor.isActive('strike'),
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$strikethrough$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Strikethrough$3e$__["Strikethrough"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                            lineNumber: 877,
                            columnNumber: 17
                        }, void 0),
                        title: "Strikethrough"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 869,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4516a88350094c88" + " " + 'w-px h-6 bg-white/10 my-auto'
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 880,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                        onClick: ()=>editor.chain().focus().toggleBulletList().run(),
                        isActive: editor.isActive('bulletList'),
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                            lineNumber: 884,
                            columnNumber: 17
                        }, void 0),
                        title: "Bullet list"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 881,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                        onClick: ()=>editor.chain().focus().toggleOrderedList().run(),
                        isActive: editor.isActive('orderedList'),
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$ordered$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListOrdered$3e$__["ListOrdered"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                            lineNumber: 890,
                            columnNumber: 17
                        }, void 0),
                        title: "Numbered list"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 887,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                        onClick: handleToggleTaskList,
                        isActive: editor.isActive('taskList'),
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                            lineNumber: 896,
                            columnNumber: 17
                        }, void 0),
                        title: "Task list"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 893,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                        onClick: ()=>editor.chain().focus().toggleBlockquote().run(),
                        isActive: editor.isActive('blockquote'),
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__["Quote"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                            lineNumber: 902,
                            columnNumber: 17
                        }, void 0),
                        title: "Quote"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 899,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4516a88350094c88" + " " + 'w-px h-6 bg-white/10 my-auto'
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 905,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                        onClick: triggerImageInput,
                        disabled: uploadingImage || !note?.workspace_id,
                        icon: uploadingImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-4 h-4 animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                            lineNumber: 911,
                            columnNumber: 15
                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                            lineNumber: 913,
                            columnNumber: 15
                        }, void 0),
                        title: "Insert Image"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 906,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4516a88350094c88" + " " + 'w-px h-6 bg-white/10 my-auto'
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 918,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                        onClick: ()=>editor.chain().focus().undo().run(),
                        disabled: !editor.can().undo(),
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo$3e$__["Undo"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                            lineNumber: 922,
                            columnNumber: 17
                        }, void 0),
                        title: "Undo"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 919,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                        onClick: ()=>editor.chain().focus().redo().run(),
                        disabled: !editor.can().redo(),
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo$3e$__["Redo"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                            lineNumber: 928,
                            columnNumber: 17
                        }, void 0),
                        title: "Redo"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 925,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4516a88350094c88" + " " + 'w-px h-6 bg-white/10 my-auto'
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 931,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                        onClick: ()=>setAiSuggestionsEnabled(!aiSuggestionsEnabled),
                        isActive: aiSuggestionsEnabled,
                        icon: isSuggestionLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-4 h-4 animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                            lineNumber: 937,
                            columnNumber: 15
                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                            lineNumber: 939,
                            columnNumber: 15
                        }, void 0),
                        title: `AI Suggestions (${aiSuggestionsEnabled ? 'On' : 'Off'}) - Press Tab to accept`
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 932,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                lineNumber: 856,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    willChange: 'scroll-position',
                    transform: 'translateZ(0)',
                    WebkitOverflowScrolling: 'touch'
                },
                className: "jsx-4516a88350094c88" + " " + 'flex flex-col flex-1 px-4 md:px-6 relative z-10 overflow-auto',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-4516a88350094c88" + " " + 'flex-1 min-h-0',
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EditorContent"], {
                        editor: editor
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                        lineNumber: 957,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                    lineNumber: 956,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                lineNumber: 947,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: imageInputRef,
                type: "file",
                accept: "image/*",
                onChange: handleImageUpload,
                className: "jsx-4516a88350094c88" + " " + 'hidden'
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
                lineNumber: 962,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$styled$2d$jsx$40$5$2e$1$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "4516a88350094c88",
                children: '.ProseMirror{outline:none;min-height:100%;padding:0}.ProseMirror p{margin:.75em 0}.ProseMirror p:first-child{margin-top:0}.ProseMirror p:last-child{margin-bottom:0}.ProseMirror h1,.ProseMirror h2,.ProseMirror h3{margin-top:1em;margin-bottom:.5em;font-weight:600;line-height:1.2}.ProseMirror h1{font-size:2em}.ProseMirror h2{font-size:1.5em}.ProseMirror h3{font-size:1.25em}.ProseMirror ul,.ProseMirror ol{margin:.75em 0;padding-left:1.5em!important;list-style-position:outside!important}.ProseMirror ul{list-style-type:disc!important}.ProseMirror ul li{list-style-type:disc!important;display:list-item!important}.ProseMirror ol{list-style-type:decimal!important}.ProseMirror ol li{list-style-type:decimal!important;display:list-item!important}.ProseMirror li{margin:.25em 0}.ProseMirror ul.task-list,.ProseMirror ul[data-type=taskList]{margin:.75em 0;padding-left:0!important;list-style:none!important}.ProseMirror ul.task-list>li,.ProseMirror ul[data-type=taskList]>li{align-items:flex-start;gap:.6em;margin:.3em 0;list-style:none!important;display:flex!important}.ProseMirror ul.task-list>li::marker,.ProseMirror ul[data-type=taskList]>li::marker{content:""}.ProseMirror li.task-item,.ProseMirror li[data-type=taskItem]{align-items:flex-start;gap:.6em;display:flex}.ProseMirror li.task-item>label,.ProseMirror li[data-type=taskItem]>label{cursor:pointer;user-select:none;flex-shrink:0;justify-content:center;align-items:center;margin-top:.15em;display:inline-flex}.ProseMirror li.task-item>label input[type=checkbox],.ProseMirror li[data-type=taskItem]>label input[type=checkbox]{cursor:pointer;accent-color:#3b82f6cc;border-radius:.25em;width:1.1em;height:1.1em;margin:0}.ProseMirror li.task-item>div,.ProseMirror li[data-type=taskItem]>div{flex:1;min-width:0}.ProseMirror li.task-item[data-checked=true]>div,.ProseMirror li[data-type=taskItem][data-checked=true]>div{opacity:.7;color:#ffffff80;text-decoration:line-through}.ProseMirror blockquote{color:#ffffffb3;border-left:3px solid #fff3;margin:1em 0;padding-left:1em;font-style:italic}.ProseMirror strong{font-weight:600}.ProseMirror em{font-style:italic}.ProseMirror s{text-decoration:line-through}.ProseMirror p.is-editor-empty:first-child:before{content:attr(data-placeholder);float:left;color:#9ca3af99;pointer-events:none;height:0}.ProseMirror img.editor-image{cursor:pointer;border:1px solid #ffffff1a;border-radius:.5rem;max-width:100%;height:auto;margin:1em 0;display:block}.ProseMirror img.editor-image:hover{border-color:#fff3}.ProseMirror img.editor-image.ProseMirror-selectednode{outline-offset:2px;outline:2px solid #3b82f680}.ProseMirror .mention{color:#93c5fd;cursor:pointer;background-color:#3b82f633;border-radius:.25rem;padding:.125rem .25rem;font-weight:500;transition:background-color .2s}.ProseMirror .mention:hover{background-color:#3b82f64d}.ProseMirror .note-mention{color:#86efac;cursor:pointer;background-color:#22c55e33;border-radius:.25rem;padding:.125rem .25rem;font-weight:500;transition:background-color .2s}.ProseMirror .note-mention:hover{background-color:#22c55e4d}.ProseMirror .ai-completion-ghost-text{color:#9ca3af;opacity:.5;pointer-events:none;user-select:none;font-style:italic}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx",
        lineNumber: 753,
        columnNumber: 5
    }, this);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/notes/[id]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NoteDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$notes$2f$components$2f$NoteEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/features/notes/components/NoteEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function NoteDetailPage({ params }) {
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(params);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$notes$2f$components$2f$NoteEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        noteId: id
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/notes/[id]/page.tsx",
        lineNumber: 13,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=code_cogni_cogni-frontend_apps_web_src_b41ba25f._.js.map