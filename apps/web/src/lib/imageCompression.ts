// Constants for image compression
export const MAX_IMAGE_DIMENSION = 512; // Maximum width/height in pixels
export const MAX_FILE_SIZE = 500 * 1024; // 500KB in bytes
export const INITIAL_QUALITY = 0.85; // Initial JPEG quality (0-1)
export const MIN_QUALITY = 0.5; // Minimum quality before giving up

export interface ImageCompressionOptions {
  maxDimension?: number;
  maxSizeBytes?: number;
  initialQuality?: number;
  minQuality?: number;
}

/**
 * Compresses and resizes an image blob to meet size constraints
 * @param blob - The image blob to compress
 * @param options - Compression options
 * @returns Compressed image blob as JPEG
 */
export async function compressImageBlob(
  blob: Blob,
  options: ImageCompressionOptions = {}
): Promise<Blob> {
  const {
    maxDimension = MAX_IMAGE_DIMENSION,
    maxSizeBytes = MAX_FILE_SIZE,
    initialQuality = INITIAL_QUALITY,
    minQuality = MIN_QUALITY,
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      URL.revokeObjectURL(url);

      // Calculate new dimensions while maintaining aspect ratio
      let width = img.width;
      let height = img.height;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = (height / width) * maxDimension;
          width = maxDimension;
        } else {
          width = (width / height) * maxDimension;
          height = maxDimension;
        }
      }

      // Create canvas and draw resized image
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Unable to create canvas context'));
        return;
      }

      // Use high-quality image rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Try different quality levels until we meet size requirements
      const tryCompress = (quality: number): void => {
        canvas.toBlob(
          compressedBlob => {
            if (!compressedBlob) {
              reject(new Error('Failed to compress image'));
              return;
            }

            // If size is acceptable or we've hit minimum quality, return
            if (compressedBlob.size <= maxSizeBytes || quality <= minQuality) {
              resolve(compressedBlob);
              return;
            }

            // Reduce quality and try again
            const newQuality = Math.max(minQuality, quality - 0.1);
            tryCompress(newQuality);
          },
          'image/jpeg',
          quality
        );
      };

      // Start with initial quality
      tryCompress(initialQuality);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for compression'));
    };

    img.src = url;
  });
}
