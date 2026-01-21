/**
 * React hook for using native image picker in webview
 */

import { useEffect, useState, useCallback } from 'react';
import {
  initNativeImagePickerListener,
  pickNativeImageAsFile,
  pickNativeCameraAsFile,
  type NativeImageOptions,
} from '@/lib/nativeImagePicker';
import { isInMobileWebView } from '@/lib/platform';

export interface UseNativeImagePickerResult {
  /**
   * Whether the app is running in a mobile webview
   */
  isNativeAvailable: boolean;

  /**
   * Pick image from library
   */
  pickImage: (options?: NativeImageOptions) => Promise<File | File[]>;

  /**
   * Take photo with camera
   */
  takePhoto: (options?: NativeImageOptions) => Promise<File>;

  /**
   * Whether an operation is in progress
   */
  isLoading: boolean;

  /**
   * Last error that occurred
   */
  error: Error | null;
}

/**
 * Hook for using native image picker
 *
 * @example
 * ```typescript
 * function MyComponent() {
 *   const { isNativeAvailable, pickImage, takePhoto, isLoading } = useNativeImagePicker();
 *
 *   const handlePickImage = async () => {
 *     try {
 *       const file = await pickImage();
 *       // Use the file
 *     } catch (error) {
 *       console.error(error);
 *     }
 *   };
 *
 *   if (!isNativeAvailable) {
 *     // Use regular file input
 *     return <input type="file" />;
 *   }
 *
 *   return <button onClick={handlePickImage}>Pick Image</button>;
 * }
 * ```
 */
export function useNativeImagePicker(): UseNativeImagePickerResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isNativeAvailable] = useState(() => isInMobileWebView());

  // Initialize listener on mount
  useEffect(() => {
    if (!isNativeAvailable) return;

    const cleanup = initNativeImagePickerListener();
    return cleanup;
  }, [isNativeAvailable]);

  const pickImage = useCallback(async (options?: NativeImageOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await pickNativeImageAsFile(options);
      setIsLoading(false);
      return result;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Failed to pick image');
      setError(error);
      setIsLoading(false);
      throw error;
    }
  }, []);

  const takePhoto = useCallback(async (options?: NativeImageOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await pickNativeCameraAsFile(options);
      setIsLoading(false);
      return result;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Failed to take photo');
      setError(error);
      setIsLoading(false);
      throw error;
    }
  }, []);

  return {
    isNativeAvailable,
    pickImage,
    takePhoto,
    isLoading,
    error,
  };
}
