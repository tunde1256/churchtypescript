"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
// Cloudinary configuration
cloudinary_1.v2.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret',
});
// Function to upload files to Cloudinary
const uploadFileToCloudinary = (fileBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ resource_type: 'auto' }, // Automatically detect resource type (image/video)
        (error, result) => {
            if (error) {
                console.error('Cloudinary upload error:', error);
                return reject(new Error('Error uploading to Cloudinary'));
            }
            if (result) {
                resolve(result.secure_url); // Return the secure URL of the uploaded file
            }
            else {
                reject(new Error('Upload failed: No result returned'));
            }
        });
        // Create a readable stream from the buffer and pipe it to Cloudinary
        const readableStream = new stream_1.Readable();
        readableStream.push(fileBuffer);
        readableStream.push(null); // End of stream
        readableStream.pipe(uploadStream);
    });
});
exports.uploadFileToCloudinary = uploadFileToCloudinary;
exports.default = cloudinary_1.v2;
