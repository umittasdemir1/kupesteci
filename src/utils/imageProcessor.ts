/**
 * Processes an image file: Converts to WebP, resizes if too large, and compresses it.
 * @param file The original image file
 * @param quality Compression quality (0 to 1)
 * @param maxDimension Maximum width or height for the image (default 1920)
 * @returns A promise that resolves to a Blob of the processed image
 */
export async function processImage(
    file: File,
    quality: number = 0.8,
    maxDimension: number = 2000
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.src = objectUrl;

        img.onload = () => {
            // Revoke immediately to free memory
            URL.revokeObjectURL(objectUrl);

            let width = img.width;
            let height = img.height;

            // Calculate new dimensions if image exceeds maxDimension
            if (width > maxDimension || height > maxDimension) {
                if (width > height) {
                    height = Math.round((height * maxDimension) / width);
                    width = maxDimension;
                } else {
                    width = Math.round((width * maxDimension) / height);
                    height = maxDimension;
                }
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { alpha: false }); // Disable alpha for better performance if possible

            if (!ctx) {
                reject(new Error('Canvas context could not be created'));
                return;
            }

            canvas.width = width;
            canvas.height = height;

            // Use image smoothing for better quality when resizing
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Draw image with calculated dimensions
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to WebP and compress
            canvas.toBlob(
                (blob) => {
                    // Cleanup
                    canvas.width = 0;
                    canvas.height = 0;

                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Canvas to Blob conversion failed'));
                    }
                },
                'image/webp',
                quality
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('Image loading failed'));
        };
    });
}
