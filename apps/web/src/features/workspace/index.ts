// Workspace feature public exports

// Domain types
export * from './domain';

// API
export * from './api';

// Hooks
export * from './hooks/useWorkspace';
export * from './hooks/useWorkspaceChat';
export * from './hooks/useWorkspaceSettings';
export * from './hooks/useWorkspaceActivity';
export { useWorkspaceInvitations } from './hooks/useWorkspaceInvitations';

// Components (export specific ones as needed)
export { default as WorkspaceForm } from './components/WorkspaceForm';
export { default as WorkspaceList } from './components/WorkspaceList';
export { default as MemberList } from './components/MemberList';
export { default as WorkspaceMessageList } from './components/WorkspaceMessageList';
export { default as WorkspaceSettingsClient } from './WorkspaceSettingsClient';
