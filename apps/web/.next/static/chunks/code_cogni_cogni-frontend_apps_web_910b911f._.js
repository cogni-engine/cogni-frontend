(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/notesApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-client] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
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
    return "".concat(title, "\n").concat(content);
}
async function getNotes(workspaceId) {
    let includeDeleted = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    let query = supabase.from('notes').select("\n      *,\n      workspace_member_note(\n        workspace_member_note_role,\n        workspace_member:workspace_member_id(\n          id,\n          user_id,\n          user_profiles!user_id(id, name, avatar_url)\n        )\n      )\n    ").eq('workspace_id', workspaceId);
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
    const newTitle = "".concat(title, " (Copy)");
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
    const { data, error } = await supabase.from('notes').select("\n      *,\n      workspace:workspace_id(*),\n      workspace_member_note(\n        workspace_member_note_role,\n        workspace_member:workspace_member_id(\n          id,\n          user_id,\n          user_profiles!user_id(id, name, avatar_url)\n        )\n      )\n    ").eq('workspace_id', workspaceId).ilike('text', "%".concat(searchQuery, "%")).order('updated_at', {
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
    const { data, error } = await supabase.from('notes').select("\n      *,\n      workspace:workspace_id(*),\n      workspace_member_note(\n        workspace_member_note_role,\n        workspace_member:workspace_member_id(\n          id,\n          user_id,\n          user_profiles!user_id(id, name, avatar_url)\n        )\n      )\n    ").in('id', noteIds).order('updated_at', {
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
    const { data, error } = await supabase.from('workspace_member_note').select("\n      workspace_member_note_role,\n      workspace_member:workspace_member_id(\n        id,\n        user_id,\n        user_profiles!user_id(id, name)\n      )\n    ").eq('note_id', noteId);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useWorkspaceNotes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatDate",
    ()=>formatDate,
    "useWorkspaceNotes",
    ()=>useWorkspaceNotes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/notesApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/workspaceApi.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
/**
 * Parse note into format with title, content, and preview
 */ function parseNote(note) {
    const { title, content } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseNoteText"])(note.text);
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
    _s();
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [workspace, setWorkspace] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchNotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkspaceNotes.useCallback[fetchNotes]": async ()=>{
            try {
                setLoading(true);
                setError(null);
                // Fetch workspace info and notes in parallel
                const [workspaceData, notesData] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkspace"])(workspaceId),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNotes"])(workspaceId)
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
        }
    }["useWorkspaceNotes.useCallback[fetchNotes]"], [
        workspaceId
    ]);
    const searchNotesQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkspaceNotes.useCallback[searchNotesQuery]": async (query)=>{
            try {
                setLoading(true);
                setError(null);
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchNotes"])(workspaceId, query);
                const parsedNotes = data.map(parseNote);
                setNotes(parsedNotes);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to search notes');
                console.error('Error searching notes:', err);
            } finally{
                setLoading(false);
            }
        }
    }["useWorkspaceNotes.useCallback[searchNotesQuery]"], [
        workspaceId
    ]);
    const createNewNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkspaceNotes.useCallback[createNewNote]": async (title, content)=>{
            try {
                setError(null);
                const newNote = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNote"])(workspaceId, title, content);
                const parsedNote = parseNote(newNote);
                setNotes({
                    "useWorkspaceNotes.useCallback[createNewNote]": (prev)=>[
                            parsedNote,
                            ...prev
                        ]
                }["useWorkspaceNotes.useCallback[createNewNote]"]);
                return parsedNote;
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to create note');
                console.error('Error creating note:', err);
                throw err;
            }
        }
    }["useWorkspaceNotes.useCallback[createNewNote]"], [
        workspaceId
    ]);
    const updateExistingNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkspaceNotes.useCallback[updateExistingNote]": async (id, title, content)=>{
            try {
                setError(null);
                const updatedNote = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateNote"])(id, title, content);
                const parsedNote = parseNote(updatedNote);
                setNotes({
                    "useWorkspaceNotes.useCallback[updateExistingNote]": (prev)=>prev.map({
                            "useWorkspaceNotes.useCallback[updateExistingNote]": (note)=>note.id === id ? parsedNote : note
                        }["useWorkspaceNotes.useCallback[updateExistingNote]"])
                }["useWorkspaceNotes.useCallback[updateExistingNote]"]);
                return parsedNote;
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to update note');
                console.error('Error updating note:', err);
                throw err;
            }
        }
    }["useWorkspaceNotes.useCallback[updateExistingNote]"], []);
    const deleteExistingNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkspaceNotes.useCallback[deleteExistingNote]": async (id)=>{
            try {
                setError(null);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteNote"])(id);
                setNotes({
                    "useWorkspaceNotes.useCallback[deleteExistingNote]": (prev)=>prev.filter({
                            "useWorkspaceNotes.useCallback[deleteExistingNote]": (note)=>note.id !== id
                        }["useWorkspaceNotes.useCallback[deleteExistingNote]"])
                }["useWorkspaceNotes.useCallback[deleteExistingNote]"]);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to delete note');
                console.error('Error deleting note:', err);
                throw err;
            }
        }
    }["useWorkspaceNotes.useCallback[deleteExistingNote]"], []);
    const softDeleteExistingNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkspaceNotes.useCallback[softDeleteExistingNote]": async (id)=>{
            try {
                setError(null);
                const deletedNote = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["softDeleteNote"])(id);
                const parsedNote = parseNote(deletedNote);
                setNotes({
                    "useWorkspaceNotes.useCallback[softDeleteExistingNote]": (prev)=>prev.map({
                            "useWorkspaceNotes.useCallback[softDeleteExistingNote]": (note)=>note.id === id ? parsedNote : note
                        }["useWorkspaceNotes.useCallback[softDeleteExistingNote]"])
                }["useWorkspaceNotes.useCallback[softDeleteExistingNote]"]);
                return parsedNote;
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to delete note');
                console.error('Error soft deleting note:', err);
                throw err;
            }
        }
    }["useWorkspaceNotes.useCallback[softDeleteExistingNote]"], []);
    const restoreExistingNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkspaceNotes.useCallback[restoreExistingNote]": async (id)=>{
            try {
                setError(null);
                const restoredNote = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["restoreNote"])(id);
                const parsedNote = parseNote(restoredNote);
                setNotes({
                    "useWorkspaceNotes.useCallback[restoreExistingNote]": (prev)=>prev.map({
                            "useWorkspaceNotes.useCallback[restoreExistingNote]": (note)=>note.id === id ? parsedNote : note
                        }["useWorkspaceNotes.useCallback[restoreExistingNote]"])
                }["useWorkspaceNotes.useCallback[restoreExistingNote]"]);
                return parsedNote;
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to restore note');
                console.error('Error restoring note:', err);
                throw err;
            }
        }
    }["useWorkspaceNotes.useCallback[restoreExistingNote]"], []);
    const duplicateExistingNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkspaceNotes.useCallback[duplicateExistingNote]": async (id)=>{
            try {
                setError(null);
                const newNote = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["duplicateNote"])(id);
                const parsedNote = parseNote(newNote);
                setNotes({
                    "useWorkspaceNotes.useCallback[duplicateExistingNote]": (prev)=>[
                            parsedNote,
                            ...prev
                        ]
                }["useWorkspaceNotes.useCallback[duplicateExistingNote]"]);
                return parsedNote;
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to duplicate note');
                console.error('Error duplicating note:', err);
                throw err;
            }
        }
    }["useWorkspaceNotes.useCallback[duplicateExistingNote]"], []);
    const emptyWorkspaceTrash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkspaceNotes.useCallback[emptyWorkspaceTrash]": async ()=>{
            try {
                setError(null);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emptyTrash"])(workspaceId);
                setNotes({
                    "useWorkspaceNotes.useCallback[emptyWorkspaceTrash]": (prev)=>prev.filter({
                            "useWorkspaceNotes.useCallback[emptyWorkspaceTrash]": (note)=>!note.deleted_at
                        }["useWorkspaceNotes.useCallback[emptyWorkspaceTrash]"])
                }["useWorkspaceNotes.useCallback[emptyWorkspaceTrash]"]);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to empty trash');
                console.error('Error emptying trash:', err);
                throw err;
            }
        }
    }["useWorkspaceNotes.useCallback[emptyWorkspaceTrash]"], [
        workspaceId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWorkspaceNotes.useEffect": ()=>{
            if (workspaceId) {
                fetchNotes();
            }
        }
    }["useWorkspaceNotes.useEffect"], [
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
_s(useWorkspaceNotes, "4nroSUQ4tjgCvubcjwCl5OeSWyI=");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkspaceLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EllipsisVertical$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as EllipsisVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspaceNotes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useWorkspaceNotes.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function WorkspaceLayout(param) {
    let { children } = param;
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const workspaceId = parseInt(params.id);
    const { workspace } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspaceNotes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspaceNotes"])(workspaceId);
    const getCurrentView = ()=>{
        if (pathname.includes('/members')) return 'members';
        if (pathname.includes('/menu')) return 'menu';
        if (pathname.includes('/chat')) return 'chat';
        return 'notes';
    };
    const currentView = getCurrentView();
    const handleBackNavigation = ()=>{
        if (currentView === 'members' || currentView === 'menu') {
            router.push("".concat(basePath, "/chat"));
            return;
        }
        router.push('/workspace');
    };
    const handleViewChange = (view)=>{
        const basePath = "/workspace/".concat(workspaceId);
        switch(view){
            case 'notes':
                router.push("".concat(basePath, "/notes"));
                break;
            case 'chat':
                router.push("".concat(basePath, "/chat"));
                break;
            case 'members':
                router.push("".concat(basePath, "/members"));
                break;
            case 'menu':
                router.push("".concat(basePath, "/menu"));
                break;
        }
    };
    const [isMenuOpen, setIsMenuOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const menuRef = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "WorkspaceLayout.useEffect": ()=>{
            const handleKey = {
                "WorkspaceLayout.useEffect.handleKey": (e)=>{
                    if (e.key === 'Escape') setIsMenuOpen(false);
                }
            }["WorkspaceLayout.useEffect.handleKey"];
            const handleClickOutside = {
                "WorkspaceLayout.useEffect.handleClickOutside": (e)=>{
                    if (!menuRef.current) return;
                    if (!menuRef.current.contains(e.target)) setIsMenuOpen(false);
                }
            }["WorkspaceLayout.useEffect.handleClickOutside"];
            document.addEventListener('keydown', handleKey);
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "WorkspaceLayout.useEffect": ()=>{
                    document.removeEventListener('keydown', handleKey);
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["WorkspaceLayout.useEffect"];
        }
    }["WorkspaceLayout.useEffect"], []);
    const basePath = "/workspace/".concat(workspaceId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 p-4 md:p-6 relative overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative z-10 flex flex-col h-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleBackNavigation,
                                    className: "w-[50px] h-[50px] rounded-full bg-white/10 backdrop-blur-xl border border-black hover:bg-white/15 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center p-0 z-10",
                                    title: "Go back",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-5 h-5 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "flex-1 min-w-0 text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent truncate",
                                    children: workspace ? workspace.title : 'Workspace'
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    ref: menuRef,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsMenuOpen((prev)=>!prev),
                                            className: "w-[50px] h-[50px] rounded-full bg-white/10 backdrop-blur-xl border border-black hover:bg-white/15 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center p-0",
                                            "aria-haspopup": "menu",
                                            "aria-expanded": isMenuOpen,
                                            "aria-label": "Open workspace menu",
                                            title: "More actions",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EllipsisVertical$3e$__["EllipsisVertical"], {
                                                className: "w-5 h-5 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                                lineNumber: 111,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                            lineNumber: 103,
                                            columnNumber: 15
                                        }, this),
                                        isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            role: "menu",
                                            className: "absolute right-0 mt-2 w-45 rounded-md border border-white/10 bg-black/90 backdrop-blur shadow-lg z-20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    role: "menuitem",
                                                    onClick: ()=>{
                                                        setIsMenuOpen(false);
                                                        router.push("".concat(basePath, "/members"));
                                                    },
                                                    className: "w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-md flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                                            lineNumber: 126,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Members"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    role: "menuitem",
                                                    onClick: ()=>{
                                                        setIsMenuOpen(false);
                                                        router.push("".concat(basePath, "/menu"));
                                                    },
                                                    className: "w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-md flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                                            lineNumber: 137,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Workspace Settings"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                            lineNumber: 114,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        (currentView === 'chat' || currentView === 'notes') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex w-full mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex w-full divide-x divide-white/15 overflow-hidden rounded-3xl border border-black bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleViewChange('chat'),
                                        className: "flex flex-1 items-center justify-center gap-2 px-6 py-2 text-sm font-medium transition-all duration-300 ".concat(currentView === 'chat' ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white'),
                                        "aria-current": currentView === 'chat' ? 'page' : undefined,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                                lineNumber: 158,
                                                columnNumber: 19
                                            }, this),
                                            "Chat"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleViewChange('notes'),
                                        className: "flex flex-1 items-center justify-center gap-2 px-6 py-2 text-sm font-medium transition-all duration-300 ".concat(currentView === 'notes' ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white'),
                                        "aria-current": currentView === 'notes' ? 'page' : undefined,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                                lineNumber: 170,
                                                columnNumber: 19
                                            }, this),
                                            "Notes"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                            lineNumber: 147,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
                    lineNumber: 179,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
            lineNumber: 88,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/layout.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(WorkspaceLayout, "3noBFva9prYW6OVqMXmFNLr1aBA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspaceNotes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspaceNotes"]
    ];
});
_c = WorkspaceLayout;
var _c;
__turbopack_context__.k.register(_c, "WorkspaceLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ArrowLeft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m12 19-7-7 7-7",
            key: "1l729n"
        }
    ],
    [
        "path",
        {
            d: "M19 12H5",
            key: "x3x0zl"
        }
    ]
];
const ArrowLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("arrow-left", __iconNode);
;
 //# sourceMappingURL=arrow-left.js.map
}),
"[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>FileText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
            key: "1rqfz7"
        }
    ],
    [
        "path",
        {
            d: "M14 2v4a2 2 0 0 0 2 2h4",
            key: "tnqrlb"
        }
    ],
    [
        "path",
        {
            d: "M10 9H8",
            key: "b1mrlr"
        }
    ],
    [
        "path",
        {
            d: "M16 13H8",
            key: "t4e002"
        }
    ],
    [
        "path",
        {
            d: "M16 17H8",
            key: "z1uh3a"
        }
    ]
];
const FileText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("file-text", __iconNode);
;
 //# sourceMappingURL=file-text.js.map
}),
"[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileText",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>EllipsisVertical
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "1",
            key: "41hilf"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "5",
            r: "1",
            key: "gxeob9"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "19",
            r: "1",
            key: "lyex9k"
        }
    ]
];
const EllipsisVertical = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ellipsis-vertical", __iconNode);
;
 //# sourceMappingURL=ellipsis-vertical.js.map
}),
"[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as EllipsisVertical>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EllipsisVertical",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Users
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
            key: "1yyitq"
        }
    ],
    [
        "path",
        {
            d: "M16 3.128a4 4 0 0 1 0 7.744",
            key: "16gr8j"
        }
    ],
    [
        "path",
        {
            d: "M22 21v-2a4 4 0 0 0-3-3.87",
            key: "kshegd"
        }
    ],
    [
        "circle",
        {
            cx: "9",
            cy: "7",
            r: "4",
            key: "nufk8"
        }
    ]
];
const Users = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("users", __iconNode);
;
 //# sourceMappingURL=users.js.map
}),
"[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Users",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=code_cogni_cogni-frontend_apps_web_910b911f._.js.map