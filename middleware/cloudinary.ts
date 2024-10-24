import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret',
});

// Function to upload files to Cloudinary
export const uploadFileToCloudinary = async (fileBuffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' }, // Automatically detect resource type (image/video)
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(new Error('Error uploading to Cloudinary'));
        }
        if (result) {
          resolve(result.secure_url); // Return the secure URL of the uploaded file
        } else {
          reject(new Error('Upload failed: No result returned'));
        }
      }
    );

    // Create a readable stream from the buffer and pipe it to Cloudinary
    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null); // End of stream
    readableStream.pipe(uploadStream);
  });
};

export default cloudinary;
