/**
 * Native Image Picker Bridge
 *
 * Utilities for triggering native image/camera picker from webview
 * and handling the responses.
 */

import { isInMobileWebView } from './platform';

export interface NativeImageOptions {
  /**
   * Media types to allow ('images', 'videos', or both)
   */
  mediaTypes?: ('images' | 'videos')[];

  /**
   * Allow editing after selection
   */
  allowsEditing?: boolean;

  /**
   * Image quality (0-1)
   */
  quality?: number;

  /**
   * Allow multiple selection
   */
  multiple?: boolean;
}

export interface NativeImageData {
  uri: string;
  base64?: string;
  mimeType: string;
  fileName: string;
  width: number;
  height: number;
  fileSize?: number;
}

type PickerCallback = {
  resolve: (data: NativeImageData | NativeImageData[]) => void;
  reject: (error: Error) => void;
};

// Map to store pending requests
const pendingRequests = new Map<string, PickerCallback>();

// Generate unique request ID
function generateRequestId(): string {
  return `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Convert base64 string to File object
 */
export function base64ToFile(
  base64: string,
  fileName: string,
  mimeType: string = 'image/jpeg'
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
 * Convert native image data to File object
 */
export function nativeImageToFile(imageData: NativeImageData): File {
  if (!imageData.base64) {
    throw new Error('Image data does not contain base64');
  }

  return base64ToFile(imageData.base64, imageData.fileName, imageData.mimeType);
}

/**
 * Initialize message listener for native responses
 * Call this once when your app starts (in a useEffect or similar)
 */
export function initNativeImagePickerListener() {
  if (typeof window === 'undefined' || !isInMobileWebView()) {
    return () => {}; // No-op cleanup
  }

  const handleMessage = (event: MessageEvent) => {
    try {
      const message = JSON.parse(event.data);

      if (message.type === 'NATIVE_IMAGE_SELECTED' && message.requestId) {
        const callback = pendingRequests.get(message.requestId);
        if (callback) {
          callback.resolve(message.data);
          pendingRequests.delete(message.requestId);
        }
      } else if (
        message.type === 'NATIVE_IMAGE_CANCELED' &&
        message.requestId
      ) {
        const callback = pendingRequests.get(message.requestId);
        if (callback) {
          callback.reject(new Error('User canceled image selection'));
          pendingRequests.delete(message.requestId);
        }
      } else if (message.type === 'NATIVE_IMAGE_ERROR' && message.requestId) {
        const callback = pendingRequests.get(message.requestId);
        if (callback) {
          callback.reject(new Error(message.error || 'Unknown error'));
          pendingRequests.delete(message.requestId);
        }
      }
    } catch (error) {
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
 * Request native image picker (photo library)
 */
export function pickNativeImage(
  options: NativeImageOptions = {}
): Promise<NativeImageData | NativeImageData[]> {
  if (!isInMobileWebView()) {
    return Promise.reject(new Error('Not in mobile webview'));
  }

  const requestId = generateRequestId();

  return new Promise((resolve, reject) => {
    // Store callback
    pendingRequests.set(requestId, { resolve, reject });

    // Send message to native
    const message = {
      type: 'PICK_IMAGE',
      requestId,
      options,
    };

    if ((window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView.postMessage(JSON.stringify(message));
    } else {
      reject(new Error('ReactNativeWebView not found'));
      pendingRequests.delete(requestId);
    }

    // Timeout after 60 seconds
    setTimeout(() => {
      if (pendingRequests.has(requestId)) {
        reject(new Error('Image picker timeout'));
        pendingRequests.delete(requestId);
      }
    }, 60000);
  });
}

/**
 * Request native camera
 */
export function pickNativeCamera(
  options: NativeImageOptions = {}
): Promise<NativeImageData | NativeImageData[]> {
  if (!isInMobileWebView()) {
    return Promise.reject(new Error('Not in mobile webview'));
  }

  const requestId = generateRequestId();

  return new Promise((resolve, reject) => {
    // Store callback
    pendingRequests.set(requestId, { resolve, reject });

    // Send message to native
    const message = {
      type: 'PICK_CAMERA',
      requestId,
      options,
    };

    if ((window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView.postMessage(JSON.stringify(message));
    } else {
      reject(new Error('ReactNativeWebView not found'));
      pendingRequests.delete(requestId);
    }

    // Timeout after 60 seconds
    setTimeout(() => {
      if (pendingRequests.has(requestId)) {
        reject(new Error('Camera timeout'));
        pendingRequests.delete(requestId);
      }
    }, 60000);
  });
}

/**
 * Pick image and convert to File (convenience function)
 */
export async function pickNativeImageAsFile(
  options: NativeImageOptions = {}
): Promise<File | File[]> {
  const result = await pickNativeImage(options);

  if (Array.isArray(result)) {
    return result.map(nativeImageToFile);
  }

  return nativeImageToFile(result);
}

/**
 * Take photo and convert to File (convenience function)
 */
export async function pickNativeCameraAsFile(
  options: NativeImageOptions = {}
): Promise<File> {
  const result = await pickNativeCamera(options);

  // Camera always returns a single image, but handle array just in case
  if (Array.isArray(result)) {
    return nativeImageToFile(result[0]);
  }

  return nativeImageToFile(result);
}

/**
 * Show native image picker with choice dialog (library or camera)
 * Returns whichever the user chooses
 */
export async function showNativeImagePickerDialog(
  options: NativeImageOptions = {}
): Promise<File | File[]> {
  // For now, just show the library picker
  // In the future, could show a native dialog to choose between library/camera
  return pickNativeImageAsFile(options);
}
