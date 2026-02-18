'use client';

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import type { Area } from 'react-easy-crop';
import type { Workspace } from '@/types/workspace';
import { Plus, Sparkles, MessageCircle, User, Loader2 } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GlassButton from '@/components/glass-design/GlassButton';
import useSWR from 'swr';
import { mutate } from 'swr';
import {
  getAllWorkspaceMembersForUser,
  findOrCreateDmWorkspace,
} from '@/lib/api/workspaceApi';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
} from '@/components/ui/drawer';
import { WorkspaceIconCropDialog } from './WorkspaceIconCropDialog';
import {
  getCroppedImageBlob,
  getInitials,
  readFileAsDataUrl,
} from '@/features/users/utils/avatar';
import { generateAvatarBlob } from '@/features/users/utils/avatarGenerator';

interface WorkspaceFormProps {
  workspace?: Workspace | null;
  workspaces?: Workspace[];
  onSubmit: (payload: {
    id: number | null;
    title: string;
    iconFile: File | null;
  }) => Promise<number | void>;
  onEditComplete?: () => void;
  isLoading?: boolean;
}

export default function WorkspaceForm({
  workspace,
  workspaces,
  onSubmit,
  onEditComplete,
  isLoading,
}: WorkspaceFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(() => workspace?.title ?? '');
  const [error, setError] = useState<string | null>(null);
  const [iconError, setIconError] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatingIcon, setGeneratingIcon] = useState(false);
  const [generationCounter, setGenerationCounter] = useState(0);

  const [iconPreviewUrl, setIconPreviewUrl] = useState<string | null>(
    () => workspace?.icon_url ?? null
  );
  const iconPreviewRef = useRef<string | null>(workspace?.icon_url ?? null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // DM section state
  const [dmLoadingUserId, setDmLoadingUserId] = useState<string | null>(null);
  const isCreateMode = !workspace;

  const { data: allMembers } = useSWR(
    open && isCreateMode ? '/all-workspace-members' : null,
    getAllWorkspaceMembersForUser
  );

  const unconnectedMembers = useMemo(() => {
    if (!allMembers) return [];
    const existingDmUserIds = new Set(
      (workspaces ?? [])
        .filter(w => w.type === 'dm' && w.dm_other_user?.user_id)
        .map(w => w.dm_other_user!.user_id)
    );
    return allMembers.filter(
      m => m.user_id && !existingDmUserIds.has(m.user_id)
    );
  }, [allMembers, workspaces]);

  const updateIconPreview = useCallback((preview: string | null) => {
    if (iconPreviewRef.current && iconPreviewRef.current.startsWith('blob:')) {
      URL.revokeObjectURL(iconPreviewRef.current);
    }
    iconPreviewRef.current = preview;
    setIconPreviewUrl(preview);
  }, []);

  useEffect(() => {
    return () => {
      if (
        iconPreviewRef.current &&
        iconPreviewRef.current.startsWith('blob:')
      ) {
        URL.revokeObjectURL(iconPreviewRef.current);
      }
    };
  }, []);

  const resetState = useCallback(() => {
    setTitle(workspace?.title ?? '');
    setError(null);
    setIconError(null);
    setIconFile(null);
    updateIconPreview(workspace?.icon_url ?? null);
    setSelectedImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [updateIconPreview, workspace]);

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open, resetState]);

  const handleDialogOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        setOpen(false);
        resetState();
        onEditComplete?.();
      } else {
        resetState();
        setOpen(true);
      }
    },
    [onEditComplete, resetState]
  );

  const handleDmSelect = useCallback(
    async (userId: string) => {
      if (!userId || dmLoadingUserId) return;
      setDmLoadingUserId(userId);
      try {
        const result = await findOrCreateDmWorkspace(userId);
        mutate('/workspaces');
        handleDialogOpenChange(false);
        router.push(`/workspace/${result.workspace_id}/chat`);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : JSON.stringify(err);
        console.error('Failed to create DM workspace:', message);
      } finally {
        setDmLoadingUserId(null);
      }
    },
    [dmLoadingUserId, handleDialogOpenChange, router]
  );

  const handleTitleChange = useCallback(
    (value: string) => {
      setTitle(value);
      if (error) {
        setError(null);
      }
    },
    [error]
  );

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        setIconError(null);
        const dataUrl = await readFileAsDataUrl(file);
        setSelectedImageSrc(dataUrl);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
        setCropDialogOpen(true);
      } catch (err) {
        console.error('Failed to read workspace icon file', err);
        setIconError(
          'Could not open the selected image. Please try another file.'
        );
      }
    },
    []
  );

  const handleCropDialogOpenChange = useCallback((nextOpen: boolean) => {
    if (!nextOpen) {
      setCropDialogOpen(false);
      setSelectedImageSrc(null);
      setCroppedAreaPixels(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      setCropDialogOpen(true);
    }
  }, []);

  const handleIconCancel = useCallback(() => {
    handleCropDialogOpenChange(false);
  }, [handleCropDialogOpenChange]);

  const handleIconSave = useCallback(async () => {
    if (!selectedImageSrc || !croppedAreaPixels) {
      return;
    }

    try {
      const croppedBlob = await getCroppedImageBlob(
        selectedImageSrc,
        croppedAreaPixels
      );
      const file = new File([croppedBlob], 'workspace-icon.png', {
        type: 'image/png',
      });
      const previewUrl = URL.createObjectURL(file);
      updateIconPreview(previewUrl);
      setIconFile(file);
      setIconError(null);
      handleCropDialogOpenChange(false);
    } catch (err) {
      console.error('Failed to process workspace icon', err);
      setIconError('Unable to process the selected image. Please try again.');
    }
  }, [
    croppedAreaPixels,
    handleCropDialogOpenChange,
    selectedImageSrc,
    updateIconPreview,
  ]);

  const handleClearSelectedIcon = useCallback(() => {
    setIconFile(null);
    setIconError(null);
    updateIconPreview(workspace?.icon_url ?? null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [updateIconPreview, workspace?.icon_url]);

  const handleGenerateIcon = useCallback(async () => {
    try {
      setGeneratingIcon(true);
      setIconError(null);

      // Use workspace title or default seed
      const seed =
        title.trim() || workspace?.title || `workspace-${Date.now()}`;
      const uniqueSeed = `${seed}-${generationCounter}`;

      const iconBlob = await generateAvatarBlob(uniqueSeed, {
        style: 'cosmic',
        includeInitials: false,
      });

      const file = new File([iconBlob], 'workspace-icon.png', {
        type: 'image/png',
      });
      const previewUrl = URL.createObjectURL(file);
      updateIconPreview(previewUrl);
      setIconFile(file);
      setGenerationCounter(prev => prev + 1);
    } catch (err) {
      console.error('Failed to generate workspace icon', err);
      setIconError('Failed to generate icon. Please try again.');
    } finally {
      setGeneratingIcon(false);
    }
  }, [generationCounter, title, workspace?.title, updateIconPreview]);

  const initials = useMemo(
    () => getInitials(title || workspace?.title || 'Workspace', 'Workspace'),
    [title, workspace?.title]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);

      const trimmedTitle = title.trim();
      if (!trimmedTitle) {
        setError('Workspace name is required');
        return;
      }

      setIsSubmitting(true);
      try {
        const workspaceId = await onSubmit({
          id: workspace?.id ?? null,
          title: trimmedTitle,
          iconFile,
        });

        console.log(
          'WorkspaceForm: onSubmit returned workspaceId:',
          workspaceId
        );
        console.log('WorkspaceForm: workspace:', workspace);
        console.log('WorkspaceForm: isNewWorkspace:', !workspace);

        // If creating a new workspace, navigate to members page
        if (!workspace && workspaceId && typeof workspaceId === 'number') {
          console.log(
            'WorkspaceForm: Navigating to members page with workspaceId:',
            workspaceId
          );
          // Navigate first, then close dialog
          router.push(`/workspace/${workspaceId}/members?invite=true`);
          // Close dialog after navigation
          setTimeout(() => {
            handleDialogOpenChange(false);
          }, 100);
        } else {
          handleDialogOpenChange(false);
        }
      } catch (err) {
        console.error('Failed to save workspace', err);
        setError(
          err instanceof Error ? err.message : 'Failed to save workspace'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [handleDialogOpenChange, iconFile, onSubmit, title, workspace?.id]
  );

  return (
    <>
      <GlassButton
        type='button'
        onClick={() => setOpen(true)}
        disabled={isLoading}
        size='icon'
        className='size-12 disabled:cursor-not-allowed'
      >
        <Plus className='size-6' />
      </GlassButton>

      <Drawer open={open} onOpenChange={handleDialogOpenChange}>
        <DrawerContent zIndex={150} maxHeight='85vh'>
          <DrawerHandle />

          <DrawerHeader className='px-6 pb-2 pt-0'>
            <DrawerTitle>
              {workspace ? 'Edit workspace' : 'Create workspace'}
            </DrawerTitle>
          </DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit} className='space-y-6 px-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='workspace-title'
                  className='text-sm font-medium text-text-secondary'
                >
                  Workspace name
                </label>
                <input
                  id='workspace-title'
                  type='text'
                  placeholder='Enter workspace name'
                  value={title}
                  onChange={event => handleTitleChange(event.target.value)}
                  disabled={isSubmitting}
                  autoComplete='organization'
                  autoFocus
                  className='w-full px-4 py-3 bg-surface-primary border border-border-default rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-border-default transition-all'
                />
              </div>

              <div className='space-y-3'>
                <label className='text-sm font-medium text-text-secondary'>
                  Workspace icon
                </label>
                <div className='flex items-center gap-4'>
                  <Avatar className='h-16 w-16 border border-border-default text-xl'>
                    {iconPreviewUrl ? (
                      <AvatarImage
                        src={iconPreviewUrl}
                        alt='Workspace icon preview'
                      />
                    ) : (
                      <AvatarFallback>{initials}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className='text-sm text-text-secondary flex-1'>
                    <p>Recommended: square image, at least 256×256px.</p>
                    <p>Supported formats: PNG or JPG.</p>
                  </div>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                  <GlassButton
                    type='button'
                    onClick={handleUploadClick}
                    disabled={isSubmitting || generatingIcon}
                    className='px-4 py-2'
                  >
                    {iconPreviewUrl ? 'Change icon' : 'Upload icon'}
                  </GlassButton>
                  <GlassButton
                    type='button'
                    onClick={handleGenerateIcon}
                    disabled={isSubmitting || generatingIcon}
                    className='px-4 py-2 gap-2'
                  >
                    <Sparkles className='w-4 h-4' />
                    {generatingIcon ? 'Generating…' : 'Generate icon'}
                  </GlassButton>
                  {iconPreviewUrl && iconFile && (
                    <GlassButton
                      type='button'
                      onClick={handleClearSelectedIcon}
                      disabled={isSubmitting || generatingIcon}
                      variant='ghost'
                      className='px-4 py-2'
                    >
                      Reset
                    </GlassButton>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleFileChange}
                />
                {iconError && (
                  <p className='text-sm text-red-600 dark:text-red-300'>
                    {iconError}
                  </p>
                )}
              </div>

              {error && (
                <div className='rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-200'>
                  {error}
                </div>
              )}
            </form>

            {/* DM section - only in create mode */}
            {isCreateMode && unconnectedMembers.length > 0 && (
              <div className='mt-6 px-4'>
                <div className='border-t border-border-default pt-5'>
                  <div className='flex items-center gap-2 mb-3'>
                    <MessageCircle className='w-3.5 h-3.5 text-text-muted' />
                    <h3 className='text-xs font-medium text-text-muted uppercase tracking-wider'>
                      Direct Message
                    </h3>
                  </div>
                  <div className='space-y-1'>
                    {unconnectedMembers.map(member => {
                      const profile = member.user_profile;
                      const isDmLoading = dmLoadingUserId === member.user_id;
                      const initial = profile?.name
                        ? profile.name.charAt(0).toUpperCase()
                        : null;

                      return (
                        <button
                          key={member.user_id}
                          onClick={() =>
                            member.user_id && handleDmSelect(member.user_id)
                          }
                          disabled={!!dmLoadingUserId}
                          className='w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-primary transition-colors disabled:opacity-50'
                        >
                          <Avatar className='h-10 w-10 border border-border-default bg-surface-primary text-sm'>
                            {profile?.avatar_url ? (
                              <AvatarImage
                                src={profile.avatar_url}
                                alt={profile.name ?? 'User'}
                              />
                            ) : (
                              <AvatarFallback className='bg-surface-primary text-text-secondary'>
                                {initial || <User className='w-4 h-4' />}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span className='text-text-primary text-sm font-medium flex-1 text-left'>
                            {profile?.name ?? 'Unknown'}
                          </span>
                          {isDmLoading && (
                            <Loader2 className='w-4 h-4 text-text-muted animate-spin' />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </DrawerBody>

          <DrawerFooter className='flex gap-3 px-4 pb-4'>
            <GlassButton
              type='button'
              onClick={() => handleDialogOpenChange(false)}
              disabled={isSubmitting}
              variant='ghost'
              className='flex-1'
            >
              Cancel
            </GlassButton>
            <GlassButton
              type='button'
              onClick={async () => {
                setError(null);
                const trimmedTitle = title.trim();
                if (!trimmedTitle) {
                  setError('Workspace name is required');
                  return;
                }
                setIsSubmitting(true);
                try {
                  const workspaceId = await onSubmit({
                    id: workspace?.id ?? null,
                    title: trimmedTitle,
                    iconFile,
                  });

                  console.log(
                    'WorkspaceForm (button): onSubmit returned workspaceId:',
                    workspaceId
                  );
                  console.log('WorkspaceForm (button): workspace:', workspace);
                  console.log(
                    'WorkspaceForm (button): isNewWorkspace:',
                    !workspace
                  );

                  // If creating a new workspace, navigate to members page
                  if (
                    !workspace &&
                    workspaceId &&
                    typeof workspaceId === 'number'
                  ) {
                    console.log(
                      'WorkspaceForm (button): Navigating to members page with workspaceId:',
                      workspaceId
                    );
                    // Navigate first, then close dialog
                    router.push(
                      `/workspace/${workspaceId}/members?invite=true`
                    );
                    // Close dialog after navigation
                    setTimeout(() => {
                      handleDialogOpenChange(false);
                    }, 100);
                  } else {
                    handleDialogOpenChange(false);
                  }
                } catch (err) {
                  console.error('Failed to save workspace', err);
                  console.error('Error type:', typeof err);
                  console.error('Error object:', err);

                  let errorMessage = 'Failed to save workspace';

                  if (err instanceof Error) {
                    errorMessage = err.message || errorMessage;
                  } else if (typeof err === 'object' && err !== null) {
                    // Supabase error structure: { message, details, hint, code }
                    const supabaseError = err as {
                      message?: string;
                      details?: string;
                      hint?: string;
                      code?: string;
                    };
                    if (supabaseError.message) {
                      errorMessage = supabaseError.message;
                    }
                    if (
                      supabaseError.details &&
                      !errorMessage.includes(supabaseError.details)
                    ) {
                      errorMessage += `: ${supabaseError.details}`;
                    }
                    console.error('Error code:', supabaseError.code);
                    console.error('Error hint:', supabaseError.hint);
                  } else {
                    errorMessage = String(err);
                  }

                  setError(errorMessage);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              disabled={isSubmitting || !title.trim()}
              className='flex-1'
            >
              {isSubmitting
                ? 'Saving…'
                : workspace
                  ? 'Save changes'
                  : 'Create workspace'}
            </GlassButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <WorkspaceIconCropDialog
        open={cropDialogOpen}
        onOpenChange={handleCropDialogOpenChange}
        imageSrc={selectedImageSrc}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
        onSave={handleIconSave}
        onCancel={handleIconCancel}
        saving={false}
        canSave={Boolean(selectedImageSrc && croppedAreaPixels)}
      />
    </>
  );
}
