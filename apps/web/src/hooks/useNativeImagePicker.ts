'use client';

import { useEffect } from 'react';

interface NativeImageData {
  type: 'NATIVE_IMAGE_SELECTED';
  data: {
    uri: string;
    base64?: string;
    mimeType: string;
    fileName: string;
    width: number;
    height: number;
  };
}

/**
 * Hook to listen for images selected from native mobile image picker
 * and convert them to File objects for upload
 */
export function useNativeImagePicker(onImageSelected: (file: File) => void) {
  useEffect(() => {
    const handleNativeImage = async (event: MessageEvent) => {
      try {
        const data: NativeImageData = event.data;

        if (data.type === 'NATIVE_IMAGE_SELECTED' && data.data) {
          console.log('📱 Received native image:', data.data.fileName);

          const { base64, mimeType, fileName } = data.data;

          if (!base64) {
            console.error('No base64 data in native image');
            return;
          }

          // Convert base64 to Blob
          const byteString = atob(base64);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }

          const blob = new Blob([ab], { type: mimeType });

          // Convert Blob to File
          const file = new File([blob], fileName, { type: mimeType });

          console.log('✅ Converted native image to File:', file.name, file.size, 'bytes');

          // Call the callback with the file
          onImageSelected(file);
        }
      } catch (error) {
        console.error('Error processing native image:', error);
      }
    };

    window.addEventListener('message', handleNativeImage);

    return () => {
      window.removeEventListener('message', handleNativeImage);
    };
  }, [onImageSelected]);
}
