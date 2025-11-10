(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/workspaceFilesApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-client] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
const WORKSPACE_FILES_BUCKET = 'workspace-files';
async function uploadWorkspaceFile(workspaceId, file) {
    // Generate a UUID for the storage path (not the database ID)
    const storageUuid = crypto.randomUUID();
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    // Storage path: workspace-files/{workspace_id}/uploads/{uuid}/{original_filename}
    const filePath = "".concat(workspaceId, "/uploads/").concat(storageUuid, "/").concat(sanitizedFilename);
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
        url: (signedUrlData === null || signedUrlData === void 0 ? void 0 : signedUrlData.signedUrl) || '',
        original_filename: file.name,
        file_size: file.size,
        mime_type: file.type
    };
}
async function getFileUrl(workspaceFileId) {
    let expiresIn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3600;
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
async function getWorkspaceFiles(workspaceId) {
    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50;
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
    if (fileData === null || fileData === void 0 ? void 0 : fileData.file_path) {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/mentionsApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-client] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/workspaceMessagesApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteWorkspaceMessage",
    ()=>deleteWorkspaceMessage,
    "getCurrentWorkspaceMember",
    ()=>getCurrentWorkspaceMember,
    "getWorkspaceMessages",
    ()=>getWorkspaceMessages,
    "markWorkspaceMessagesAsRead",
    ()=>markWorkspaceMessagesAsRead,
    "sendWorkspaceMessage",
    ()=>sendWorkspaceMessage,
    "updateWorkspaceMessage",
    ()=>updateWorkspaceMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$profileUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/profileUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceFilesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/workspaceFilesApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$mentionsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/mentionsApi.ts [app-client] (ecmascript)");
;
;
;
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
function transformMessageRow(row) {
    if (!row) {
        return row;
    }
    const { workspace_member, workspace_message_reads, replied_message, workspace_message_files, ...rest } = row;
    var _normalizeWorkspaceProfile;
    const workspaceMember = workspace_member ? {
        ...workspace_member,
        user_profile: (_normalizeWorkspaceProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$profileUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeWorkspaceProfile"])(workspace_member.user_profile)) !== null && _normalizeWorkspaceProfile !== void 0 ? _normalizeWorkspaceProfile : null
    } : undefined;
    const reads = (workspace_message_reads !== null && workspace_message_reads !== void 0 ? workspace_message_reads : []).map((read)=>{
        var _read_read_at, _ref, _normalizeWorkspaceProfile;
        return {
            workspace_message_id: read.workspace_message_id,
            workspace_member_id: read.workspace_member_id,
            read_at: (_ref = (_read_read_at = read.read_at) !== null && _read_read_at !== void 0 ? _read_read_at : read.created_at) !== null && _ref !== void 0 ? _ref : new Date().toISOString(),
            workspace_member: read.workspace_member ? {
                ...read.workspace_member,
                user_profile: (_normalizeWorkspaceProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$profileUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeWorkspaceProfile"])(read.workspace_member.user_profile)) !== null && _normalizeWorkspaceProfile !== void 0 ? _normalizeWorkspaceProfile : null
            } : undefined
        };
    });
    // Transform replied message if it exists
    const transformedRepliedMessage = replied_message ? transformMessageRow(replied_message) : null;
    // Transform files - join through workspace_files table
    const files = (workspace_message_files !== null && workspace_message_files !== void 0 ? workspace_message_files : []).filter((fileLink)=>fileLink.workspace_file).map((fileLink)=>({
            id: fileLink.workspace_file.id,
            original_filename: fileLink.workspace_file.orginal_file_name,
            file_path: fileLink.workspace_file.file_path,
            mime_type: fileLink.workspace_file.mime_type,
            file_size: fileLink.workspace_file.file_size
        }));
    return {
        ...rest,
        workspace_member: workspaceMember,
        replied_message: transformedRepliedMessage,
        reads,
        read_count: reads.length,
        files: files.length > 0 ? files : undefined
    };
}
async function getWorkspaceMessages(workspaceId) {
    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50, beforeTimestamp = arguments.length > 2 ? arguments[2] : void 0;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error('User not authenticated');
    }
    let query = supabase.from('workspace_messages').select("\n      *,\n      workspace_member:workspace_member_id(\n        id,\n        user_id,\n        user_profile:user_id(id, name, avatar_url)\n      ),\n      workspace_message_reads(\n        workspace_message_id,\n        workspace_member_id,\n        created_at,\n        workspace_member:workspace_member_id(\n          id,\n          user_id,\n          user_profile:user_id(id, name, avatar_url)\n        )\n      ),\n      replied_message:reply_to_id(\n        id,\n        text,\n        created_at,\n        workspace_member_id,\n        workspace_member:workspace_member_id(\n          id,\n          user_id,\n          user_profile:user_id(id, name, avatar_url)\n        )\n      ),\n      workspace_message_files(\n        id,\n        workspace_file_id,\n        workspace_file:workspace_file_id(\n          id,\n          orginal_file_name,\n          file_path,\n          mime_type,\n          file_size\n        )\n      )\n    ").eq('workspace_id', workspaceId);
    // If beforeTimestamp is provided, get messages older than that timestamp
    if (beforeTimestamp) {
        query = query.lt('created_at', beforeTimestamp);
    }
    const { data, error } = await query.order('created_at', {
        ascending: false
    }).limit(limit);
    if (error) throw error;
    // Transform nested structure
    return (data || []).map(transformMessageRow);
}
async function sendWorkspaceMessage(workspaceId, workspaceMemberId, text, replyToId, workspaceFileIds, mentionedMemberIds, mentionedNoteIds) {
    const { data, error } = await supabase.from('workspace_messages').insert({
        workspace_id: workspaceId,
        workspace_member_id: workspaceMemberId,
        text,
        reply_to_id: replyToId !== null && replyToId !== void 0 ? replyToId : null
    }).select("\n      *,\n      workspace_member:workspace_member_id(\n        id,\n        user_id,\n        user_profile:user_id(id, name, avatar_url)\n      ),\n      workspace_message_reads(\n        workspace_message_id,\n        workspace_member_id,\n        created_at,\n        workspace_member:workspace_member_id(\n          id,\n          user_id,\n          user_profile:user_id(id, name, avatar_url)\n        )\n      ),\n      replied_message:reply_to_id(\n        id,\n        text,\n        created_at,\n        workspace_member_id,\n        workspace_member:workspace_member_id(\n          id,\n          user_id,\n          user_profile:user_id(id, name, avatar_url)\n        )\n      )\n    ").single();
    if (error) throw error;
    // Link files to message if any
    if (workspaceFileIds && workspaceFileIds.length > 0) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceFilesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linkFilesToMessage"])(data.id, workspaceFileIds);
        } catch (fileError) {
            console.error('Error linking files to message:', fileError);
        // Don't throw - message was created successfully, just file linking failed
        }
    }
    // Sync member mentions if any
    if (mentionedMemberIds && mentionedMemberIds.length > 0) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$mentionsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncWorkspaceMessageMentions"])(data.id, workspaceId, mentionedMemberIds, workspaceMemberId);
        } catch (mentionError) {
            console.error('Error syncing member mentions:', mentionError);
        // Don't throw - message was created successfully, just mention syncing failed
        }
    }
    // Sync note mentions if any
    if (mentionedNoteIds && mentionedNoteIds.length > 0) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$mentionsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncWorkspaceMessageNoteMentions"])(data.id, workspaceId, mentionedNoteIds, workspaceMemberId);
        } catch (mentionError) {
            console.error('Error syncing note mentions:', mentionError);
        // Don't throw - message was created successfully, just mention syncing failed
        }
    }
    // Transform nested structure
    return transformMessageRow(data);
}
async function updateWorkspaceMessage(messageId, text) {
    const { data, error } = await supabase.from('workspace_messages').update({
        text
    }).eq('id', messageId).select("\n      *,\n      workspace_member:workspace_member_id(\n        id,\n        user_id,\n        user_profile:user_id(id, name, avatar_url)\n      ),\n      workspace_message_reads(\n        workspace_message_id,\n        workspace_member_id,\n        created_at,\n        workspace_member:workspace_member_id(\n          id,\n          user_id,\n          user_profile:user_id(id, name, avatar_url)\n        )\n      ),\n      replied_message:reply_to_id(\n        id,\n        text,\n        created_at,\n        workspace_member_id,\n        workspace_member:workspace_member_id(\n          id,\n          user_id,\n          user_profile:user_id(id, name, avatar_url)\n        )\n      )\n    ").single();
    if (error) throw error;
    return transformMessageRow(data);
}
async function deleteWorkspaceMessage(messageId) {
    const { error } = await supabase.from('workspace_messages').delete().eq('id', messageId);
    if (error) throw error;
}
async function getCurrentWorkspaceMember(workspaceId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error('User not authenticated');
    }
    const { data, error } = await supabase.from('workspace_member').select('id, last_read_message_id').eq('workspace_id', workspaceId).eq('user_id', user.id).maybeSingle();
    if (error) throw error;
    if (!data) {
        return null;
    }
    var _data_last_read_message_id;
    return {
        id: data.id,
        last_read_message_id: (_data_last_read_message_id = data.last_read_message_id) !== null && _data_last_read_message_id !== void 0 ? _data_last_read_message_id : null
    };
}
async function markWorkspaceMessagesAsRead(workspaceId, workspaceMemberId, messageIds, currentLastRead) {
    if (messageIds.length === 0) {
        return currentLastRead !== null && currentLastRead !== void 0 ? currentLastRead : null;
    }
    const uniqueIds = Array.from(new Set(messageIds));
    const rows = uniqueIds.map((messageId)=>({
            workspace_message_id: messageId,
            workspace_member_id: workspaceMemberId
        }));
    const { error: upsertError } = await supabase.from('workspace_message_reads').upsert(rows, {
        onConflict: 'workspace_message_id,workspace_member_id'
    });
    if (upsertError) throw upsertError;
    const newLastRead = Math.max(...uniqueIds);
    const lastReadToCompare = currentLastRead !== null && currentLastRead !== void 0 ? currentLastRead : null;
    if (lastReadToCompare !== null && newLastRead <= lastReadToCompare) {
        return lastReadToCompare;
    }
    const { error: updateError } = await supabase.from('workspace_member').update({
        last_read_message_id: newLastRead
    }).eq('id', workspaceMemberId).eq('workspace_id', workspaceId);
    if (updateError) throw updateError;
    return newLastRead;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useWorkspaceChat.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWorkspaceChat",
    ()=>useWorkspaceChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/swr@2.3.6_react@19.1.0/node_modules/swr/dist/index/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceMessagesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/workspaceMessagesApi.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// SWR keys
const messagesKey = (workspaceId, limit, beforeTimestamp)=>{
    const params = new URLSearchParams();
    if (limit) params.set('limit', limit.toString());
    if (beforeTimestamp) params.set('before', beforeTimestamp);
    const query = params.toString();
    return "/workspaces/".concat(workspaceId, "/messages").concat(query ? "?".concat(query) : '');
};
const workspaceMemberKey = (workspaceId)=>"/workspaces/".concat(workspaceId, "/member");
function useWorkspaceChat(workspaceId) {
    _s();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    const channelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reconnectTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const retryCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastMarkedMessageIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markInFlightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const workspaceMemberRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const oldestMessageTimestampRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasMoreMessages, setHasMoreMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [localMessages, setLocalMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingMore, setIsLoadingMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sendError, setSendError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fetch workspace member using SWR
    const { data: workspaceMember, error: memberError, mutate: mutateMember } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(workspaceMemberKey(workspaceId), {
        "useWorkspaceChat.useSWR": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceMessagesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentWorkspaceMember"])(workspaceId)
    }["useWorkspaceChat.useSWR"], {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });
    // Fetch initial messages using SWR
    const { data: initialMessages, error: messagesError, isLoading, mutate: mutateMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(messagesKey(workspaceId, 50), {
        "useWorkspaceChat.useSWR": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceMessagesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkspaceMessages"])(workspaceId, 50)
    }["useWorkspaceChat.useSWR"], {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });
    // Update workspace member ref when it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWorkspaceChat.useEffect": ()=>{
            if (workspaceMember) {
                workspaceMemberRef.current = workspaceMember;
            }
        }
    }["useWorkspaceChat.useEffect"], [
        workspaceMember
    ]);
    // Decorate messages with read status
    const decorateMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkspaceChat.useCallback[decorateMessages]": (rawMessages, memberOverride)=>{
            const member = memberOverride !== null && memberOverride !== void 0 ? memberOverride : workspaceMemberRef.current;
            var _member_id;
            const memberId = (_member_id = member === null || member === void 0 ? void 0 : member.id) !== null && _member_id !== void 0 ? _member_id : null;
            var _member_last_read_message_id;
            const lastReadId = (_member_last_read_message_id = member === null || member === void 0 ? void 0 : member.last_read_message_id) !== null && _member_last_read_message_id !== void 0 ? _member_last_read_message_id : null;
            return rawMessages.map({
                "useWorkspaceChat.useCallback[decorateMessages]": (message)=>{
                    const existingReads = message.reads ? [
                        ...message.reads
                    ] : [];
                    var _message_read_count;
                    const readCount = (_message_read_count = message.read_count) !== null && _message_read_count !== void 0 ? _message_read_count : existingReads.length;
                    const hasExistingRead = memberId !== null ? existingReads.some({
                        "useWorkspaceChat.useCallback[decorateMessages]": (read)=>read.workspace_member_id === memberId
                    }["useWorkspaceChat.useCallback[decorateMessages]"]) : false;
                    const withinLastReadRange = memberId !== null && lastReadId !== null && message.id <= lastReadId;
                    return {
                        ...message,
                        reads: existingReads,
                        read_count: readCount,
                        is_read_by_current_user: hasExistingRead || withinLastReadRange
                    };
                }
            }["useWorkspaceChat.useCallback[decorateMessages]"]);
        }
    }["useWorkspaceChat.useCallback[decorateMessages]"], []);
    // Initialize local messages from SWR data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWorkspaceChat.useEffect": ()=>{
            if (initialMessages) {
                const reversedMessages = [
                    ...initialMessages
                ].reverse();
                const decorated = decorateMessages(reversedMessages, workspaceMember);
                setLocalMessages(decorated);
                // Track pagination state
                if (reversedMessages.length > 0) {
                    var _reversedMessages_;
                    oldestMessageTimestampRef.current = ((_reversedMessages_ = reversedMessages[0]) === null || _reversedMessages_ === void 0 ? void 0 : _reversedMessages_.created_at) || null;
                }
                setHasMoreMessages(initialMessages.length === 50);
            }
        }
    }["useWorkspaceChat.useEffect"], [
        initialMessages,
        workspaceMember,
        decorateMessages
    ]);
    // Re-decorate messages when workspace member changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWorkspaceChat.useEffect": ()=>{
            if (workspaceMember) {
                setLocalMessages({
                    "useWorkspaceChat.useEffect": (prev)=>decorateMessages(prev, workspaceMember)
                }["useWorkspaceChat.useEffect"]);
            }
        }
    }["useWorkspaceChat.useEffect"], [
        workspaceMember,
        decorateMessages
    ]);
    // Set up Realtime subscription with retry logic
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWorkspaceChat.useEffect": ()=>{
            let mounted = true;
            async function setupRealtime() {
                // Clear existing reconnect timeout
                if (reconnectTimeoutRef.current) {
                    clearTimeout(reconnectTimeoutRef.current);
                    reconnectTimeoutRef.current = null;
                }
                // Remove existing channel
                if (channelRef.current) {
                    supabase.removeChannel(channelRef.current);
                    channelRef.current = null;
                }
                try {
                    // Get current session to ensure we have auth
                    const { data: { session } } = await supabase.auth.getSession();
                    if (!session || !mounted) {
                        console.warn('No session available for Realtime');
                        setIsConnected(false);
                        return;
                    }
                    // Set auth for Realtime
                    await supabase.realtime.setAuth();
                    const channel = supabase.channel("workspace:".concat(workspaceId, ":messages"), {
                        config: {
                            private: true,
                            broadcast: {
                                self: true,
                                ack: true
                            }
                        }
                    });
                    channel.on('broadcast', {
                        event: 'INSERT'
                    }, {
                        "useWorkspaceChat.useEffect.setupRealtime": ()=>{
                            if (!mounted) return;
                            // When broadcast is received, revalidate messages
                            mutateMessages();
                        }
                    }["useWorkspaceChat.useEffect.setupRealtime"]).on('broadcast', {
                        event: 'UPDATE'
                    }, {
                        "useWorkspaceChat.useEffect.setupRealtime": ()=>{
                            if (!mounted) return;
                            // Revalidate on update
                            mutateMessages();
                        }
                    }["useWorkspaceChat.useEffect.setupRealtime"]).on('broadcast', {
                        event: 'DELETE'
                    }, {
                        "useWorkspaceChat.useEffect.setupRealtime": (param)=>{
                            let { payload } = param;
                            if (!mounted) return;
                            const deleted = payload.old;
                            if (deleted && deleted.id) {
                                setLocalMessages({
                                    "useWorkspaceChat.useEffect.setupRealtime": (prev)=>prev.filter({
                                            "useWorkspaceChat.useEffect.setupRealtime": (msg)=>msg.id !== deleted.id
                                        }["useWorkspaceChat.useEffect.setupRealtime"])
                                }["useWorkspaceChat.useEffect.setupRealtime"]);
                            }
                        }
                    }["useWorkspaceChat.useEffect.setupRealtime"]).subscribe({
                        "useWorkspaceChat.useEffect.setupRealtime": (status, err)=>{
                            if (!mounted) return;
                            console.log('Realtime status:', status, err ? {
                                err
                            } : '');
                            if (status === 'SUBSCRIBED') {
                                setIsConnected(true);
                                retryCountRef.current = 0;
                            } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
                                setIsConnected(false);
                                // Retry connection with exponential backoff
                                const maxRetries = 5;
                                if (retryCountRef.current < maxRetries) {
                                    retryCountRef.current += 1;
                                    const delay = Math.min(1000 * Math.pow(2, retryCountRef.current), 30000);
                                    reconnectTimeoutRef.current = setTimeout({
                                        "useWorkspaceChat.useEffect.setupRealtime": ()=>{
                                            if (mounted) {
                                                console.log("Retrying Realtime connection (attempt ".concat(retryCountRef.current, ")..."));
                                                setupRealtime();
                                            }
                                        }
                                    }["useWorkspaceChat.useEffect.setupRealtime"], delay);
                                } else {
                                    console.error('Max retries reached for Realtime connection.');
                                }
                            }
                        }
                    }["useWorkspaceChat.useEffect.setupRealtime"]);
                    channelRef.current = channel;
                } catch (err) {
                    if (!mounted) return;
                    console.error('Error setting up Realtime:', err);
                    setIsConnected(false);
                    // Retry after delay
                    if (retryCountRef.current < 5) {
                        retryCountRef.current += 1;
                        const delay = Math.min(1000 * Math.pow(2, retryCountRef.current), 30000);
                        reconnectTimeoutRef.current = setTimeout({
                            "useWorkspaceChat.useEffect.setupRealtime": ()=>{
                                if (mounted) {
                                    setupRealtime();
                                }
                            }
                        }["useWorkspaceChat.useEffect.setupRealtime"], delay);
                    }
                }
            }
            // Wait a bit for auth to be ready
            const initTimeout = setTimeout({
                "useWorkspaceChat.useEffect.initTimeout": ()=>{
                    setupRealtime();
                }
            }["useWorkspaceChat.useEffect.initTimeout"], 500);
            return ({
                "useWorkspaceChat.useEffect": ()=>{
                    mounted = false;
                    clearTimeout(initTimeout);
                    if (reconnectTimeoutRef.current) {
                        clearTimeout(reconnectTimeoutRef.current);
                    }
                    if (channelRef.current) {
                        supabase.removeChannel(channelRef.current);
                    }
                }
            })["useWorkspaceChat.useEffect"];
        }
    }["useWorkspaceChat.useEffect"], [
        workspaceId,
        supabase,
        mutateMessages
    ]);
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkspaceChat.useCallback[sendMessage]": async (text, replyToId, workspaceFileIds, mentionedMemberIds, mentionedNoteIds)=>{
            if (!(workspaceMember === null || workspaceMember === void 0 ? void 0 : workspaceMember.id)) return;
            // Allow sending if there's text or files
            if (!text.trim() && (!workspaceFileIds || workspaceFileIds.length === 0)) return;
            setSendError(null);
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceMessagesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendWorkspaceMessage"])(workspaceId, workspaceMember.id, text, replyToId, workspaceFileIds, mentionedMemberIds, mentionedNoteIds);
                // Revalidate messages to get the new one
                mutateMessages();
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
                setSendError(errorMessage);
                console.error('Error sending message:', err);
                throw err;
            }
        }
    }["useWorkspaceChat.useCallback[sendMessage]"], [
        workspaceId,
        workspaceMember,
        mutateMessages
    ]);
    // Load more messages (for infinite scroll)
    const loadMoreMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkspaceChat.useCallback[loadMoreMessages]": async ()=>{
            if (!hasMoreMessages || isLoadingMore || !oldestMessageTimestampRef.current) {
                return;
            }
            setIsLoadingMore(true);
            setSendError(null);
            try {
                const olderMessages = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceMessagesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkspaceMessages"])(workspaceId, 50, oldestMessageTimestampRef.current);
                if (olderMessages.length === 0) {
                    setHasMoreMessages(false);
                    setIsLoadingMore(false);
                    return;
                }
                // Reverse to show oldest first
                const reversedOlderMessages = [
                    ...olderMessages
                ].reverse();
                setLocalMessages({
                    "useWorkspaceChat.useCallback[loadMoreMessages]": (prev)=>{
                        // Prepend older messages to the beginning
                        const allMessages = [
                            ...reversedOlderMessages,
                            ...prev
                        ];
                        return decorateMessages(allMessages, workspaceMemberRef.current);
                    }
                }["useWorkspaceChat.useCallback[loadMoreMessages]"]);
                // Update oldest message timestamp
                if (reversedOlderMessages.length > 0) {
                    var _reversedOlderMessages_;
                    oldestMessageTimestampRef.current = ((_reversedOlderMessages_ = reversedOlderMessages[0]) === null || _reversedOlderMessages_ === void 0 ? void 0 : _reversedOlderMessages_.created_at) || null;
                }
                // Check if there are more messages to load
                setHasMoreMessages(olderMessages.length === 50);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load older messages';
                setSendError(errorMessage);
                console.error('Error loading older messages:', err);
            } finally{
                setIsLoadingMore(false);
            }
        }
    }["useWorkspaceChat.useCallback[loadMoreMessages]"], [
        workspaceId,
        hasMoreMessages,
        isLoadingMore,
        decorateMessages
    ]);
    // Mark messages as read when they appear
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWorkspaceChat.useEffect": ()=>{
            if (!(workspaceMember === null || workspaceMember === void 0 ? void 0 : workspaceMember.id)) return;
            if (localMessages.length === 0) return;
            if (markInFlightRef.current) return;
            var _workspaceMember_last_read_message_id, _ref;
            const lastRead = (_ref = (_workspaceMember_last_read_message_id = workspaceMember.last_read_message_id) !== null && _workspaceMember_last_read_message_id !== void 0 ? _workspaceMember_last_read_message_id : lastMarkedMessageIdRef.current) !== null && _ref !== void 0 ? _ref : 0;
            const unreadMessages = localMessages.filter({
                "useWorkspaceChat.useEffect.unreadMessages": (message)=>{
                    if (message.workspace_member_id === workspaceMember.id) {
                        return false;
                    }
                    return !message.is_read_by_current_user && message.id > lastRead;
                }
            }["useWorkspaceChat.useEffect.unreadMessages"]);
            if (unreadMessages.length === 0) return;
            const messageIds = Array.from(new Set(unreadMessages.map({
                "useWorkspaceChat.useEffect.messageIds": (message)=>message.id
            }["useWorkspaceChat.useEffect.messageIds"])));
            markInFlightRef.current = true;
            let cancelled = false;
            ({
                "useWorkspaceChat.useEffect": async ()=>{
                    try {
                        var _workspaceMember_last_read_message_id;
                        const updatedLastRead = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceMessagesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markWorkspaceMessagesAsRead"])(workspaceId, workspaceMember.id, messageIds, (_workspaceMember_last_read_message_id = workspaceMember.last_read_message_id) !== null && _workspaceMember_last_read_message_id !== void 0 ? _workspaceMember_last_read_message_id : lastMarkedMessageIdRef.current);
                        if (cancelled) return;
                        var _ref;
                        const newLastReadValue = (_ref = updatedLastRead !== null && updatedLastRead !== void 0 ? updatedLastRead : workspaceMember.last_read_message_id) !== null && _ref !== void 0 ? _ref : null;
                        lastMarkedMessageIdRef.current = newLastReadValue !== null && newLastReadValue !== void 0 ? newLastReadValue : lastMarkedMessageIdRef.current;
                        // Update workspace member in SWR cache
                        mutateMember({
                            "useWorkspaceChat.useEffect": (current)=>{
                                if (!current) return current !== null && current !== void 0 ? current : null;
                                var _ref;
                                return {
                                    ...current,
                                    last_read_message_id: (_ref = newLastReadValue !== null && newLastReadValue !== void 0 ? newLastReadValue : current.last_read_message_id) !== null && _ref !== void 0 ? _ref : null
                                };
                            }
                        }["useWorkspaceChat.useEffect"], false);
                        // Update local messages state
                        const messageIdSet = new Set(messageIds);
                        setLocalMessages({
                            "useWorkspaceChat.useEffect": (prev)=>prev.map({
                                    "useWorkspaceChat.useEffect": (message)=>{
                                        if (!messageIdSet.has(message.id)) {
                                            return message;
                                        }
                                        var _message_reads;
                                        const existingReads = (_message_reads = message.reads) !== null && _message_reads !== void 0 ? _message_reads : [];
                                        const hasExistingRead = existingReads.some({
                                            "useWorkspaceChat.useEffect.hasExistingRead": (read)=>read.workspace_member_id === workspaceMember.id
                                        }["useWorkspaceChat.useEffect.hasExistingRead"]);
                                        var _message_read_count;
                                        const baseReadCount = (_message_read_count = message.read_count) !== null && _message_read_count !== void 0 ? _message_read_count : existingReads.length;
                                        const updatedReads = hasExistingRead ? existingReads : [
                                            ...existingReads,
                                            {
                                                workspace_message_id: message.id,
                                                workspace_member_id: workspaceMember.id,
                                                read_at: new Date().toISOString(),
                                                created_at: new Date().toISOString(),
                                                workspace_member: undefined
                                            }
                                        ];
                                        return {
                                            ...message,
                                            reads: updatedReads,
                                            read_count: hasExistingRead ? baseReadCount : baseReadCount + 1,
                                            is_read_by_current_user: true
                                        };
                                    }
                                }["useWorkspaceChat.useEffect"])
                        }["useWorkspaceChat.useEffect"]);
                    } catch (err) {
                        console.error('Error marking messages as read:', err);
                    } finally{
                        if (!cancelled) {
                            markInFlightRef.current = false;
                        }
                    }
                }
            })["useWorkspaceChat.useEffect"]();
            return ({
                "useWorkspaceChat.useEffect": ()=>{
                    cancelled = true;
                    markInFlightRef.current = false;
                }
            })["useWorkspaceChat.useEffect"];
        }
    }["useWorkspaceChat.useEffect"], [
        localMessages,
        workspaceId,
        workspaceMember,
        mutateMember
    ]);
    // Combine errors
    const error = memberError || messagesError ? (memberError === null || memberError === void 0 ? void 0 : memberError.message) || (messagesError === null || messagesError === void 0 ? void 0 : messagesError.message) || 'Failed to load chat data' : sendError;
    return {
        messages: localMessages,
        sendMessage,
        isLoading,
        isLoadingMore,
        error,
        isConnected,
        workspaceMember,
        loadMoreMessages,
        hasMoreMessages
    };
}
_s(useWorkspaceChat, "omHk8r4o5/97hcRQLQUYAVldv9o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/VoiceInputButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VoiceInputButton",
    ()=>VoiceInputButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const VoiceInputButton = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s((param, ref)=>{
    let { onTranscriptChange, currentText = '', disabled = false, className = '' } = param;
    _s();
    const [isRecording, setIsRecording] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const finalTranscriptRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    const lastInterimTranscriptRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    const processedResultIndexRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // 現在のテキストが変更されたら、finalTranscriptRefを更新
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceInputButton.useEffect": ()=>{
            if (!isRecording) {
                finalTranscriptRef.current = currentText;
            }
        }
    }["VoiceInputButton.useEffect"], [
        currentText,
        isRecording
    ]);
    // クリーンアップ
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceInputButton.useEffect": ()=>{
            return ({
                "VoiceInputButton.useEffect": ()=>{
                    if (recognitionRef.current) {
                        recognitionRef.current.stop();
                    }
                }
            })["VoiceInputButton.useEffect"];
        }
    }["VoiceInputButton.useEffect"], []);
    // Expose restartRecording method to parent
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "VoiceInputButton.useImperativeHandle": ()=>({
                restartRecording: ({
                    "VoiceInputButton.useImperativeHandle": ()=>{
                        if (isRecording) {
                            // Stop current recording
                            if (recognitionRef.current) {
                                recognitionRef.current.stop();
                                recognitionRef.current = null;
                            }
                            setIsRecording(false);
                            finalTranscriptRef.current = '';
                            onTranscriptChange('');
                            setTimeout({
                                "VoiceInputButton.useImperativeHandle": ()=>{
                                    startRecording('');
                                }
                            }["VoiceInputButton.useImperativeHandle"], 100);
                        }
                    }
                })["VoiceInputButton.useImperativeHandle"]
            })
    }["VoiceInputButton.useImperativeHandle"]);
    const startRecording = (overrideText)=>{
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error('音声認識APIがサポートされていません');
            return;
        }
        // 録音開始時に現在のテキストを保存（overrideTextがあればそれを使用）
        finalTranscriptRef.current = overrideText !== undefined ? overrideText : currentText;
        // 未確定文字列をリセット
        lastInterimTranscriptRef.current = '';
        // 処理済みの結果インデックスをリセット
        processedResultIndexRef.current = 0;
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'ja-JP';
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = (event)=>{
            // ベースとなる確定済み文字列
            let finalTranscript = finalTranscriptRef.current;
            // 処理済みの確定済み結果以降から、新しい確定済み結果を順番に追加
            // event.resultsには全ての結果が含まれるため、処理済み以降から追加する
            const startIndex = processedResultIndexRef.current;
            for(let i = startIndex; i < event.results.length; ++i){
                const result = event.results[i];
                if (result.isFinal) {
                    const transcript = result[0].transcript;
                    finalTranscript += transcript;
                    finalTranscriptRef.current = finalTranscript;
                    // 処理済みインデックスを更新（この結果まで処理した）
                    processedResultIndexRef.current = i + 1;
                }
            }
            // 最新の未確定結果を取得（処理済みの確定結果以降から探す）
            // これにより、確定済みに含まれていない未確定結果のみを取得できる
            let currentInterimTranscript = '';
            const lastProcessedIndex = processedResultIndexRef.current;
            for(let i = event.results.length - 1; i >= lastProcessedIndex; --i){
                const result = event.results[i];
                if (!result.isFinal) {
                    currentInterimTranscript = result[0].transcript;
                    break; // 最新の未確定結果を取得
                }
            }
            // 未確定文字列を更新
            lastInterimTranscriptRef.current = currentInterimTranscript;
            // 確定済み文字列 + 未確定文字列を表示
            // 未確定が確定されたら、次のイベントで確定済みに置き換わる（重複なし）
            const fullText = finalTranscript + currentInterimTranscript;
            onTranscriptChange(fullText);
        };
        recognition.onerror = (event)=>{
            console.error('音声認識エラー:', event.error);
            setIsRecording(false);
        };
        recognition.onend = ()=>{
            console.log('音声認識が停止しました');
            // ユーザーが手動で停止していない場合は自動で再起動
            if (isRecording && recognitionRef.current) {
                try {
                    recognitionRef.current.start();
                    console.log('音声認識を自動再起動します');
                } catch (error) {
                    console.error('自動再起動エラー:', error);
                    setIsRecording(false);
                    recognitionRef.current = null;
                }
            }
        };
        try {
            recognition.start();
            setIsRecording(true);
            console.log('音声認識開始');
        } catch (error) {
            console.error('音声認識の開始エラー:', error);
        }
    };
    const handleVoiceInput = (event)=>{
        event.preventDefault();
        event.stopPropagation();
        if (!isRecording) {
            startRecording();
        } else {
            // 0.5秒間は音声認識を続けてから停止
            setTimeout(()=>{
                if (recognitionRef.current) {
                    try {
                        recognitionRef.current.stop();
                        console.log('音声認識停止');
                    } catch (error) {
                        console.error('音声認識停止エラー:', error);
                    }
                    recognitionRef.current = null;
                }
                setIsRecording(false);
            }, 800);
        }
    };
    const Icon = isRecording ? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"] : __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleVoiceInput,
        disabled: disabled,
        type: "button",
        title: isRecording ? '音声認識を停止' : '音声認識を開始',
        className: "".concat(className, " relative flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
            className: "w-5 h-5 relative z-10 transition-colors duration-300 ".concat(isRecording ? 'text-white' : 'text-white/40'),
            style: isRecording ? {
                animationDuration: '1.5s'
            } : undefined
        }, void 0, false, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/VoiceInputButton.tsx",
            lineNumber: 237,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/VoiceInputButton.tsx",
        lineNumber: 230,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "jgOhicZg24QPEYlzGrufL4b3EQ8=")), "jgOhicZg24QPEYlzGrufL4b3EQ8=");
_c1 = VoiceInputButton;
VoiceInputButton.displayName = 'VoiceInputButton';
var _c, _c1;
__turbopack_context__.k.register(_c, "VoiceInputButton$forwardRef");
__turbopack_context__.k.register(_c1, "VoiceInputButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/MentionExtension.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomMention",
    ()=>CustomMention
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+core@3.10.5_@tiptap+pm@3.10.5/node_modules/@tiptap/core/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$mention$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5_$40$ti_hh6eqg7ddb6pjeqz24olwqhvby$2f$node_modules$2f40$tiptap$2f$extension$2d$mention$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+extension-mention@3.10.5_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm@3.10.5_@ti_hh6eqg7ddb6pjeqz24olwqhvby/node_modules/@tiptap/extension-mention/dist/index.js [app-client] (ecmascript)");
;
;
const CustomMention = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$mention$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5_$40$ti_hh6eqg7ddb6pjeqz24olwqhvby$2f$node_modules$2f40$tiptap$2f$extension$2d$mention$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend({
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
    renderHTML (param) {
        let { node, HTMLAttributes } = param;
        return [
            'span',
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeAttributes"])({
                'data-type': 'mention'
            }, this.options.HTMLAttributes, HTMLAttributes),
            "@".concat(HTMLAttributes['data-label'] || '')
        ];
    },
    renderText (param) {
        let { node } = param;
        return "@".concat(node.attrs.label);
    },
    // Markdown support using Tiptap utility
    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInlineMarkdownSpec"])({
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
            Backspace: ()=>this.editor.commands.command((param)=>{
                    let { tr, state } = param;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/NoteMentionExtension.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoteMention",
    ()=>NoteMention
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+core@3.10.5_@tiptap+pm@3.10.5/node_modules/@tiptap/core/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$mention$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5_$40$ti_hh6eqg7ddb6pjeqz24olwqhvby$2f$node_modules$2f40$tiptap$2f$extension$2d$mention$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+extension-mention@3.10.5_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm@3.10.5_@ti_hh6eqg7ddb6pjeqz24olwqhvby/node_modules/@tiptap/extension-mention/dist/index.js [app-client] (ecmascript)");
;
;
const NoteMention = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$mention$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5_$40$ti_hh6eqg7ddb6pjeqz24olwqhvby$2f$node_modules$2f40$tiptap$2f$extension$2d$mention$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend({
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
    renderHTML (param) {
        let { node, HTMLAttributes } = param;
        return [
            'span',
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeAttributes"])({
                'data-type': 'noteMention'
            }, this.options.HTMLAttributes, HTMLAttributes),
            "#".concat(HTMLAttributes['data-label'] || '')
        ];
    },
    renderText (param) {
        let { node } = param;
        return "#".concat(node.attrs.label);
    },
    // Markdown support using Tiptap utility
    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInlineMarkdownSpec"])({
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
            Backspace: ()=>this.editor.commands.command((param)=>{
                    let { tr, state } = param;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MentionList",
    ()=>MentionList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const MentionList = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s((props, ref)=>{
    _s();
    const [selectedIndex, setSelectedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const selectItem = (index)=>{
        const item = props.items[index];
        if (item) {
            var _item_user_profile;
            props.command({
                id: "member-".concat(item.id),
                label: ((_item_user_profile = item.user_profile) === null || _item_user_profile === void 0 ? void 0 : _item_user_profile.name) || 'Unknown',
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MentionList.useEffect": ()=>setSelectedIndex(0)
    }["MentionList.useEffect"], [
        props.items
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "MentionList.useImperativeHandle": ()=>({
                onKeyDown: ({
                    "MentionList.useImperativeHandle": (param)=>{
                        let { event } = param;
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
                })["MentionList.useImperativeHandle"]
            })
    }["MentionList.useImperativeHandle"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg overflow-hidden max-h-[300px] overflow-y-auto",
        children: props.items.length ? props.items.map((item, index)=>{
            var _item_user_profile, _item_user_profile1;
            var _item_user_profile_name;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors ".concat(index === selectedIndex ? 'bg-white/20' : 'hover:bg-white/10'),
                onClick: ()=>selectItem(index),
                type: "button",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                        className: "h-8 w-8 border border-white/20 bg-white/10",
                        children: ((_item_user_profile = item.user_profile) === null || _item_user_profile === void 0 ? void 0 : _item_user_profile.avatar_url) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                            src: item.user_profile.avatar_url,
                            alt: (_item_user_profile_name = item.user_profile.name) !== null && _item_user_profile_name !== void 0 ? _item_user_profile_name : 'Member'
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx",
                            lineNumber: 93,
                            columnNumber: 19
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white font-medium",
                                children: ((_item_user_profile1 = item.user_profile) === null || _item_user_profile1 === void 0 ? void 0 : _item_user_profile1.name) || 'Unknown'
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx",
                                lineNumber: 104,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            }, ("TURBOPACK compile-time value", void 0));
        }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}, "3wj81Hb4M4taXoRyUvRcWiDqh5k=")), "3wj81Hb4M4taXoRyUvRcWiDqh5k=");
_c1 = MentionList;
MentionList.displayName = 'MentionList';
var _c, _c1;
__turbopack_context__.k.register(_c, "MentionList$forwardRef");
__turbopack_context__.k.register(_c1, "MentionList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/mentionSuggestion.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createMentionSuggestion",
    ()=>createMentionSuggestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+react@3.10.5_@floating-ui+dom@1.7.4_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm_jrnslszcjrz3i5z3oeqxfbwply/node_modules/@tiptap/react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$tippy$2e$js$40$6$2e$3$2e$7$2f$node_modules$2f$tippy$2e$js$2f$dist$2f$tippy$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/tippy.js@6.3.7/node_modules/tippy.js/dist/tippy.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$MentionList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/MentionList.tsx [app-client] (ecmascript)");
;
;
;
const createMentionSuggestion = (getMembersRef)=>({
        items: (param)=>{
            let { query } = param;
            const members = getMembersRef();
            return members.filter((member)=>{
                var _member_user_profile_name, _member_user_profile;
                const name = ((_member_user_profile = member.user_profile) === null || _member_user_profile === void 0 ? void 0 : (_member_user_profile_name = _member_user_profile.name) === null || _member_user_profile_name === void 0 ? void 0 : _member_user_profile_name.toLowerCase()) || '';
                return name.includes(query.toLowerCase());
            }).slice(0, 5);
        },
        render: ()=>{
            let component;
            let popup;
            return {
                onStart: (props)=>{
                    component = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactRenderer"](__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$MentionList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MentionList"], {
                        props,
                        editor: props.editor
                    });
                    if (!props.clientRect) {
                        return;
                    }
                    popup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$tippy$2e$js$40$6$2e$3$2e$7$2f$node_modules$2f$tippy$2e$js$2f$dist$2f$tippy$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('body', {
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
                    var _popup_;
                    component === null || component === void 0 ? void 0 : component.updateProps(props);
                    if (!props.clientRect) {
                        return;
                    }
                    popup === null || popup === void 0 ? void 0 : (_popup_ = popup[0]) === null || _popup_ === void 0 ? void 0 : _popup_.setProps({
                        getReferenceClientRect: props.clientRect
                    });
                },
                onKeyDown (props) {
                    var _component_ref;
                    if (props.event.key === 'Escape') {
                        var _popup_;
                        popup === null || popup === void 0 ? void 0 : (_popup_ = popup[0]) === null || _popup_ === void 0 ? void 0 : _popup_.hide();
                        return true;
                    }
                    var _component_ref_onKeyDown;
                    return (_component_ref_onKeyDown = component === null || component === void 0 ? void 0 : (_component_ref = component.ref) === null || _component_ref === void 0 ? void 0 : _component_ref.onKeyDown(props)) !== null && _component_ref_onKeyDown !== void 0 ? _component_ref_onKeyDown : false;
                },
                onExit () {
                    var _popup_;
                    popup === null || popup === void 0 ? void 0 : (_popup_ = popup[0]) === null || _popup_ === void 0 ? void 0 : _popup_.destroy();
                    component === null || component === void 0 ? void 0 : component.destroy();
                }
            };
        }
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/NoteList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoteList",
    ()=>NoteList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const NoteList = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s((props, ref)=>{
    _s();
    const [selectedIndex, setSelectedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const selectItem = (index)=>{
        const item = props.items[index];
        if (item) {
            props.command({
                id: "note-".concat(item.id),
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NoteList.useEffect": ()=>setSelectedIndex(0)
    }["NoteList.useEffect"], [
        props.items
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "NoteList.useImperativeHandle": ()=>({
                onKeyDown: ({
                    "NoteList.useImperativeHandle": (param)=>{
                        let { event } = param;
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
                })["NoteList.useImperativeHandle"]
            })
    }["NoteList.useImperativeHandle"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg overflow-hidden max-h-[300px] overflow-y-auto",
        children: props.items.length ? props.items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors ".concat(index === selectedIndex ? 'bg-white/20' : 'hover:bg-white/10'),
                onClick: ()=>selectItem(index),
                type: "button",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center w-8 h-8 rounded bg-green-500/20 border border-green-500/30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white font-medium truncate",
                                children: item.title || 'Untitled'
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/NoteList.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            item.content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}, "3wj81Hb4M4taXoRyUvRcWiDqh5k=")), "3wj81Hb4M4taXoRyUvRcWiDqh5k=");
_c1 = NoteList;
NoteList.displayName = 'NoteList';
var _c, _c1;
__turbopack_context__.k.register(_c, "NoteList$forwardRef");
__turbopack_context__.k.register(_c1, "NoteList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/noteMentionSuggestion.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createNoteMentionSuggestion",
    ()=>createNoteMentionSuggestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+react@3.10.5_@floating-ui+dom@1.7.4_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm_jrnslszcjrz3i5z3oeqxfbwply/node_modules/@tiptap/react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$tippy$2e$js$40$6$2e$3$2e$7$2f$node_modules$2f$tippy$2e$js$2f$dist$2f$tippy$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/tippy.js@6.3.7/node_modules/tippy.js/dist/tippy.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$NoteList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/NoteList.tsx [app-client] (ecmascript)");
;
;
;
const createNoteMentionSuggestion = (getNotesRef)=>({
        char: '#',
        items: (param)=>{
            let { query } = param;
            const notes = getNotesRef();
            return notes.filter((note)=>{
                var _note_title, _note_content;
                const title = ((_note_title = note.title) === null || _note_title === void 0 ? void 0 : _note_title.toLowerCase()) || '';
                const content = ((_note_content = note.content) === null || _note_content === void 0 ? void 0 : _note_content.toLowerCase()) || '';
                const queryLower = query.toLowerCase();
                return title.includes(queryLower) || content.includes(queryLower);
            }).slice(0, 5);
        },
        render: ()=>{
            let component;
            let popup;
            return {
                onStart: (props)=>{
                    component = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactRenderer"](__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$NoteList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoteList"], {
                        props,
                        editor: props.editor
                    });
                    if (!props.clientRect) {
                        return;
                    }
                    popup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$tippy$2e$js$40$6$2e$3$2e$7$2f$node_modules$2f$tippy$2e$js$2f$dist$2f$tippy$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('body', {
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
                    var _popup_;
                    component === null || component === void 0 ? void 0 : component.updateProps(props);
                    if (!props.clientRect) {
                        return;
                    }
                    popup === null || popup === void 0 ? void 0 : (_popup_ = popup[0]) === null || _popup_ === void 0 ? void 0 : _popup_.setProps({
                        getReferenceClientRect: props.clientRect
                    });
                },
                onKeyDown (props) {
                    var _component_ref;
                    if (props.event.key === 'Escape') {
                        var _popup_;
                        popup === null || popup === void 0 ? void 0 : (_popup_ = popup[0]) === null || _popup_ === void 0 ? void 0 : _popup_.hide();
                        return true;
                    }
                    var _component_ref_onKeyDown;
                    return (_component_ref_onKeyDown = component === null || component === void 0 ? void 0 : (_component_ref = component.ref) === null || _component_ref === void 0 ? void 0 : _component_ref.onKeyDown(props)) !== null && _component_ref_onKeyDown !== void 0 ? _component_ref_onKeyDown : false;
                },
                onExit () {
                    var _popup_;
                    popup === null || popup === void 0 ? void 0 : (_popup_ = popup[0]) === null || _popup_ === void 0 ? void 0 : _popup_.destroy();
                    component === null || component === void 0 ? void 0 : component.destroy();
                }
            };
        }
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/extensions/useTiptapExtensions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTiptapExtensions",
    ()=>useTiptapExtensions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$starter$2d$kit$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+starter-kit@3.10.5/node_modules/@tiptap/starter-kit/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$markdown$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$markdown$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+markdown@3.10.5_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm@3.10.5/node_modules/@tiptap/markdown/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$placeholder$40$3$2e$10$2e$5_$40$tiptap$2b$extensions$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5_$2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+extension-placeholder@3.10.5_@tiptap+extensions@3.10.5_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm@3.10.5_/node_modules/@tiptap/extension-placeholder/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$MentionExtension$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/MentionExtension.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$NoteMentionExtension$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/NoteMentionExtension.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$mentionSuggestion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/mentionSuggestion.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$noteMentionSuggestion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/noteMentionSuggestion.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
function useTiptapExtensions(param) {
    let { mode, placeholder = 'Start typing...', enableMemberMentions = false, enableNoteMentions = false, workspaceMembers = [], workspaceNotes = [] } = param;
    _s();
    // Use refs to avoid recreating suggestion components on every render
    const membersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const notesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Update refs when data changes
    membersRef.current = workspaceMembers;
    notesRef.current = workspaceNotes;
    // Memoize extensions - recreate when config or data changes
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useTiptapExtensions.useMemo": ()=>{
            const extensions = [];
            // Base extensions for all modes
            if (mode === 'readonly' || mode === 'minimal') {
                // Minimal set for display only
                extensions.push(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$starter$2d$kit$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].configure({
                    heading: {
                        levels: [
                            1,
                            2,
                            3
                        ]
                    },
                    code: false
                }), __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$markdown$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$markdown$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Markdown"]);
            } else if (mode === 'chat') {
                // Chat mode: basic formatting only (bold, italic, mentions)
                extensions.push(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$starter$2d$kit$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].configure({
                    heading: false,
                    blockquote: false,
                    codeBlock: false,
                    horizontalRule: false,
                    code: false
                }), __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$placeholder$40$3$2e$10$2e$5_$40$tiptap$2b$extensions$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5_$2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].configure({
                    placeholder
                }), __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$markdown$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$markdown$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Markdown"]);
            } else if (mode === 'full') {
                // Full editor mode (for notes)
                extensions.push(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$starter$2d$kit$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].configure({
                    heading: {
                        levels: [
                            1,
                            2,
                            3
                        ]
                    },
                    code: false
                }), __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$placeholder$40$3$2e$10$2e$5_$40$tiptap$2b$extensions$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5_$2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].configure({
                    placeholder
                }), __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$markdown$40$3$2e$10$2e$5_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm$40$3$2e$10$2e$5$2f$node_modules$2f40$tiptap$2f$markdown$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Markdown"]);
            }
            // Add member mentions if enabled
            if (enableMemberMentions) {
                extensions.push(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$MentionExtension$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomMention"].configure({
                    HTMLAttributes: {
                        class: 'mention'
                    },
                    suggestion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$mentionSuggestion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMentionSuggestion"])({
                        "useTiptapExtensions.useMemo": ()=>membersRef.current
                    }["useTiptapExtensions.useMemo"])
                }));
            }
            // Add note mentions if enabled
            if (enableNoteMentions) {
                extensions.push(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$NoteMentionExtension$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoteMention"].configure({
                    HTMLAttributes: {
                        class: 'note-mention'
                    },
                    suggestion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$noteMentionSuggestion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNoteMentionSuggestion"])({
                        "useTiptapExtensions.useMemo": ()=>notesRef.current
                    }["useTiptapExtensions.useMemo"])
                }));
            }
            return extensions;
        }
    }["useTiptapExtensions.useMemo"], [
        mode,
        placeholder,
        enableMemberMentions,
        enableNoteMentions
    ]);
}
_s(useTiptapExtensions, "S5K8ShhO+NI291LhIPRbOhroz7U=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/extractMentions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractMemberMentions",
    ()=>extractMemberMentions,
    "extractNoteMentions",
    ()=>extractNoteMentions
]);
function extractMemberMentions(editor) {
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
}
function extractNoteMentions(editor) {
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
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/TiptapChatInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+react@3.10.5_@floating-ui+dom@1.7.4_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm_jrnslszcjrz3i5z3oeqxfbwply/node_modules/@tiptap/react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$VoiceInputButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/VoiceInputButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$UIContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/contexts/UIContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$extensions$2f$useTiptapExtensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/extensions/useTiptapExtensions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$extractMentions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/tiptap/extractMentions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const TiptapChatInput = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(function TiptapChatInput(param, ref) {
    let { onSend, onStop, isLoading = false, placeholder = 'メッセージを入力...', canStop = true, isUploading = false, hasAttachments = false, workspaceMembers = [], workspaceNotes = [] } = param;
    _s();
    const [isFocused, setIsFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEmpty, setIsEmpty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const { setInputActive } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$UIContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUI"])();
    const editorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Get extensions for chat mode with member mentions and note mentions
    const extensions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$extensions$2f$useTiptapExtensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapExtensions"])({
        mode: 'chat',
        placeholder,
        enableMemberMentions: workspaceMembers.length > 0,
        enableNoteMentions: workspaceNotes.length > 0,
        workspaceMembers,
        workspaceNotes
    });
    // Initialize TipTap editor
    // Pass extensions as dependency to recreate editor when they change
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"])({
        immediatelyRender: false,
        extensions,
        content: '',
        contentType: 'markdown',
        editorProps: {
            attributes: {
                class: 'w-full bg-transparent text-white px-5 py-3.5 pr-[140px] focus:outline-none resize-none overflow-y-auto chat-input-editor',
                style: 'max-height: 140px;'
            }
        },
        onUpdate: {
            "TiptapChatInput.TiptapChatInput.useEditor[editor]": (param)=>{
                let { editor } = param;
                const text = editor.getText();
                setIsEmpty(text.trim().length === 0);
            }
        }["TiptapChatInput.TiptapChatInput.useEditor[editor]"],
        onFocus: {
            "TiptapChatInput.TiptapChatInput.useEditor[editor]": ()=>setIsFocused(true)
        }["TiptapChatInput.TiptapChatInput.useEditor[editor]"],
        onBlur: {
            "TiptapChatInput.TiptapChatInput.useEditor[editor]": ()=>setIsFocused(false)
        }["TiptapChatInput.TiptapChatInput.useEditor[editor]"]
    }, [
        extensions
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "TiptapChatInput.TiptapChatInput.useImperativeHandle": ()=>({
                focus: ({
                    "TiptapChatInput.TiptapChatInput.useImperativeHandle": ()=>{
                        editor === null || editor === void 0 ? void 0 : editor.commands.focus();
                    }
                })["TiptapChatInput.TiptapChatInput.useImperativeHandle"],
                clearContent: ({
                    "TiptapChatInput.TiptapChatInput.useImperativeHandle": ()=>{
                        editor === null || editor === void 0 ? void 0 : editor.commands.clearContent();
                        setIsEmpty(true);
                    }
                })["TiptapChatInput.TiptapChatInput.useImperativeHandle"]
            })
    }["TiptapChatInput.TiptapChatInput.useImperativeHandle"]);
    // Update input active state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TiptapChatInput.TiptapChatInput.useEffect": ()=>{
            setInputActive(isFocused || !isEmpty);
        }
    }["TiptapChatInput.TiptapChatInput.useEffect"], [
        isFocused,
        isEmpty,
        setInputActive
    ]);
    const handleSend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TiptapChatInput.TiptapChatInput.useCallback[handleSend]": async ()=>{
            if (isLoading || isUploading || !editor) return;
            const text = editor.getMarkdown().trim();
            const hasText = text.length > 0;
            if (!hasText && !hasAttachments) return;
            // Extract mentions before clearing
            const mentionedMemberIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$extractMentions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractMemberMentions"])(editor);
            const mentionedNoteIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$tiptap$2f$extractMentions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractNoteMentions"])(editor);
            await onSend(text || '', mentionedMemberIds, mentionedNoteIds);
            // Clear editor content
            editor.commands.clearContent();
            setIsEmpty(true);
        }
    }["TiptapChatInput.TiptapChatInput.useCallback[handleSend]"], [
        isLoading,
        isUploading,
        editor,
        hasAttachments,
        onSend
    ]);
    const handleStop = ()=>{
        if (onStop && isLoading) {
            onStop();
        }
    };
    // Handle voice input
    const handleVoiceTranscript = (text)=>{
        if (editor) {
            editor.commands.setContent(text);
            editor.commands.focus();
        }
    };
    // Add keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TiptapChatInput.TiptapChatInput.useEffect": ()=>{
            var _editorRef_current;
            if (!editor) return;
            const handleKeyDown = {
                "TiptapChatInput.TiptapChatInput.useEffect.handleKeyDown": (event)=>{
                    const keyboardEvent = event;
                    // Shift+Enter: newline (default behavior)
                    if (keyboardEvent.key === 'Enter' && keyboardEvent.shiftKey) {
                        return;
                    }
                    // Enter (without Shift): send message
                    if (keyboardEvent.key === 'Enter' && !keyboardEvent.shiftKey) {
                        // Don't send during IME composition
                        if (keyboardEvent.isComposing) {
                            return;
                        }
                        keyboardEvent.preventDefault();
                        handleSend();
                    }
                }
            }["TiptapChatInput.TiptapChatInput.useEffect.handleKeyDown"];
            const editorElement = (_editorRef_current = editorRef.current) === null || _editorRef_current === void 0 ? void 0 : _editorRef_current.querySelector('.ProseMirror');
            editorElement === null || editorElement === void 0 ? void 0 : editorElement.addEventListener('keydown', handleKeyDown);
            return ({
                "TiptapChatInput.TiptapChatInput.useEffect": ()=>{
                    editorElement === null || editorElement === void 0 ? void 0 : editorElement.removeEventListener('keydown', handleKeyDown);
                }
            })["TiptapChatInput.TiptapChatInput.useEffect"];
        }
    }["TiptapChatInput.TiptapChatInput.useEffect"], [
        editor,
        handleSend
    ]);
    if (!editor) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 relative ml-[55px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: editorRef,
                className: "w-full bg-white/8 backdrop-blur-xl rounded-4xl border border-black focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EditorContent"], {
                    editor: editor
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/TiptapChatInput.tsx",
                    lineNumber: 189,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/TiptapChatInput.tsx",
                lineNumber: 185,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-[50px] bottom-1.5 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$VoiceInputButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VoiceInputButton"], {
                    onTranscriptChange: handleVoiceTranscript,
                    currentText: editor.getText(),
                    disabled: isLoading,
                    className: "w-11 h-11 rounded-full bg-transparent border-0 text-white hover:scale-102 transition-all duration-300"
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/TiptapChatInput.tsx",
                    lineNumber: 194,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/TiptapChatInput.tsx",
                lineNumber: 193,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: isLoading && canStop ? handleStop : handleSend,
                disabled: isLoading || isUploading || isEmpty && !hasAttachments,
                className: "absolute right-2.5 bottom-1.5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-black text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/15 hover:scale-102 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]",
                children: isLoading && canStop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                    className: "w-4 h-4 fill-current"
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/TiptapChatInput.tsx",
                    lineNumber: 209,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/TiptapChatInput.tsx",
                    lineNumber: 211,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/TiptapChatInput.tsx",
                lineNumber: 203,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/TiptapChatInput.tsx",
        lineNumber: 184,
        columnNumber: 7
    }, this);
}, "SXGxrxzMelGs5PVUHChWvjOxQfU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$UIContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUI"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$extensions$2f$useTiptapExtensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapExtensions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"]
    ];
})), "SXGxrxzMelGs5PVUHChWvjOxQfU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$UIContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUI"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$extensions$2f$useTiptapExtensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapExtensions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"]
    ];
});
_c1 = TiptapChatInput;
const __TURBOPACK__default__export__ = TiptapChatInput;
var _c, _c1;
__turbopack_context__.k.register(_c, "TiptapChatInput$forwardRef");
__turbopack_context__.k.register(_c1, "TiptapChatInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FileUploadMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/file.js [app-client] (ecmascript) <export default as File>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function FileUploadMenu(param) {
    let { onFilesSelected, maxFiles = 4, disabled = false } = param;
    _s();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imageInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleFileSelect = (e)=>{
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        // Limit to maxFiles
        const selectedFiles = files.slice(0, maxFiles);
        // Validate file count
        if (files.length > maxFiles) {
            alert("You can only upload up to ".concat(maxFiles, " files at once."));
        }
        onFilesSelected(selectedFiles);
        // Reset input
        e.target.value = '';
    };
    const triggerFileInput = (accept)=>{
        var _input_current;
        const input = accept === 'image' ? imageInputRef : fileInputRef;
        (_input_current = input.current) === null || _input_current === void 0 ? void 0 : _input_current.click();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FileUploadMenu.useEffect": ()=>{
            if (disabled) {
                setIsOpen(false);
            }
        }
    }["FileUploadMenu.useEffect"], [
        disabled
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex flex-col items-center gap-3",
        children: [
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-full mb-3 flex flex-col items-center gap-2 bg-white/8 backdrop-blur-xl text-white/80 rounded-full border border-black shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] px-3 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>triggerFileInput('image'),
                        disabled: disabled,
                        className: "relative group flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/80 transition-all duration-300 hover:bg-white/15 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
                        "aria-label": "Upload images",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                                children: "Upload images"
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>triggerFileInput('file'),
                        disabled: disabled,
                        className: "relative group flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/80 transition-all duration-300 hover:bg-white/15 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
                        "aria-label": "Upload files",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                                children: "Upload files"
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>{
                    if (disabled) return;
                    setIsOpen((prev)=>!prev);
                },
                disabled: disabled,
                className: "flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/8 backdrop-blur-xl text-white/80 border border-black transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/15 hover:text-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] disabled:opacity-50 disabled:cursor-not-allowed",
                "aria-label": "Add files",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "12",
                            y1: "5",
                            x2: "12",
                            y2: "19"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "5",
                            y1: "12",
                            x2: "19",
                            y2: "12"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: imageInputRef,
                type: "file",
                accept: "image/*",
                multiple: true,
                className: "hidden",
                onChange: handleFileSelect
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: fileInputRef,
                type: "file",
                multiple: true,
                className: "hidden",
                onChange: handleFileSelect
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(FileUploadMenu, "hzaf9v2ATocu0ySnBxw13IZFoUE=");
_c = FileUploadMenu;
var _c;
__turbopack_context__.k.register(_c, "FileUploadMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FileUploadPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/file.js [app-client] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
'use client';
;
;
;
function FileUploadPreview(props) {
    const { files, onRemove } = props;
    if (files.length === 0) return null;
    const formatFileSize = (bytes)=>{
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = [
            'Bytes',
            'KB',
            'MB',
            'GB'
        ];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };
    const isImage = (mimeType)=>{
        return mimeType.startsWith('image/');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-2 md:px-6 pb-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap gap-2",
            children: files.map((item)=>{
                const isImg = isImage(item.file.type);
                const hasError = !!item.error;
                const isUploading = item.uploading;
                const isComplete = !!item.uploaded;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative group bg-white/8 backdrop-blur-xl border border-black rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]",
                    children: [
                        !isUploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onRemove(item.id),
                            className: "absolute top-1 right-1 z-10 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100",
                            "aria-label": "Remove file",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-3 h-3 text-white"
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                lineNumber: 64,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                            lineNumber: 58,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 relative",
                            children: [
                                isImg && item.preview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: item.preview,
                                    alt: item.file.name,
                                    fill: true,
                                    sizes: "80px",
                                    className: "object-cover",
                                    unoptimized: true
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                    lineNumber: 71,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-full flex items-center justify-center bg-white/5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
                                        className: "w-8 h-8 text-white/40"
                                    }, void 0, false, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                        lineNumber: 81,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                    lineNumber: 80,
                                    columnNumber: 19
                                }, this),
                                isUploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-black/50 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-5 h-5 text-white animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                        lineNumber: 88,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                    lineNumber: 87,
                                    columnNumber: 19
                                }, this),
                                hasError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-red-900/50 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5 text-red-200"
                                    }, void 0, false, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                        lineNumber: 95,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                    lineNumber: 94,
                                    columnNumber: 19
                                }, this),
                                isComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-green-900/30 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full bg-green-500"
                                    }, void 0, false, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                        lineNumber: 102,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                    lineNumber: 101,
                                    columnNumber: 19
                                }, this),
                                isUploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-0 left-0 right-0 h-1 bg-black/30",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full bg-white/60 transition-all duration-300",
                                        style: {
                                            width: "".concat(item.progress, "%")
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                        lineNumber: 109,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                    lineNumber: 108,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                            lineNumber: 69,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-2 py-1 max-w-[80px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-white/80 truncate",
                                    title: item.file.name,
                                    children: item.file.name
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                    lineNumber: 119,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-white/40",
                                    children: formatFileSize(item.file.size)
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                    lineNumber: 125,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                            lineNumber: 118,
                            columnNumber: 15
                        }, this),
                        hasError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-2 pb-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-red-300 truncate",
                                title: item.error,
                                children: item.error
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                                lineNumber: 133,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                            lineNumber: 132,
                            columnNumber: 17
                        }, this)
                    ]
                }, item.id, true, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
                    lineNumber: 52,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c = FileUploadPreview;
var _c;
__turbopack_context__.k.register(_c, "FileUploadPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ReplyIndicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReplyIndicator",
    ()=>ReplyIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const ReplyIndicator = (param)=>{
    let { replyingTo, onCancelReply } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between bg-white/8 backdrop-blur-xl border border-black rounded-2xl px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-white/60 mb-1",
                        children: [
                            "Replying to ",
                            replyingTo.authorName || 'message'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ReplyIndicator.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-white/40 truncate",
                        children: [
                            replyingTo.text.slice(0, 100),
                            replyingTo.text.length > 100 ? '...' : ''
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ReplyIndicator.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ReplyIndicator.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            onCancelReply && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onCancelReply,
                className: "ml-3 text-white/60 hover:text-white/80 transition-colors text-sm",
                children: "✕"
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ReplyIndicator.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ReplyIndicator.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ReplyIndicator;
var _c;
__turbopack_context__.k.register(_c, "ReplyIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$TiptapChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/TiptapChatInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$FileUploadMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadMenu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$FileUploadPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/FileUploadPreview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceFilesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/workspaceFilesApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$ReplyIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ReplyIndicator.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const ChatInput = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(function ChatInput(param, ref) {
    let { onSend, onStop, isLoading = false, placeholder = 'Ask anything', canStop = true, replyingTo, onCancelReply, workspaceId, workspaceMembers = [], workspaceNotes = [] } = param;
    _s();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [uploadItems, setUploadItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isUploading, setIsUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const hasAttachments = uploadItems.length > 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "ChatInput.ChatInput.useImperativeHandle": ()=>({
                focus: ({
                    "ChatInput.ChatInput.useImperativeHandle": ()=>{
                        var _inputRef_current;
                        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
                    }
                })["ChatInput.ChatInput.useImperativeHandle"],
                clearContent: ({
                    "ChatInput.ChatInput.useImperativeHandle": ()=>{
                        var _inputRef_current;
                        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.clearContent();
                    }
                })["ChatInput.ChatInput.useImperativeHandle"]
            })
    }["ChatInput.ChatInput.useImperativeHandle"]);
    // Focus input when replying
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInput.ChatInput.useEffect": ()=>{
            if (replyingTo) {
                // Small delay to ensure DOM is ready
                setTimeout({
                    "ChatInput.ChatInput.useEffect": ()=>{
                        var _inputRef_current;
                        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
                    }
                }["ChatInput.ChatInput.useEffect"], 100);
            }
        }
    }["ChatInput.ChatInput.useEffect"], [
        replyingTo
    ]);
    const handleFilesSelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatInput.ChatInput.useCallback[handleFilesSelected]": (files)=>{
            if (!workspaceId) return;
            const newItems = files.map({
                "ChatInput.ChatInput.useCallback[handleFilesSelected].newItems": (file)=>{
                    const id = "".concat(Date.now(), "-").concat(Math.random());
                    const isImage = file.type.startsWith('image/');
                    let preview;
                    if (isImage) {
                        preview = URL.createObjectURL(file);
                    }
                    return {
                        file,
                        id,
                        preview,
                        uploading: false,
                        progress: 0
                    };
                }
            }["ChatInput.ChatInput.useCallback[handleFilesSelected].newItems"]);
            setUploadItems({
                "ChatInput.ChatInput.useCallback[handleFilesSelected]": (prev)=>{
                    const combined = [
                        ...prev,
                        ...newItems
                    ];
                    // Limit to 4 files
                    return combined.slice(0, 4);
                }
            }["ChatInput.ChatInput.useCallback[handleFilesSelected]"]);
        }
    }["ChatInput.ChatInput.useCallback[handleFilesSelected]"], [
        workspaceId
    ]);
    const handleRemoveFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatInput.ChatInput.useCallback[handleRemoveFile]": (id)=>{
            setUploadItems({
                "ChatInput.ChatInput.useCallback[handleRemoveFile]": (prev)=>{
                    const item = prev.find({
                        "ChatInput.ChatInput.useCallback[handleRemoveFile].item": (entry)=>entry.id === id
                    }["ChatInput.ChatInput.useCallback[handleRemoveFile].item"]);
                    if (item === null || item === void 0 ? void 0 : item.preview) {
                        URL.revokeObjectURL(item.preview);
                    }
                    return prev.filter({
                        "ChatInput.ChatInput.useCallback[handleRemoveFile]": (entry)=>entry.id !== id
                    }["ChatInput.ChatInput.useCallback[handleRemoveFile]"]);
                }
            }["ChatInput.ChatInput.useCallback[handleRemoveFile]"]);
        }
    }["ChatInput.ChatInput.useCallback[handleRemoveFile]"], []);
    const handleUploadComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatInput.ChatInput.useCallback[handleUploadComplete]": (id, uploadedFile)=>{
            setUploadItems({
                "ChatInput.ChatInput.useCallback[handleUploadComplete]": (prev)=>prev.map({
                        "ChatInput.ChatInput.useCallback[handleUploadComplete]": (item)=>item.id === id ? {
                                ...item,
                                uploaded: uploadedFile
                            } : item
                    }["ChatInput.ChatInput.useCallback[handleUploadComplete]"])
            }["ChatInput.ChatInput.useCallback[handleUploadComplete]"]);
        }
    }["ChatInput.ChatInput.useCallback[handleUploadComplete]"], []);
    const handleUploadError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatInput.ChatInput.useCallback[handleUploadError]": (id, error)=>{
            setUploadItems({
                "ChatInput.ChatInput.useCallback[handleUploadError]": (prev)=>prev.map({
                        "ChatInput.ChatInput.useCallback[handleUploadError]": (item)=>item.id === id ? {
                                ...item,
                                error,
                                uploading: false
                            } : item
                    }["ChatInput.ChatInput.useCallback[handleUploadError]"])
            }["ChatInput.ChatInput.useCallback[handleUploadError]"]);
        }
    }["ChatInput.ChatInput.useCallback[handleUploadError]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInput.ChatInput.useEffect": ()=>{
            return ({
                "ChatInput.ChatInput.useEffect": ()=>{
                    uploadItems.forEach({
                        "ChatInput.ChatInput.useEffect": (item)=>{
                            if (item.preview) {
                                URL.revokeObjectURL(item.preview);
                            }
                        }
                    }["ChatInput.ChatInput.useEffect"]);
                }
            })["ChatInput.ChatInput.useEffect"];
        }
    }["ChatInput.ChatInput.useEffect"], [
        uploadItems
    ]);
    const handleSend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatInput.ChatInput.useCallback[handleSend]": async (content, mentionedMemberIds, mentionedNoteIds)=>{
            if (isLoading || isUploading) return;
            // Allow sending if there's text or files
            const trimmed = content.trim();
            const hasText = trimmed.length > 0;
            if (!hasText && uploadItems.length === 0) return;
            let workspaceFileIds = [];
            if (uploadItems.length > 0 && workspaceId) {
                setIsUploading(true);
                try {
                    const uploadPromises = uploadItems.map({
                        "ChatInput.ChatInput.useCallback[handleSend].uploadPromises": async (item)=>{
                            if (item.uploaded) {
                                return item.uploaded.id;
                            }
                            const uploaded = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceFilesApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadWorkspaceFile"])(workspaceId, item.file);
                            return uploaded.id;
                        }
                    }["ChatInput.ChatInput.useCallback[handleSend].uploadPromises"]);
                    workspaceFileIds = await Promise.all(uploadPromises);
                } catch (error) {
                    console.error('Error uploading files:', error);
                    alert('Failed to upload files. Please try again.');
                    setIsUploading(false);
                    return;
                }
                setIsUploading(false);
            }
            onSend(trimmed || '', workspaceFileIds.length ? workspaceFileIds : undefined, mentionedMemberIds, mentionedNoteIds);
            setUploadItems({
                "ChatInput.ChatInput.useCallback[handleSend]": (prev)=>{
                    prev.forEach({
                        "ChatInput.ChatInput.useCallback[handleSend]": (item)=>{
                            if (item.preview) {
                                URL.revokeObjectURL(item.preview);
                            }
                        }
                    }["ChatInput.ChatInput.useCallback[handleSend]"]);
                    return [];
                }
            }["ChatInput.ChatInput.useCallback[handleSend]"]);
        }
    }["ChatInput.ChatInput.useCallback[handleSend]"], [
        isLoading,
        isUploading,
        onSend,
        uploadItems,
        workspaceId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gradient-to-br from-slate-950 via-black to-slate-950 relative z-10 rounded-t-3xl",
        children: [
            replyingTo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-full left-0 right-0 px-4 md:px-8 pb-2 pointer-events-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$ReplyIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReplyIndicator"], {
                    replyingTo: replyingTo,
                    onCancelReply: onCancelReply
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx",
                    lineNumber: 220,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx",
                lineNumber: 219,
                columnNumber: 9
            }, this),
            workspaceId && uploadItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$FileUploadPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                files: uploadItems,
                workspaceId: workspaceId,
                onRemove: handleRemoveFile,
                onUploadComplete: handleUploadComplete,
                onUploadError: handleUploadError
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx",
                lineNumber: 228,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-2 md:px-6 pt-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full md:max-w-4xl md:mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            workspaceId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-0 z-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$FileUploadMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    onFilesSelected: handleFilesSelected,
                                    maxFiles: 4,
                                    disabled: isLoading || isUploading || uploadItems.length >= 4
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx",
                                    lineNumber: 243,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx",
                                lineNumber: 242,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$TiptapChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                ref: inputRef,
                                placeholder: placeholder,
                                onSend: handleSend,
                                onStop: onStop,
                                isLoading: isLoading,
                                canStop: canStop,
                                isUploading: isUploading,
                                hasAttachments: hasAttachments,
                                workspaceMembers: workspaceMembers,
                                workspaceNotes: workspaceNotes
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx",
                        lineNumber: 239,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx",
                    lineNumber: 238,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx",
        lineNumber: 216,
        columnNumber: 5
    }, this);
}, "1g3GPBM8T9wTrtfm1v5ms0fsCnM=")), "1g3GPBM8T9wTrtfm1v5ms0fsCnM=");
_c1 = ChatInput;
const __TURBOPACK__default__export__ = ChatInput;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChatInput$forwardRef");
__turbopack_context__.k.register(_c1, "ChatInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/index.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx [app-client] (ecmascript) <export default as ChatInput>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx [app-client] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/glass-card/GlassButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
const GlassButton = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-white/10 backdrop-blur-xl border border-black rounded-full p-2 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/15 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] disabled:hover:shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/glass-card/GlassButton.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = GlassButton;
GlassButton.displayName = 'GlassButton';
const __TURBOPACK__default__export__ = GlassButton;
var _c, _c1;
__turbopack_context__.k.register(_c, "GlassButton$React.forwardRef");
__turbopack_context__.k.register(_c1, "GlassButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageContextMenu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MessageContextMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$reply$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Reply$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/reply.js [app-client] (ecmascript) <export default as Reply>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function MessageContextMenu(param) {
    let { messageText, onReply, onClose, position } = param;
    _s();
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessageContextMenu.useEffect": ()=>{
            const handleClickOutside = {
                "MessageContextMenu.useEffect.handleClickOutside": (event)=>{
                    if (menuRef.current && !menuRef.current.contains(event.target)) {
                        onClose();
                    }
                }
            }["MessageContextMenu.useEffect.handleClickOutside"];
            const handleEscape = {
                "MessageContextMenu.useEffect.handleEscape": (event)=>{
                    if (event.key === 'Escape') {
                        onClose();
                    }
                }
            }["MessageContextMenu.useEffect.handleEscape"];
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
            return ({
                "MessageContextMenu.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                    document.removeEventListener('touchstart', handleClickOutside);
                    document.removeEventListener('keydown', handleEscape);
                }
            })["MessageContextMenu.useEffect"];
        }
    }["MessageContextMenu.useEffect"], [
        onClose
    ]);
    const handleCopy = async ()=>{
        try {
            await navigator.clipboard.writeText(messageText);
            setCopied(true);
            setTimeout(()=>{
                setCopied(false);
                onClose();
            }, 1000);
        } catch (err) {
            console.error('Failed to copy text:', err);
            onClose();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: menuRef,
        className: "fixed z-50 bg-white/15 backdrop-blur-xl border border-black rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] overflow-hidden",
        style: {
            left: "".concat(position.x, "px"),
            top: "".concat(position.y, "px")
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>{
                    onReply();
                    onClose();
                },
                className: "w-full px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10 transition-colors text-sm border-b border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$reply$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Reply$3e$__["Reply"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageContextMenu.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Reply"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageContextMenu.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageContextMenu.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleCopy,
                className: "w-full px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10 transition-colors text-sm",
                children: copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageContextMenu.tsx",
                            lineNumber: 85,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Copied!"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageContextMenu.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageContextMenu.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Copy"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageContextMenu.tsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageContextMenu.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageContextMenu.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(MessageContextMenu, "7LPL/dvDlE6fy15UhVtSttWn6e8=");
_c = MessageContextMenu;
var _c;
__turbopack_context__.k.register(_c, "MessageContextMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MessageFiles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/file.js [app-client] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
const WORKSPACE_FILES_BUCKET = 'workspace-files';
const isImage = (mimeType)=>{
    return mimeType.startsWith('image/');
};
function MessageFiles(param) {
    let { files } = param;
    _s();
    const [selectedImage, setSelectedImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [imageUrls, setImageUrls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [loadingImages, setLoadingImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const loadedFilesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const loadingFilesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Ensure component is mounted before using portal (SSR safety)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessageFiles.useEffect": ()=>{
            setMounted(true);
        }
    }["MessageFiles.useEffect"], []);
    // Pre-load image URLs when component mounts or files change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessageFiles.useEffect": ()=>{
            const loadImageUrls = {
                "MessageFiles.useEffect.loadImageUrls": async ()=>{
                    const imageFiles = files.filter({
                        "MessageFiles.useEffect.loadImageUrls.imageFiles": (file)=>isImage(file.mime_type)
                    }["MessageFiles.useEffect.loadImageUrls.imageFiles"]);
                    for (const file of imageFiles){
                        // Skip if already loaded or loading
                        if (loadedFilesRef.current.has(file.id) || loadingFilesRef.current.has(file.id)) {
                            continue;
                        }
                        loadingFilesRef.current.add(file.id);
                        setLoadingImages({
                            "MessageFiles.useEffect.loadImageUrls": (prev)=>new Set(prev).add(file.id)
                        }["MessageFiles.useEffect.loadImageUrls"]);
                        try {
                            // Get signed URL for private bucket (valid for 1 hour)
                            const { data: signedUrlData, error: signedUrlError } = await supabase.storage.from(WORKSPACE_FILES_BUCKET).createSignedUrl(file.file_path, 3600);
                            if (!signedUrlError && (signedUrlData === null || signedUrlData === void 0 ? void 0 : signedUrlData.signedUrl)) {
                                loadedFilesRef.current.add(file.id);
                                setImageUrls({
                                    "MessageFiles.useEffect.loadImageUrls": (prev)=>new Map(prev).set(file.id, signedUrlData.signedUrl)
                                }["MessageFiles.useEffect.loadImageUrls"]);
                            }
                        } catch (error) {
                            console.error('Error loading image URL:', error);
                        } finally{
                            loadingFilesRef.current.delete(file.id);
                            setLoadingImages({
                                "MessageFiles.useEffect.loadImageUrls": (prev)=>{
                                    const next = new Set(prev);
                                    next.delete(file.id);
                                    return next;
                                }
                            }["MessageFiles.useEffect.loadImageUrls"]);
                        }
                    }
                }
            }["MessageFiles.useEffect.loadImageUrls"];
            loadImageUrls();
        }
    }["MessageFiles.useEffect"], [
        files
    ]);
    const formatFileSize = (bytes)=>{
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = [
            'Bytes',
            'KB',
            'MB',
            'GB'
        ];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };
    // Lock body scroll when image is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessageFiles.useEffect": ()=>{
            if (selectedImage) {
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                return ({
                    "MessageFiles.useEffect": ()=>{
                        // Unlock body scroll when modal closes
                        document.body.style.overflow = '';
                    }
                })["MessageFiles.useEffect"];
            }
        }
    }["MessageFiles.useEffect"], [
        selectedImage
    ]);
    const handleImageClick = async (file)=>{
        if (!imageUrls.has(file.id)) {
            try {
                // Get signed URL for private bucket (valid for 1 hour)
                const { data: signedUrlData, error: signedUrlError } = await supabase.storage.from(WORKSPACE_FILES_BUCKET).createSignedUrl(file.file_path, 3600);
                if (signedUrlError) {
                    console.error('Error creating signed URL:', signedUrlError);
                    return;
                }
                if (signedUrlData === null || signedUrlData === void 0 ? void 0 : signedUrlData.signedUrl) {
                    setImageUrls((prev)=>new Map(prev).set(file.id, signedUrlData.signedUrl));
                    setSelectedImage(signedUrlData.signedUrl);
                }
            } catch (error) {
                console.error('Error loading image:', error);
            }
        } else {
            setSelectedImage(imageUrls.get(file.id) || null);
        }
    };
    const handleDownload = async (file)=>{
        try {
            // Get signed URL for private bucket (valid for 1 hour)
            const { data: signedUrlData, error: signedUrlError } = await supabase.storage.from(WORKSPACE_FILES_BUCKET).createSignedUrl(file.file_path, 3600);
            if (signedUrlError) {
                console.error('Error creating signed URL:', signedUrlError);
                alert('Failed to download file. Please try again.');
                return;
            }
            if (signedUrlData === null || signedUrlData === void 0 ? void 0 : signedUrlData.signedUrl) {
                const link = document.createElement('a');
                link.href = signedUrlData.signedUrl;
                link.download = file.original_filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Failed to download file. Please try again.');
        }
    };
    if (files.length === 0) return null;
    // Separate files into images and non-images
    const imageFiles = files.filter((file)=>isImage(file.mime_type));
    const nonImageFiles = files.filter((file)=>!isImage(file.mime_type));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 inline-block",
                children: [
                    nonImageFiles.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: nonImageFiles.map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative group overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 bg-white/13 backdrop-blur-xl border border-black rounded-3xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/16 transition-all min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
                                            className: "w-5 h-5 text-white/60 flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                            lineNumber: 183,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0 overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-white truncate",
                                                    title: file.original_filename,
                                                    children: file.original_filename
                                                }, void 0, false, {
                                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-white/40 truncate",
                                                    children: formatFileSize(file.file_size)
                                                }, void 0, false, {
                                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                            lineNumber: 184,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleDownload(file),
                                            className: "ml-2 p-1.5 rounded-md hover:bg-white/10 transition-colors flex-shrink-0",
                                            "aria-label": "Download file",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                className: "w-4 h-4 text-white/60"
                                            }, void 0, false, {
                                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                                lineNumber: 200,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                            lineNumber: 195,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                    lineNumber: 182,
                                    columnNumber: 17
                                }, this)
                            }, file.id, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                lineNumber: 181,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, this),
                    imageFiles.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: imageFiles.map((file)=>{
                            const imageUrl = imageUrls.get(file.id);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative group cursor-pointer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-image-clickable": true,
                                    onClick: ()=>handleImageClick(file),
                                    onTouchEnd: (e)=>{
                                        // Prevent parent touch handlers from interfering
                                        e.stopPropagation();
                                        // Don't prevent default here - let the click happen naturally
                                        handleImageClick(file);
                                    },
                                    onTouchStart: (e)=>{
                                        // Stop propagation to prevent parent swipe handlers
                                        e.stopPropagation();
                                    },
                                    onPointerDown: (e)=>{
                                        // Ensure pointer events work on mobile
                                        e.stopPropagation();
                                    },
                                    className: "relative w-32 h-32 rounded-lg overflow-hidden border border-white/10 bg-white/5 hover:border-white/20 transition-all",
                                    style: {
                                        touchAction: 'manipulation',
                                        WebkitTapHighlightColor: 'transparent'
                                    },
                                    children: [
                                        imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: imageUrl,
                                            alt: file.original_filename,
                                            fill: true,
                                            sizes: "128px",
                                            className: "object-cover pointer-events-none select-none",
                                            draggable: false,
                                            loading: "lazy"
                                        }, void 0, false, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                            lineNumber: 240,
                                            columnNumber: 23
                                        }, this) : loadingImages.has(file.id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-full flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "animate-spin rounded-full h-6 w-6 border-b-2 border-white/40"
                                            }, void 0, false, {
                                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                                lineNumber: 251,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                            lineNumber: 250,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-full flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                className: "w-8 h-8 text-white/40"
                                            }, void 0, false, {
                                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                                lineNumber: 255,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                            lineNumber: 254,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                className: "w-6 h-6 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity"
                                            }, void 0, false, {
                                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                                lineNumber: 259,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                            lineNumber: 258,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                    lineNumber: 216,
                                    columnNumber: 19
                                }, this)
                            }, file.id, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                                lineNumber: 215,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            mounted && selectedImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9999] bg-black",
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100vw',
                    height: '100vh'
                },
                onClick: ()=>setSelectedImage(null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSelectedImage(null),
                        className: "absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors",
                        "aria-label": "Close image",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-5 h-5 text-white"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                            lineNumber: 291,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                        lineNumber: 286,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full h-full",
                        style: {
                            width: '100vw',
                            height: '100vh'
                        },
                        onClick: (e)=>e.stopPropagation(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: selectedImage,
                            alt: "Preview",
                            fill: true,
                            sizes: "100vw",
                            className: "object-contain",
                            priority: true
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                            lineNumber: 298,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                        lineNumber: 293,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx",
                lineNumber: 273,
                columnNumber: 11
            }, this), document.body)
        ]
    }, void 0, true);
}
_s(MessageFiles, "UqszFuuNVQLEL+qQ/HvNr3uQMMM=");
_c = MessageFiles;
var _c;
__turbopack_context__.k.register(_c, "MessageFiles");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/TiptapRenderer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TiptapRenderer",
    ()=>TiptapRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@tiptap+react@3.10.5_@floating-ui+dom@1.7.4_@tiptap+core@3.10.5_@tiptap+pm@3.10.5__@tiptap+pm_jrnslszcjrz3i5z3oeqxfbwply/node_modules/@tiptap/react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$extensions$2f$useTiptapExtensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/extensions/useTiptapExtensions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function TiptapRenderer(param) {
    let { content, contentType = 'markdown', className = '', enableMemberMentions = false, enableNoteMentions = false, workspaceMembers = [], workspaceNotes = [], workspaceFiles = [], onMentionClick, onNoteMentionClick, onFileMentionClick } = param;
    _s();
    const extensions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$extensions$2f$useTiptapExtensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapExtensions"])({
        mode: 'readonly',
        enableMemberMentions,
        enableNoteMentions,
        workspaceMembers,
        workspaceNotes
    });
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"])({
        immediatelyRender: false,
        extensions,
        content: content || '',
        contentType: contentType,
        editable: false,
        editorProps: {
            attributes: {
                class: "tiptap-renderer ".concat(className)
            },
            handleClickOn: {
                "TiptapRenderer.useEditor[editor]": (view, pos, node, nodePos, event)=>{
                    // Handle mention clicks
                    if (node.type.name === 'mention' && onMentionClick) {
                        const memberId = node.attrs.workspaceMemberId;
                        if (memberId) {
                            event.preventDefault();
                            onMentionClick(memberId);
                        }
                        return true;
                    }
                    // Handle note mention clicks
                    if (node.type.name === 'noteMention' && onNoteMentionClick) {
                        const noteId = node.attrs.noteId;
                        if (noteId) {
                            event.preventDefault();
                            onNoteMentionClick(noteId);
                        }
                        return true;
                    }
                    // Handle file mention clicks
                    if (node.type.name === 'fileMention' && onFileMentionClick) {
                        const fileId = node.attrs.fileId;
                        if (fileId) {
                            event.preventDefault();
                            onFileMentionClick(fileId);
                        }
                        return true;
                    }
                    return false;
                }
            }["TiptapRenderer.useEditor[editor]"]
        }
    });
    if (!editor) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EditorContent"], {
        editor: editor
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/TiptapRenderer.tsx",
        lineNumber: 96,
        columnNumber: 10
    }, this);
}
_s(TiptapRenderer, "IhHJINxyZ6p0mFfo4Sjfyqy8f6g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$extensions$2f$useTiptapExtensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapExtensions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$10$2e$5_$40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4_$40$tiptap$2b$core$40$3$2e$10$2e$5_$40$tiptap$2b$pm$40$3$2e$10$2e$5_$5f40$tiptap$2b$pm_jrnslszcjrz3i5z3oeqxfbwply$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"]
    ];
});
_c = TiptapRenderer;
var _c;
__turbopack_context__.k.register(_c, "TiptapRenderer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkspaceMessageItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$3$2e$6$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/format.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$reply$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Reply$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/reply.js [app-client] (ecmascript) <export default as Reply>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$use$2d$gesture$2b$react$40$10$2e$3$2e$1_react$40$19$2e$1$2e$0$2f$node_modules$2f40$use$2d$gesture$2f$react$2f$dist$2f$use$2d$gesture$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@use-gesture+react@10.3.1_react@19.1.0/node_modules/@use-gesture/react/dist/use-gesture-react.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$workspace$2f$components$2f$MessageContextMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageContextMenu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$workspace$2f$components$2f$MessageFiles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/MessageFiles.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$TiptapRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/tiptap/TiptapRenderer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
function ReadStatus(param) {
    let { readCount } = param;
    if (readCount <= 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "text-xs text-gray-500 mt-1",
        children: [
            "Read ",
            readCount
        ]
    }, void 0, true, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
        lineNumber: 26,
        columnNumber: 10
    }, this);
}
_c = ReadStatus;
function WorkspaceMessageItem(param) {
    let { message, isOwnMessage, onReply, onJumpToMessage, isHighlighted = false, workspaceMembers = [], workspaceNotes = [] } = param;
    var _message_replied_message, _message_workspace_member, _message_reads;
    _s();
    const [contextMenu, setContextMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [swipeOffset, setSwipeOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showSwipeIndicator, setShowSwipeIndicator] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const longPressTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragTargetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const startedOnRepliedPreviewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const pointerStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close context menu on scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkspaceMessageItem.useEffect": ()=>{
            const handleScroll = {
                "WorkspaceMessageItem.useEffect.handleScroll": ()=>setContextMenu(null)
            }["WorkspaceMessageItem.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll, true);
            return ({
                "WorkspaceMessageItem.useEffect": ()=>window.removeEventListener('scroll', handleScroll, true)
            })["WorkspaceMessageItem.useEffect"];
        }
    }["WorkspaceMessageItem.useEffect"], []);
    // Cleanup long press timer on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkspaceMessageItem.useEffect": ()=>{
            return ({
                "WorkspaceMessageItem.useEffect": ()=>{
                    if (longPressTimer.current) {
                        clearTimeout(longPressTimer.current);
                    }
                }
            })["WorkspaceMessageItem.useEffect"];
        }
    }["WorkspaceMessageItem.useEffect"], []);
    // Handle right-click (desktop)
    const handleContextMenu = (e)=>{
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY
        });
    };
    const handleReply = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceMessageItem.useCallback[handleReply]": ()=>{
            if (onReply) {
                onReply(message.id);
            }
            setContextMenu(null);
        }
    }["WorkspaceMessageItem.useCallback[handleReply]"], [
        onReply,
        message.id
    ]);
    const cancelLongPress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceMessageItem.useCallback[cancelLongPress]": ()=>{
            if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
                longPressTimer.current = null;
            }
        }
    }["WorkspaceMessageItem.useCallback[cancelLongPress]"], []);
    const scheduleLongPress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceMessageItem.useCallback[scheduleLongPress]": ()=>{
            cancelLongPress();
            longPressTimer.current = setTimeout({
                "WorkspaceMessageItem.useCallback[scheduleLongPress]": ()=>{
                    var _messageRef_current;
                    const rect = (_messageRef_current = messageRef.current) === null || _messageRef_current === void 0 ? void 0 : _messageRef_current.getBoundingClientRect();
                    if (rect) {
                        setContextMenu({
                            x: Math.min(rect.right - 150, window.innerWidth - 200),
                            y: rect.top
                        });
                    }
                }
            }["WorkspaceMessageItem.useCallback[scheduleLongPress]"], 500);
        }
    }["WorkspaceMessageItem.useCallback[scheduleLongPress]"], [
        cancelLongPress
    ]);
    const handlePointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceMessageItem.useCallback[handlePointerDown]": (event)=>{
            var _dragTargetRef_current;
            dragTargetRef.current = event.target;
            pointerStartRef.current = {
                x: event.clientX,
                y: event.clientY
            };
            startedOnRepliedPreviewRef.current = ((_dragTargetRef_current = dragTargetRef.current) === null || _dragTargetRef_current === void 0 ? void 0 : _dragTargetRef_current.closest('[data-replied-preview]')) !== null;
            if (!startedOnRepliedPreviewRef.current) {
                scheduleLongPress();
            }
        }
    }["WorkspaceMessageItem.useCallback[handlePointerDown]"], [
        scheduleLongPress
    ]);
    const handlePointerMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceMessageItem.useCallback[handlePointerMove]": (event)=>{
            const start = pointerStartRef.current;
            if (!start) return;
            const deltaX = Math.abs(event.clientX - start.x);
            const deltaY = Math.abs(event.clientY - start.y);
            if (deltaX > 6 || deltaY > 6) {
                cancelLongPress();
            }
        }
    }["WorkspaceMessageItem.useCallback[handlePointerMove]"], [
        cancelLongPress
    ]);
    const resetPointerState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceMessageItem.useCallback[resetPointerState]": ()=>{
            cancelLongPress();
            pointerStartRef.current = null;
            dragTargetRef.current = null;
            startedOnRepliedPreviewRef.current = false;
        }
    }["WorkspaceMessageItem.useCallback[resetPointerState]"], [
        cancelLongPress
    ]);
    const handlePointerUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceMessageItem.useCallback[handlePointerUp]": ()=>{
            resetPointerState();
        }
    }["WorkspaceMessageItem.useCallback[handlePointerUp]"], [
        resetPointerState
    ]);
    const handlePointerCancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceMessageItem.useCallback[handlePointerCancel]": ()=>{
            resetPointerState();
            setSwipeOffset(0);
            setShowSwipeIndicator(false);
        }
    }["WorkspaceMessageItem.useCallback[handlePointerCancel]"], [
        resetPointerState
    ]);
    const dragHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceMessageItem.useCallback[dragHandler]": (state)=>{
            const { first, last, movement, tap, event } = state;
            var _movement_;
            const movementX = (_movement_ = movement[0]) !== null && _movement_ !== void 0 ? _movement_ : 0;
            if (first) {
                cancelLongPress();
            }
            const startedOnPreview = startedOnRepliedPreviewRef.current;
            if (last) {
                var _message_replied_message;
                const clampedMovement = Math.min(movementX, 0);
                const swipeDistance = Math.abs(clampedMovement);
                setSwipeOffset(0);
                setShowSwipeIndicator(false);
                if (tap && startedOnPreview && onJumpToMessage && ((_message_replied_message = message.replied_message) === null || _message_replied_message === void 0 ? void 0 : _message_replied_message.id)) {
                    const nativeEvent = event;
                    if (typeof nativeEvent.stopPropagation === 'function') {
                        nativeEvent.stopPropagation();
                    }
                    onJumpToMessage(message.replied_message.id);
                } else if (swipeDistance >= 60 && onReply) {
                    handleReply();
                }
                resetPointerState();
                return;
            }
            const clampedMovement = Math.min(movementX, 0);
            if (clampedMovement < 0) {
                const limitedMovement = Math.max(clampedMovement, -120);
                setSwipeOffset(limitedMovement);
                setShowSwipeIndicator(Math.abs(limitedMovement) > 20);
            } else {
                setSwipeOffset(0);
                setShowSwipeIndicator(false);
            }
        }
    }["WorkspaceMessageItem.useCallback[dragHandler]"], [
        cancelLongPress,
        handleReply,
        (_message_replied_message = message.replied_message) === null || _message_replied_message === void 0 ? void 0 : _message_replied_message.id,
        onJumpToMessage,
        onReply,
        resetPointerState
    ]);
    const bindDrag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$use$2d$gesture$2b$react$40$10$2e$3$2e$1_react$40$19$2e$1$2e$0$2f$node_modules$2f40$use$2d$gesture$2f$react$2f$dist$2f$use$2d$gesture$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useDrag"])(dragHandler, {
        axis: 'x',
        filterTaps: true,
        threshold: 10,
        preventScroll: false
    });
    const dragBindings = bindDrag();
    const gestureBindings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WorkspaceMessageItem.useMemo[gestureBindings]": ()=>{
            return {
                ...dragBindings,
                onPointerDown: ({
                    "WorkspaceMessageItem.useMemo[gestureBindings]": (event)=>{
                        var _dragBindings_onPointerDown;
                        handlePointerDown(event);
                        (_dragBindings_onPointerDown = dragBindings.onPointerDown) === null || _dragBindings_onPointerDown === void 0 ? void 0 : _dragBindings_onPointerDown.call(dragBindings, event);
                    }
                })["WorkspaceMessageItem.useMemo[gestureBindings]"],
                onPointerMove: ({
                    "WorkspaceMessageItem.useMemo[gestureBindings]": (event)=>{
                        var _dragBindings_onPointerMove;
                        handlePointerMove(event);
                        (_dragBindings_onPointerMove = dragBindings.onPointerMove) === null || _dragBindings_onPointerMove === void 0 ? void 0 : _dragBindings_onPointerMove.call(dragBindings, event);
                    }
                })["WorkspaceMessageItem.useMemo[gestureBindings]"],
                onPointerUp: ({
                    "WorkspaceMessageItem.useMemo[gestureBindings]": (event)=>{
                        var _dragBindings_onPointerUp;
                        handlePointerUp();
                        (_dragBindings_onPointerUp = dragBindings.onPointerUp) === null || _dragBindings_onPointerUp === void 0 ? void 0 : _dragBindings_onPointerUp.call(dragBindings, event);
                    }
                })["WorkspaceMessageItem.useMemo[gestureBindings]"],
                onPointerCancel: ({
                    "WorkspaceMessageItem.useMemo[gestureBindings]": (event)=>{
                        var _dragBindings_onPointerCancel;
                        handlePointerCancel();
                        (_dragBindings_onPointerCancel = dragBindings.onPointerCancel) === null || _dragBindings_onPointerCancel === void 0 ? void 0 : _dragBindings_onPointerCancel.call(dragBindings, event);
                    }
                })["WorkspaceMessageItem.useMemo[gestureBindings]"],
                onPointerLeave: ({
                    "WorkspaceMessageItem.useMemo[gestureBindings]": (event)=>{
                        var _dragBindings_onPointerLeave;
                        handlePointerCancel();
                        (_dragBindings_onPointerLeave = dragBindings.onPointerLeave) === null || _dragBindings_onPointerLeave === void 0 ? void 0 : _dragBindings_onPointerLeave.call(dragBindings, event);
                    }
                })["WorkspaceMessageItem.useMemo[gestureBindings]"]
            };
        }
    }["WorkspaceMessageItem.useMemo[gestureBindings]"], [
        dragBindings,
        handlePointerCancel,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp
    ]);
    if (!message) return null;
    var _message_workspace_member_user_profile;
    const profile = (_message_workspace_member_user_profile = (_message_workspace_member = message.workspace_member) === null || _message_workspace_member === void 0 ? void 0 : _message_workspace_member.user_profile) !== null && _message_workspace_member_user_profile !== void 0 ? _message_workspace_member_user_profile : null;
    var _profile_name;
    const name = (_profile_name = profile === null || profile === void 0 ? void 0 : profile.name) !== null && _profile_name !== void 0 ? _profile_name : 'Unknown';
    var _profile_avatar_url;
    const avatarUrl = (_profile_avatar_url = profile === null || profile === void 0 ? void 0 : profile.avatar_url) !== null && _profile_avatar_url !== void 0 ? _profile_avatar_url : '';
    var _message_read_count, _ref;
    const readCount = (_ref = (_message_read_count = message.read_count) !== null && _message_read_count !== void 0 ? _message_read_count : (_message_reads = message.reads) === null || _message_reads === void 0 ? void 0 : _message_reads.length) !== null && _ref !== void 0 ? _ref : 0;
    const RepliedMessagePreview = (param)=>{
        let { repliedMessage } = param;
        var _repliedMessage_workspace_member;
        const repliedProfile = (_repliedMessage_workspace_member = repliedMessage.workspace_member) === null || _repliedMessage_workspace_member === void 0 ? void 0 : _repliedMessage_workspace_member.user_profile;
        var _repliedProfile_name;
        const repliedName = (_repliedProfile_name = repliedProfile === null || repliedProfile === void 0 ? void 0 : repliedProfile.name) !== null && _repliedProfile_name !== void 0 ? _repliedProfile_name : 'Unknown';
        const repliedText = repliedMessage.text.slice(0, 100) + (repliedMessage.text.length > 100 ? '...' : '');
        // Desktop click handler
        const handleClick = (e)=>{
            e.stopPropagation();
            if (onJumpToMessage && repliedMessage.id) {
                onJumpToMessage(repliedMessage.id);
            }
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-replied-preview": true,
            className: "mb-2 border-white/20 cursor-pointer hover:bg-white/5 rounded transition-colors",
            onClick: handleClick,
            style: {
                pointerEvents: 'auto'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                        className: "h-6 w-6 border border-white/15 bg-white/10 text-[10px] font-medium flex-shrink-0",
                        children: (repliedProfile === null || repliedProfile === void 0 ? void 0 : repliedProfile.avatar_url) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                            src: repliedProfile.avatar_url,
                            alt: repliedName
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                            lineNumber: 282,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                lineNumber: 285,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                            lineNumber: 284,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                        lineNumber: 280,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-white/50 mb-1",
                                children: repliedName
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                lineNumber: 290,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-white/40",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$TiptapRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TiptapRenderer"], {
                                    content: repliedText,
                                    contentType: "markdown",
                                    enableMemberMentions: true,
                                    enableNoteMentions: true,
                                    workspaceMembers: workspaceMembers,
                                    workspaceNotes: workspaceNotes,
                                    className: "tiptap-reply-preview"
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                    lineNumber: 292,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                        lineNumber: 289,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                lineNumber: 279,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
            lineNumber: 273,
            columnNumber: 7
        }, this);
    };
    if (isOwnMessage) {
        // Own messages on the right (ChatGPT style)
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: messageRef,
                    "data-message-id": message.id,
                    className: "flex justify-end items-end w-full relative transition-transform duration-300 ".concat(isHighlighted ? 'animate-bounce-x-right' : ''),
                    onContextMenu: handleContextMenu,
                    style: {
                        userSelect: 'none',
                        WebkitUserSelect: 'none'
                    },
                    ...gestureBindings,
                    children: [
                        showSwipeIndicator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-0 top-1/2 -translate-y-1/2 flex items-center transition-opacity duration-200 z-10",
                            style: {
                                opacity: showSwipeIndicator ? 1 : 0
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$reply$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Reply$3e$__["Reply"], {
                                className: "w-5 h-5 text-white/60"
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                lineNumber: 330,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                            lineNumber: 324,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 items-end justify-end min-w-0 max-w-full relative transition-transform duration-75",
                            style: {
                                transform: "translateX(".concat(swipeOffset, "px)")
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col justify-end flex-shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReadStatus, {
                                                readCount: readCount
                                            }, void 0, false, {
                                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                                lineNumber: 341,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                            lineNumber: 340,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 text-right",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$3$2e$6$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(message.created_at), 'HH:mm')
                                        }, void 0, false, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                            lineNumber: 343,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                    lineNumber: 339,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2 items-end",
                                    children: [
                                        (message.text || message.replied_message) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "inline-block bg-white/13 backdrop-blur-xl border border-black rounded-3xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]",
                                            children: [
                                                message.replied_message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RepliedMessagePreview, {
                                                    repliedMessage: message.replied_message
                                                }, void 0, false, {
                                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 21
                                                }, this),
                                                message.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-white",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$TiptapRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TiptapRenderer"], {
                                                        content: message.text,
                                                        contentType: "markdown",
                                                        enableMemberMentions: true,
                                                        enableNoteMentions: true,
                                                        workspaceMembers: workspaceMembers,
                                                        workspaceNotes: workspaceNotes,
                                                        className: "tiptap-message-content"
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                            lineNumber: 349,
                                            columnNumber: 17
                                        }, this),
                                        message.files && message.files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$workspace$2f$components$2f$MessageFiles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            files: message.files
                                        }, void 0, false, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                            lineNumber: 371,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                    lineNumber: 347,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                            lineNumber: 333,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                    lineNumber: 312,
                    columnNumber: 9
                }, this),
                contextMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$workspace$2f$components$2f$MessageContextMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    messageText: message.text,
                    onReply: handleReply,
                    onClose: ()=>setContextMenu(null),
                    position: contextMenu
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                    lineNumber: 377,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true);
    }
    // Other messages on the left
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: messageRef,
                "data-message-id": message.id,
                className: "flex gap-2 relative transition-transform duration-300 ".concat(isHighlighted ? 'animate-bounce-x-left' : ''),
                onContextMenu: handleContextMenu,
                style: {
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                },
                ...gestureBindings,
                children: [
                    showSwipeIndicator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-0 top-1/2 -translate-y-1/2 flex items-center transition-opacity duration-200 z-10",
                        style: {
                            opacity: showSwipeIndicator ? 1 : 0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$reply$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Reply$3e$__["Reply"], {
                            className: "w-5 h-5 text-white/60"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                            lineNumber: 409,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                        lineNumber: 403,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 flex-shrink-0 transition-transform duration-75",
                        style: {
                            transform: "translateX(".concat(swipeOffset, "px)")
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                            className: "h-8 w-8 border border-white/15 bg-white/10 text-xs font-medium",
                            children: avatarUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                src: avatarUrl,
                                alt: name
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                lineNumber: 420,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                    lineNumber: 423,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                lineNumber: 422,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                            lineNumber: 418,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                        lineNumber: 412,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1 min-w-0 relative flex-1 transition-transform duration-75",
                        style: {
                            transform: "translateX(".concat(swipeOffset, "px)")
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mb-1",
                                children: name
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                lineNumber: 434,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 items-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-2 min-w-0",
                                        children: [
                                            (message.text || message.replied_message) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "inline-block bg-white/8 backdrop-blur-xl border border-black rounded-3xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]",
                                                children: [
                                                    message.replied_message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RepliedMessagePreview, {
                                                        repliedMessage: message.replied_message
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                                        lineNumber: 440,
                                                        columnNumber: 21
                                                    }, this),
                                                    message.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-white",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$tiptap$2f$TiptapRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TiptapRenderer"], {
                                                            content: message.text,
                                                            contentType: "markdown",
                                                            enableMemberMentions: true,
                                                            enableNoteMentions: true,
                                                            workspaceMembers: workspaceMembers,
                                                            workspaceNotes: workspaceNotes,
                                                            className: "tiptap-message-content"
                                                        }, void 0, false, {
                                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                                            lineNumber: 446,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                                lineNumber: 438,
                                                columnNumber: 17
                                            }, this),
                                            message.files && message.files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$workspace$2f$components$2f$MessageFiles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                files: message.files
                                            }, void 0, false, {
                                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                                lineNumber: 460,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                        lineNumber: 436,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 mt-1",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$3$2e$6$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(message.created_at), 'HH:mm')
                                    }, void 0, false, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                        lineNumber: 463,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                                lineNumber: 435,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                        lineNumber: 428,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                lineNumber: 391,
                columnNumber: 7
            }, this),
            contextMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$workspace$2f$components$2f$MessageContextMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                messageText: message.text,
                onReply: handleReply,
                onClose: ()=>setContextMenu(null),
                position: contextMenu
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx",
                lineNumber: 470,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(WorkspaceMessageItem, "bOlLqSZnT/Psp/VmNnQs5UPHxXo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$use$2d$gesture$2b$react$40$10$2e$3$2e$1_react$40$19$2e$1$2e$0$2f$node_modules$2f40$use$2d$gesture$2f$react$2f$dist$2f$use$2d$gesture$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useDrag"]
    ];
});
_c1 = WorkspaceMessageItem;
var _c, _c1;
__turbopack_context__.k.register(_c, "ReadStatus");
__turbopack_context__.k.register(_c1, "WorkspaceMessageItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkspaceMessageList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$workspace$2f$components$2f$WorkspaceMessageItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageItem.tsx [app-client] (ecmascript)");
;
;
function WorkspaceMessageList(param) {
    let { messages, currentUserId, onReply, onJumpToMessage, highlightedMessageId, workspaceMembers = [], workspaceNotes = [] } = param;
    if (messages.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-400",
                    children: "No messages yet. Start the conversation!"
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageList.tsx",
                    lineNumber: 28,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageList.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageList.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3",
        children: messages.filter((message)=>message != null).map((message)=>{
            var _message_workspace_member;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$workspace$2f$components$2f$WorkspaceMessageItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                message: message,
                isOwnMessage: currentUserId === ((_message_workspace_member = message.workspace_member) === null || _message_workspace_member === void 0 ? void 0 : _message_workspace_member.user_id),
                onReply: onReply,
                onJumpToMessage: onJumpToMessage,
                isHighlighted: highlightedMessageId === message.id,
                workspaceMembers: workspaceMembers,
                workspaceNotes: workspaceNotes
            }, message.id, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageList.tsx",
                lineNumber: 41,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageList.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c = WorkspaceMessageList;
var _c;
__turbopack_context__.k.register(_c, "WorkspaceMessageList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useWorkspace.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/swr@2.3.6_react@19.1.0/node_modules/swr/dist/index/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__j__as__mutate$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/swr@2.3.6_react@19.1.0/node_modules/swr/dist/_internal/config-context-client-BoS53ST9.mjs [app-client] (ecmascript) <export j as mutate>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/workspaceApi.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
// SWR keys
const WORKSPACES_KEY = '/workspaces';
const workspaceKey = (id)=>"/workspaces/".concat(id);
function useWorkspaces() {
    _s();
    const { data, error, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(WORKSPACES_KEY, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkspaces"], {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });
    return {
        workspaces: data,
        isLoading,
        error
    };
}
_s(useWorkspaces, "3etLDUffADz62tD7g9gJKxYxEy4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
function useWorkspace(id) {
    _s1();
    const { data, error, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(id ? workspaceKey(id) : null, {
        "useWorkspace.useSWR": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkspace"])(id)
    }["useWorkspace.useSWR"], {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });
    return {
        workspace: data,
        isLoading,
        error
    };
}
_s1(useWorkspace, "3etLDUffADz62tD7g9gJKxYxEy4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
function useWorkspaceMembers(workspaceId) {
    _s2();
    const { data, error, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(workspaceId ? "/workspaces/".concat(workspaceId, "/members") : null, workspaceId ? ({
        "useWorkspaceMembers.useSWR": async ()=>await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkspaceMembers"])(workspaceId)
    })["useWorkspaceMembers.useSWR"] : null, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });
    return {
        members: data || [],
        isLoading,
        error
    };
}
_s2(useWorkspaceMembers, "3etLDUffADz62tD7g9gJKxYxEy4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
function useWorkspaceMutations() {
    const create = async (title)=>{
        const workspace = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWorkspace"])(title);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__j__as__mutate$3e$__["mutate"])(WORKSPACES_KEY); // Revalidate list
        return workspace;
    };
    const update = async (id, updates)=>{
        const workspace = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateWorkspace"])(id, updates);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__j__as__mutate$3e$__["mutate"])(workspaceKey(id)); // Revalidate specific workspace
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__j__as__mutate$3e$__["mutate"])(WORKSPACES_KEY); // Revalidate list
        return workspace;
    };
    const remove = async (id)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteWorkspace"])(id);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__j__as__mutate$3e$__["mutate"])(WORKSPACES_KEY); // Revalidate list
    };
    return {
        create,
        update,
        remove
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkspaceChatPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspaceChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useWorkspaceChat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/index.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatInput$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/chat-input/ChatInput.tsx [app-client] (ecmascript) <export default as ChatInput>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$glass$2d$card$2f$GlassButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/glass-card/GlassButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$workspace$2f$components$2f$WorkspaceMessageList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/features/workspace/components/WorkspaceMessageList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$HDOG2RTM$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-HDOG2RTM.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspace$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useWorkspace.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspaceNotes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useWorkspaceNotes.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function WorkspaceChatPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const workspaceId = parseInt(params.id);
    const scrollContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showScrollButton, setShowScrollButton] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const prevMessageCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const isUserScrollingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const scrollTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isLoadingMoreRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const prevScrollHeightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastScrollTopRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const hasScrolledUpRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const prevMessagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const chatInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [highlightedMessageId, setHighlightedMessageId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [replyingTo, setReplyingTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { messages, sendMessage: originalSendMessage, isLoading, isLoadingMore, error, isConnected, loadMoreMessages, hasMoreMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspaceChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspaceChat"])(workspaceId);
    // Fetch workspace members for mentions
    const { members } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspace$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspaceMembers"])(workspaceId);
    // Fetch workspace notes for note mentions
    const { notes: workspaceNotes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspaceNotes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspaceNotes"])(workspaceId);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$HDOG2RTM$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCopilotReadable"])({
        description: 'workspace chat history',
        value: messages.slice(-20).map({
            "WorkspaceChatPage.useCopilotReadable": (message)=>message.text
        }["WorkspaceChatPage.useCopilotReadable"]).join('\n'),
        categories: [
            'workspace_chat'
        ]
    });
    // Scroll to bottom function
    // Note: With column-reverse, bottom is at scrollTop = 0
    const scrollToBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceChatPage.useCallback[scrollToBottom]": function() {
            let behavior = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'smooth';
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({
                    top: 0,
                    behavior
                });
            }
        }
    }["WorkspaceChatPage.useCallback[scrollToBottom]"], []);
    // Track when we send a message to avoid conflicts with useEffect scroll logic
    const sendingMessageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Wrap sendMessage to scroll to bottom after sending
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceChatPage.useCallback[sendMessage]": async (text, workspaceFileIds, mentionedMemberIds, mentionedNoteIds)=>{
            sendingMessageRef.current = true;
            var _replyingTo_id;
            const replyToId = (_replyingTo_id = replyingTo === null || replyingTo === void 0 ? void 0 : replyingTo.id) !== null && _replyingTo_id !== void 0 ? _replyingTo_id : null;
            try {
                await originalSendMessage(text, replyToId, workspaceFileIds, mentionedMemberIds, mentionedNoteIds);
                // Clear reply state after sending
                setReplyingTo(null);
                // Scroll to bottom after sending message
                // Use a delay to ensure the message is in the DOM via realtime
                setTimeout({
                    "WorkspaceChatPage.useCallback[sendMessage]": ()=>{
                        if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollTop = 0;
                        }
                        sendingMessageRef.current = false;
                    }
                }["WorkspaceChatPage.useCallback[sendMessage]"], 100);
            } catch (error) {
                sendingMessageRef.current = false;
                throw error;
            }
        }
    }["WorkspaceChatPage.useCallback[sendMessage]"], [
        originalSendMessage,
        replyingTo
    ]);
    // Handle reply action
    const handleReply = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceChatPage.useCallback[handleReply]": (messageId)=>{
            const message = messages.find({
                "WorkspaceChatPage.useCallback[handleReply].message": (m)=>m.id === messageId
            }["WorkspaceChatPage.useCallback[handleReply].message"]);
            if (message) {
                var _message_workspace_member_user_profile, _message_workspace_member;
                var _message_workspace_member_user_profile_name;
                const authorName = (_message_workspace_member_user_profile_name = (_message_workspace_member = message.workspace_member) === null || _message_workspace_member === void 0 ? void 0 : (_message_workspace_member_user_profile = _message_workspace_member.user_profile) === null || _message_workspace_member_user_profile === void 0 ? void 0 : _message_workspace_member_user_profile.name) !== null && _message_workspace_member_user_profile_name !== void 0 ? _message_workspace_member_user_profile_name : 'Unknown';
                setReplyingTo({
                    id: message.id,
                    text: message.text,
                    authorName
                });
                // Focus input after setting reply
                setTimeout({
                    "WorkspaceChatPage.useCallback[handleReply]": ()=>{
                        var _chatInputRef_current;
                        (_chatInputRef_current = chatInputRef.current) === null || _chatInputRef_current === void 0 ? void 0 : _chatInputRef_current.focus();
                    }
                }["WorkspaceChatPage.useCallback[handleReply]"], 100);
            }
        }
    }["WorkspaceChatPage.useCallback[handleReply]"], [
        messages
    ]);
    // Cancel reply
    const handleCancelReply = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceChatPage.useCallback[handleCancelReply]": ()=>{
            setReplyingTo(null);
        }
    }["WorkspaceChatPage.useCallback[handleCancelReply]"], []);
    // Scroll to a specific message by ID
    const scrollToMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceChatPage.useCallback[scrollToMessage]": (messageId)=>{
            if (!scrollContainerRef.current) return;
            // Find the message element by data attribute
            const messageElement = scrollContainerRef.current.querySelector('[data-message-id="'.concat(messageId, '"]'));
            if (!messageElement) return;
            // Check if the message is already in view
            const container = scrollContainerRef.current;
            const containerRect = container.getBoundingClientRect();
            const elementRect = messageElement.getBoundingClientRect();
            // Check if element is visible within the container viewport
            const isInView = elementRect.top >= containerRect.top && elementRect.bottom <= containerRect.bottom && elementRect.left >= containerRect.left && elementRect.right <= containerRect.right;
            // Only scroll if not already in view
            if (!isInView) {
                // Use scrollIntoView with block: 'center' to center the message
                // This works well with column-reverse layout
                messageElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
                // Trigger bounce animation after scroll has started (longer delay for scrolling)
                setTimeout({
                    "WorkspaceChatPage.useCallback[scrollToMessage]": ()=>{
                        setHighlightedMessageId(messageId);
                        // Clear highlight after animation completes
                        setTimeout({
                            "WorkspaceChatPage.useCallback[scrollToMessage]": ()=>{
                                setHighlightedMessageId(null);
                            }
                        }["WorkspaceChatPage.useCallback[scrollToMessage]"], 600);
                    }
                }["WorkspaceChatPage.useCallback[scrollToMessage]"], 300);
            } else {
                // Message is already in view - trigger bounce immediately
                setHighlightedMessageId(messageId);
                // Clear highlight after animation completes
                setTimeout({
                    "WorkspaceChatPage.useCallback[scrollToMessage]": ()=>{
                        setHighlightedMessageId(null);
                    }
                }["WorkspaceChatPage.useCallback[scrollToMessage]"], 600);
            }
        }
    }["WorkspaceChatPage.useCallback[scrollToMessage]"], []);
    // Check if user is near bottom (within threshold)
    // Note: With column-reverse, scrollTop 0 or positive small values are at the bottom
    const isNearBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceChatPage.useCallback[isNearBottom]": ()=>{
            if (!scrollContainerRef.current) {
                return true;
            }
            const container = scrollContainerRef.current;
            const threshold = 1000;
            const scrollTop = container.scrollTop;
            const scrollTopAbs = Math.abs(scrollTop);
            // With column-reverse, bottom is at scrollTop = 0 or small positive values
            // Negative values mean we're scrolled away from bottom (toward top)
            const result = scrollTopAbs <= threshold;
            return result;
        }
    }["WorkspaceChatPage.useCallback[isNearBottom]"], []);
    // Check if user is near top (within 800px - triggers earlier for faster loading)
    // Note: With column-reverse, scrollTop can be negative, which means we're at the top
    const isNearTop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceChatPage.useCallback[isNearTop]": ()=>{
            if (!scrollContainerRef.current) return false;
            const container = scrollContainerRef.current;
            const threshold = 800;
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight;
            const clientHeight = container.clientHeight;
            // With flex-col-reverse, negative scrollTop means we're scrolled to the top (oldest messages)
            // This is a browser quirk with flex-col-reverse
            // From logs: scrollTop is around -628 to -667 when scrolled up, which means we're near the top
            if (scrollTop < 0) {
                // If scrollTop is negative, we're scrolled up toward older messages
                // The more negative, the more we've scrolled up
                // Trigger if we're scrolled up significantly (absolute value > 200px threshold)
                return Math.abs(scrollTop) > 200;
            }
            // Calculate max scroll position
            const maxScrollTop = scrollHeight - clientHeight;
            // Handle edge case where content is smaller than container
            if (maxScrollTop <= 0) return false;
            // For positive scrollTop, check if we're within threshold of the max scroll
            const distanceFromTop = maxScrollTop - scrollTop;
            return distanceFromTop < threshold;
        }
    }["WorkspaceChatPage.useCallback[isNearTop]"], []);
    // Handle scroll events to show/hide button
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkspaceChatPage.useEffect": ()=>{
            const container = scrollContainerRef.current;
            if (!container) return;
            const handleScroll = {
                "WorkspaceChatPage.useEffect.handleScroll": ()=>{
                    if (!scrollContainerRef.current) return;
                    const container = scrollContainerRef.current;
                    const currentScrollTop = container.scrollTop;
                    // Detect if user is scrolling up
                    // With column-reverse, increasing scrollTop means scrolling up (away from bottom)
                    if (currentScrollTop > lastScrollTopRef.current) {
                        hasScrolledUpRef.current = true;
                    }
                    // Reset scrolled up flag if user reaches near bottom
                    if (isNearBottom()) {
                        hasScrolledUpRef.current = false;
                    }
                    lastScrollTopRef.current = currentScrollTop;
                    isUserScrollingRef.current = true;
                    // Clear existing timeout
                    if (scrollTimeoutRef.current) {
                        clearTimeout(scrollTimeoutRef.current);
                    }
                    // Set timeout to detect when scrolling stops
                    scrollTimeoutRef.current = setTimeout({
                        "WorkspaceChatPage.useEffect.handleScroll": ()=>{
                            isUserScrollingRef.current = false;
                        }
                    }["WorkspaceChatPage.useEffect.handleScroll"], 300); // Increased timeout to be more reliable
                    // Check if we should show the scroll button
                    const nearBottom = isNearBottom();
                    setShowScrollButton(!nearBottom);
                    // Check if we're near top and should load more messages
                    // With column-reverse, "top" (for loading older messages) is at high scrollTop values
                    const nearTop = isNearTop();
                    if (nearTop && hasMoreMessages && !isLoadingMoreRef.current && !isLoadingMore) {
                        isLoadingMoreRef.current = true;
                        // Store current scrollHeight to restore position after loading
                        prevScrollHeightRef.current = container.scrollHeight;
                        loadMoreMessages().finally({
                            "WorkspaceChatPage.useEffect.handleScroll": ()=>{
                                isLoadingMoreRef.current = false;
                            }
                        }["WorkspaceChatPage.useEffect.handleScroll"]);
                    }
                }
            }["WorkspaceChatPage.useEffect.handleScroll"];
            container.addEventListener('scroll', handleScroll);
            return ({
                "WorkspaceChatPage.useEffect": ()=>{
                    container.removeEventListener('scroll', handleScroll);
                    if (scrollTimeoutRef.current) {
                        clearTimeout(scrollTimeoutRef.current);
                    }
                }
            })["WorkspaceChatPage.useEffect"];
        }
    }["WorkspaceChatPage.useEffect"], [
        isNearBottom,
        isNearTop,
        hasMoreMessages,
        loadMoreMessages,
        isLoadingMore
    ]);
    // No initial scroll needed - CSS column-reverse handles it automatically!
    // Removed useLayoutEffect and useEffect for initial scroll
    // Preserve scroll position when messages change (from loading older messages or realtime updates)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkspaceChatPage.useEffect": ()=>{
            var _prevMessages_, _messages_;
            const container = scrollContainerRef.current;
            if (!container) return;
            const prevMessages = prevMessagesRef.current;
            const messagesChanged = prevMessages.length !== messages.length || prevMessages.length > 0 && messages.length > 0 && ((_prevMessages_ = prevMessages[0]) === null || _prevMessages_ === void 0 ? void 0 : _prevMessages_.id) !== ((_messages_ = messages[0]) === null || _messages_ === void 0 ? void 0 : _messages_.id);
            // If messages changed and user has scrolled up, preserve scroll position
            if (messagesChanged && prevMessages.length > 0) {
                // Case 1: Loading older messages (prepending) - preserve scroll position
                // Check if we stored a scrollHeight and messages increased (new messages were prepended)
                if (prevScrollHeightRef.current > 0 && messages.length > prevMessages.length) {
                    // Use double requestAnimationFrame to ensure DOM has fully updated with new messages
                    requestAnimationFrame({
                        "WorkspaceChatPage.useEffect": ()=>{
                            requestAnimationFrame({
                                "WorkspaceChatPage.useEffect": ()=>{
                                    if (!scrollContainerRef.current) return;
                                    const container = scrollContainerRef.current;
                                    const scrollHeightDifference = container.scrollHeight - prevScrollHeightRef.current;
                                    if (scrollHeightDifference > 0) {
                                        // With flex-col-reverse, when older messages are prepended,
                                        // scrollTop may be negative. We need to adjust it to maintain visual position.
                                        // Since we're adding content "above" (which in flex-col-reverse is at higher scrollTop),
                                        // we need to increase the scrollTop value (make it less negative or more positive)
                                        const oldScrollTop = container.scrollTop;
                                        // Adding the difference maintains the visual position
                                        container.scrollTop = oldScrollTop + scrollHeightDifference;
                                    }
                                    // Reset after adjustment
                                    prevScrollHeightRef.current = 0;
                                }
                            }["WorkspaceChatPage.useEffect"]);
                        }
                    }["WorkspaceChatPage.useEffect"]);
                    // Update prev messages after processing
                    prevMessagesRef.current = messages;
                    return; // Don't process realtime updates when loading more
                } else if (messages.length > 0 && !isLoadingMore && !sendingMessageRef.current && !isNearBottom()) {
                    // Capture scroll position before React updates DOM
                    const scrollTopToPreserve = container.scrollTop;
                    // Use double requestAnimationFrame to ensure DOM has fully updated
                    requestAnimationFrame({
                        "WorkspaceChatPage.useEffect": ()=>{
                            requestAnimationFrame({
                                "WorkspaceChatPage.useEffect": ()=>{
                                    if (!scrollContainerRef.current) return;
                                    // If user is still not near bottom, restore scroll position
                                    if (!isNearBottom()) {
                                        scrollContainerRef.current.scrollTop = scrollTopToPreserve;
                                    }
                                }
                            }["WorkspaceChatPage.useEffect"]);
                        }
                    }["WorkspaceChatPage.useEffect"]);
                }
            }
            // Update prev messages after processing
            prevMessagesRef.current = messages;
        }
    }["WorkspaceChatPage.useEffect"], [
        messages,
        isLoadingMore,
        isNearBottom
    ]);
    // Track message count (no auto-scroll - removed as per user request)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkspaceChatPage.useEffect": ()=>{
            prevMessageCountRef.current = messages.length;
        }
    }["WorkspaceChatPage.useEffect"], [
        messages.length
    ]);
    // Get current user ID
    const [currentUserId, setCurrentUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkspaceChatPage.useEffect": ()=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            supabase.auth.getUser().then({
                "WorkspaceChatPage.useEffect": (param)=>{
                    let { data: { user } } = param;
                    setCurrentUserId((user === null || user === void 0 ? void 0 : user.id) || null);
                }
            }["WorkspaceChatPage.useEffect"]);
        }
    }["WorkspaceChatPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full relative",
        children: [
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-2 mb-2 bg-white/8 backdrop-blur-xl border border-black rounded-4xl text-center text-sm text-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]",
                children: error
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                lineNumber: 409,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollContainerRef,
                className: "flex-1 overflow-y-auto relative flex flex-col-reverse",
                children: [
                    isLoadingMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center py-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-gray-400 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                                    lineNumber: 424,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Loading older messages..."
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                                    lineNumber: 425,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                            lineNumber: 423,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                        lineNumber: 422,
                        columnNumber: 11
                    }, this),
                    isConnected || messages.length > 0 ? currentUserId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$workspace$2f$components$2f$WorkspaceMessageList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        messages: messages,
                        currentUserId: currentUserId,
                        onReply: handleReply,
                        onJumpToMessage: scrollToMessage,
                        highlightedMessageId: highlightedMessageId,
                        workspaceMembers: members,
                        workspaceNotes: workspaceNotes
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                        lineNumber: 432,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400",
                                children: "Loading..."
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                                lineNumber: 444,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                            lineNumber: 443,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                        lineNumber: 442,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400",
                                children: "Connecting to real-time chat..."
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                                lineNumber: 451,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                            lineNumber: 450,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                        lineNumber: 449,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                lineNumber: 416,
                columnNumber: 7
            }, this),
            showScrollButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-24 right-4 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$glass$2d$card$2f$GlassButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    type: "button",
                    onClick: ()=>scrollToBottom('smooth'),
                    size: "icon",
                    className: "size-10 hover:scale-102",
                    "aria-label": "Scroll to bottom",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                        lineNumber: 467,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                    lineNumber: 460,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                lineNumber: 459,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$chat$2d$input$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatInput$3e$__["ChatInput"], {
                ref: chatInputRef,
                onSend: sendMessage,
                isLoading: isLoading,
                placeholder: "Message",
                canStop: false,
                replyingTo: replyingTo,
                onCancelReply: handleCancelReply,
                workspaceId: workspaceId,
                workspaceMembers: members,
                workspaceNotes: workspaceNotes
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
                lineNumber: 473,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/workspace/[id]/chat/page.tsx",
        lineNumber: 406,
        columnNumber: 5
    }, this);
}
_s(WorkspaceChatPage, "o2XxcRCGtUScCVkA2h1RSXNceRA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspaceChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspaceChat"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspace$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspaceMembers"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useWorkspaceNotes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspaceNotes"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$HDOG2RTM$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCopilotReadable"]
    ];
});
_c = WorkspaceChatPage;
var _c;
__turbopack_context__.k.register(_c, "WorkspaceChatPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=code_cogni_cogni-frontend_apps_web_src_18496876._.js.map