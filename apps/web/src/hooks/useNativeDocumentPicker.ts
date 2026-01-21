/**
 * React hook for using native document picker in webview
 */

import { useEffect, useState, useCallback } from 'react';
import {
  initNativeDocumentPickerListener,
  pickNativeFileAsFile,
  type NativeFileOptions,
} from '@/lib/nativeDocumentPicker';
import { isInMobileWebView } from '@/lib/platform';

export interface UseNativeDocumentPickerResult {
  /**
   * Whether the app is running in a mobile webview
   */
  isNativeAvailable: boolean;

  /**
   * Pick file(s) from device
   */
  pickFile: (options?: NativeFileOptions) => Promise<File | File[]>;

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
 * Hook for using native document picker
 *
 * @example
 * ```typescript
 * function MyComponent() {
 *   const { isNativeAvailable, pickFile, isLoading } = useNativeDocumentPicker();
 *
 *   const handlePickFile = async () => {
 *     try {
 *       const file = await pickFile();
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
 *   return <button onClick={handlePickFile}>Pick File</button>;
 * }
 * ```
 */
export function useNativeDocumentPicker(): UseNativeDocumentPickerResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isNativeAvailable] = useState(() => isInMobileWebView());

  // Initialize listener on mount
  useEffect(() => {
    if (!isNativeAvailable) return;

    const cleanup = initNativeDocumentPickerListener();
    return cleanup;
  }, [isNativeAvailable]);

  const pickFile = useCallback(async (options?: NativeFileOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await pickNativeFileAsFile(options);
      setIsLoading(false);
      return result;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Failed to pick file');
      setError(error);
      setIsLoading(false);
      throw error;
    }
  }, []);

  return {
    isNativeAvailable,
    pickFile,
    isLoading,
    error,
  };
}
