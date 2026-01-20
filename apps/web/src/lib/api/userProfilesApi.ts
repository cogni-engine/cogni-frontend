import { createClient } from '@/lib/supabase/browserClient';
import type { UserProfile, UserProfileUpdateInput } from '@/types/userProfile';
import { generateAvatarBlob } from '@/shared/utils/avatarGenerator';

const supabase = createClient();

const AVATAR_BUCKET = 'avatars';

function extractStoragePathFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split('/');
    const bucketIndex = parts.findIndex(part => part === AVATAR_BUCKET);
    if (bucketIndex === -1) return null;
    return parts.slice(bucketIndex + 1).join('/');
  } catch (error) {
    console.warn('Failed to parse avatar URL', error);
    return null;
  }
}

export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return data ?? null;
}

export async function createUserProfile(
  userId: string,
  email?: string
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({ id: userId })
    .select()
    .single();

  if (error) throw error;

  // Generate and upload default avatar
  try {
    const seed = email || userId;
    const avatarBlob = await generateAvatarBlob(seed, {
      style: 'cosmic',
      includeInitials: true,
    });

    const { avatarUrl } = await uploadUserAvatar(userId, avatarBlob);

    // Update profile with avatar URL
    return await updateUserProfile(userId, { avatar_url: avatarUrl });
  } catch (avatarError) {
    console.warn('Failed to generate default avatar:', avatarError);
    return data; // Return profile without avatar if generation fails
  }
}

export async function updateUserProfile(
  userId: string,
  updates: UserProfileUpdateInput
): Promise<UserProfile> {
  const payload = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('user_profiles')
    .update(payload)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function uploadUserAvatar(
  userId: string,
  file: File | Blob,
  previousAvatarUrl?: string | null
): Promise<{ avatarUrl: string; path: string }> {
  const fileExt = file instanceof File ? file.name.split('.').pop() : 'png';
  const extension = fileExt
    ? fileExt.replace(/[^a-zA-Z0-9]/g, '') || 'png'
    : 'png';
  const filePath = `${userId}/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath);

  if (previousAvatarUrl) {
    const oldPath = extractStoragePathFromUrl(previousAvatarUrl);
    if (oldPath) {
      void supabase.storage.from(AVATAR_BUCKET).remove([oldPath]);
    }
  }

  return { avatarUrl: publicUrl, path: filePath };
}

export async function removeUserAvatar(
  userId: string,
  currentAvatarUrl?: string | null
): Promise<UserProfile> {
  if (currentAvatarUrl) {
    const path = extractStoragePathFromUrl(currentAvatarUrl);
    if (path) {
      await supabase.storage.from(AVATAR_BUCKET).remove([path]);
    }
  }

  return updateUserProfile(userId, { avatar_url: null });
}

/**
 * Delete user account by calling the backend API
 * This will ban the user and set deleted_at timestamp
 */
export async function deleteUserAccount(userId: string): Promise<void> {
  const response = await fetch('/api/users/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to delete account: ${response.status} - ${errorText}`
    );
  }
}
