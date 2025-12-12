'use client';

import { useCallback, useEffect, useState } from 'react';
import { mutate } from 'swr';

import {
  removeWorkspaceIcon,
  uploadWorkspaceIcon,
} from '@/lib/api/workspaceApi';
import { useWorkspace, useWorkspaceMutations } from '@/hooks/useWorkspace';
import { generateAvatarBlob } from '@/features/users/utils/avatarGenerator';

import type { StatusMessage } from '@/features/users/utils/avatar';
import type { Workspace } from '@/types/workspace';

type UseWorkspaceSettingsReturn = {
  workspaceId: number | null;
  isLoading: boolean;
  error: unknown;
  workspace: Workspace | null;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  savingTitle: boolean;
  titleStatus: StatusMessage | null;
  setTitleStatus: React.Dispatch<React.SetStateAction<StatusMessage | null>>;
  saveTitle: () => Promise<void>;
  savingIcon: boolean;
  generatingIcon: boolean;
  removingIcon: boolean;
  iconStatus: StatusMessage | null;
  setIconStatus: React.Dispatch<React.SetStateAction<StatusMessage | null>>;
  updateIcon: (file: File) => Promise<void>;
  generateIcon: () => Promise<void>;
  removeIcon: () => Promise<void>;
  iconUrl: string | null | undefined;
  deleteWorkspace: () => Promise<void>;
  deletingWorkspace: boolean;
};

export function useWorkspaceSettings(
  workspaceId: number | null
): UseWorkspaceSettingsReturn {
  const { workspace, isLoading, error } = useWorkspace(workspaceId);
  const { update, remove } = useWorkspaceMutations();

  const [title, setTitle] = useState('');
  const [savingTitle, setSavingTitle] = useState(false);
  const [titleStatus, setTitleStatus] = useState<StatusMessage | null>(null);

  const [savingIcon, setSavingIcon] = useState(false);
  const [generatingIcon, setGeneratingIcon] = useState(false);
  const [removingIcon, setRemovingIcon] = useState(false);
  const [iconStatus, setIconStatus] = useState<StatusMessage | null>(null);
  const [deletingWorkspace, setDeletingWorkspace] = useState(false);
  const [generationCounter, setGenerationCounter] = useState(0);

  useEffect(() => {
    if (workspace) {
      setTitle(workspace.title ?? '');
    }
  }, [workspace]);

  const saveTitle = useCallback(async () => {
    if (!workspaceId || !workspace) return;

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setTitleStatus({
        type: 'error',
        message: 'Workspace name is required.',
      });
      return;
    }

    if ((workspace.title ?? '').trim() === trimmedTitle) {
      setTitleStatus({
        type: 'success',
        message: 'No changes to save.',
      });
      return;
    }

    try {
      setSavingTitle(true);
      setTitleStatus(null);
      const updated = await update(workspaceId, { title: trimmedTitle });
      setTitle(updated.title ?? '');
      setTitleStatus({
        type: 'success',
        message: 'Workspace name updated successfully.',
      });
    } catch (err) {
      console.error('Failed to update workspace title', err);
      setTitleStatus({
        type: 'error',
        message: 'Unable to update workspace name. Please try again.',
      });
    } finally {
      setSavingTitle(false);
    }
  }, [title, update, workspace, workspaceId]);

  const updateIcon = useCallback(
    async (file: File) => {
      if (!workspaceId || !workspace) return;

      try {
        setSavingIcon(true);
        setIconStatus(null);
        const { iconUrl } = await uploadWorkspaceIcon(
          workspaceId,
          file,
          workspace.icon_url ?? undefined
        );
        await update(workspaceId, { icon_url: iconUrl });
        setIconStatus({
          type: 'success',
          message: 'Workspace icon updated successfully.',
        });
      } catch (err) {
        console.error('Failed to update workspace icon', err);
        setIconStatus({
          type: 'error',
          message: 'Unable to update workspace icon. Please try again.',
        });
        throw err;
      } finally {
        setSavingIcon(false);
      }
    },
    [update, workspace, workspaceId]
  );

  const generateIcon = useCallback(async () => {
    if (!workspaceId || !workspace) return;

    try {
      setGeneratingIcon(true);
      setIconStatus(null);

      // Use workspace title as base seed with counter for variation
      const seed = workspace.title || `workspace-${workspaceId}`;
      const uniqueSeed = `${seed}-${generationCounter}`;

      const iconBlob = await generateAvatarBlob(uniqueSeed, {
        style: 'cosmic',
        includeInitials: false,
      });

      const { iconUrl } = await uploadWorkspaceIcon(
        workspaceId,
        iconBlob,
        workspace.icon_url ?? undefined
      );

      await update(workspaceId, { icon_url: iconUrl });
      setGenerationCounter(prev => prev + 1);
      setIconStatus({
        type: 'success',
        message: 'Workspace icon generated successfully.',
      });
    } catch (err) {
      console.error('Failed to generate workspace icon', err);
      setIconStatus({
        type: 'error',
        message: 'Failed to generate workspace icon. Please try again.',
      });
      throw err;
    } finally {
      setGeneratingIcon(false);
    }
  }, [generationCounter, update, workspace, workspaceId]);

  const removeIcon = useCallback(async () => {
    if (!workspaceId || !workspace?.icon_url) return;

    try {
      setRemovingIcon(true);
      setIconStatus(null);
      await removeWorkspaceIcon(workspaceId, workspace.icon_url);
      await mutate(`/workspaces/${workspaceId}`);
      await mutate('/workspaces');
      setIconStatus({
        type: 'success',
        message: 'Workspace icon removed.',
      });
    } catch (err) {
      console.error('Failed to remove workspace icon', err);
      setIconStatus({
        type: 'error',
        message: 'Unable to remove workspace icon. Please try again.',
      });
      throw err;
    } finally {
      setRemovingIcon(false);
    }
  }, [workspace?.icon_url, workspaceId]);

  const deleteWorkspace = useCallback(async () => {
    if (!workspaceId) return;

    try {
      setDeletingWorkspace(true);
      await remove(workspaceId);
      await mutate(`/workspaces/${workspaceId}`, undefined, false);
      await mutate('/workspaces');
    } catch (err) {
      console.error('Failed to delete workspace', err);
      throw err;
    } finally {
      setDeletingWorkspace(false);
    }
  }, [remove, workspaceId]);

  return {
    workspaceId,
    isLoading,
    error,
    workspace: workspace ?? null,
    title,
    setTitle,
    savingTitle,
    titleStatus,
    setTitleStatus,
    saveTitle,
    savingIcon,
    generatingIcon,
    removingIcon,
    iconStatus,
    setIconStatus,
    updateIcon,
    generateIcon,
    removeIcon,
    iconUrl: workspace?.icon_url,
    deleteWorkspace,
    deletingWorkspace,
  };
}
