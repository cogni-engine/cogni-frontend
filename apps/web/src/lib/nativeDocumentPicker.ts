/**
 * Native Document Picker Bridge
 *
 * Utilities for triggering native document picker from webview
 * and handling the responses.
 */

import { isInMobileWebView } from './platform';

export interface NativeFileOptions {
  /**
   * MIME types to allow (e.g., ['application/pdf', 'text/*'])
   * Use 'all' for all file types
   */
  type?: string[];

  /**
   * Allow multiple file selection
   */
  multiple?: boolean;

  /**
   * Copy file to cache directory before reading
   */
  copyToCacheDirectory?: boolean;
}

export interface NativeFileData {
  uri: string;
  base64?: string;
  mimeType: string;
  fileName: string;
  fileSize?: number;
}

type PickerCallback = {
  resolve: (data: NativeFileData | NativeFileData[]) => void;
  reject: (error: Error) => void;
};

// Map to store pending requests
const pendingRequests = new Map<string, PickerCallback>();

// Generate unique request ID
function generateRequestId(): string {
  return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Convert base64 string to File object
 * (Same implementation as nativeImagePicker for consistency)
 */
function base64ToFile(
  base64: string,
  fileName: string,
  mimeType: string = 'application/octet-stream'
): File {
  // Remove data URL prefix if present
  const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;

  // Convert base64 to binary
  const byteString = atob(base64Data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  // Create blob and file
  const blob = new Blob([uint8Array], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
}

/**
 * Convert native file data to File object
 */
export function nativeFileToFile(fileData: NativeFileData): File {
  if (!fileData.base64) {
    throw new Error('File data does not contain base64');
  }

  return base64ToFile(fileData.base64, fileData.fileName, fileData.mimeType);
}

/**
 * Initialize message listener for native responses
 * Call this once when your app starts (in a useEffect or similar)
 */
export function initNativeDocumentPickerListener() {
  if (typeof window === 'undefined' || !isInMobileWebView()) {
    return () => {}; // No-op cleanup
  }

  const handleMessage = (event: MessageEvent) => {
    try {
      const message = JSON.parse(event.data);

      if (message.type === 'NATIVE_FILE_SELECTED' && message.requestId) {
        const callback = pendingRequests.get(message.requestId);
        if (callback) {
          callback.resolve(message.data);
          pendingRequests.delete(message.requestId);
        }
      } else if (message.type === 'NATIVE_FILE_CANCELED' && message.requestId) {
        const callback = pendingRequests.get(message.requestId);
        if (callback) {
          callback.reject(new Error('User canceled file selection'));
          pendingRequests.delete(message.requestId);
        }
      } else if (message.type === 'NATIVE_FILE_ERROR' && message.requestId) {
        const callback = pendingRequests.get(message.requestId);
        if (callback) {
          callback.reject(new Error(message.error || 'Unknown error'));
          pendingRequests.delete(message.requestId);
        }
      }
    } catch {
      // Not a JSON message or not for us, ignore
    }
  };

  window.addEventListener('message', handleMessage);

  // Return cleanup function
  return () => {
    window.removeEventListener('message', handleMessage);
  };
}

/**
 * Request native document picker
 */
export function pickNativeFile(
  options: NativeFileOptions = {}
): Promise<NativeFileData | NativeFileData[]> {
  if (!isInMobileWebView()) {
    return Promise.reject(new Error('Not in mobile webview'));
  }

  const requestId = generateRequestId();

  return new Promise((resolve, reject) => {
    // Store callback
    pendingRequests.set(requestId, { resolve, reject });

    // Send message to native
    const message = {
      type: 'PICK_FILE',
      requestId,
      options,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).ReactNativeWebView) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).ReactNativeWebView.postMessage(JSON.stringify(message));
    } else {
      reject(new Error('ReactNativeWebView not found'));
      pendingRequests.delete(requestId);
    }

    // Timeout after 60 seconds
    setTimeout(() => {
      if (pendingRequests.has(requestId)) {
        reject(new Error('File picker timeout'));
        pendingRequests.delete(requestId);
      }
    }, 60000);
  });
}

/**
 * Pick file and convert to File (convenience function)
 */
export async function pickNativeFileAsFile(
  options: NativeFileOptions = {}
): Promise<File | File[]> {
  const result = await pickNativeFile(options);

  if (Array.isArray(result)) {
    return result.map(nativeFileToFile);
  }

  return nativeFileToFile(result);
}
