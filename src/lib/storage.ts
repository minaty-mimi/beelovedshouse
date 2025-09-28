import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage';
import { storage } from './firebase';

export interface UploadOptions {
  contentType?: string;
  customMetadata?: Record<string, string>;
}

/**
 * Upload a file to Firebase Storage
 * @param file - The file to upload
 * @param path - The path where to store the file (e.g., 'products/image.jpg')
 * @param options - Upload options
 * @returns Promise with upload result and download URL
 */
export const uploadFile = async (
  file: File,
  path: string,
  options?: UploadOptions
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    const storageRef = ref(storage, path);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: options?.contentType || file.type,
      customMetadata: options?.customMetadata
    });

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      success: true,
      url: downloadURL
    };
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return {
      success: false,
      error: error.message || 'Failed to upload file'
    };
  }
};

/**
 * Delete a file from Firebase Storage
 * @param path - The path of the file to delete
 * @returns Promise with success status
 */
export const deleteFile = async (path: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting file:', error);
    return {
      success: false,
      error: error.message || 'Failed to delete file'
    };
  }
};

/**
 * Get download URL for a file
 * @param path - The path of the file
 * @returns Promise with download URL
 */
export const getFileURL = async (path: string): Promise<{ url?: string; error?: string }> => {
  try {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);

    return { url };
  } catch (error: any) {
    console.error('Error getting file URL:', error);
    return {
      error: error.message || 'Failed to get file URL'
    };
  }
};

/**
 * List all files in a directory
 * @param path - The directory path to list
 * @returns Promise with list of files
 */
export const listFiles = async (path: string): Promise<{ files?: string[]; error?: string }> => {
  try {
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);

    const files = result.items.map(item => item.fullPath);

    return { files };
  } catch (error: any) {
    console.error('Error listing files:', error);
    return {
      error: error.message || 'Failed to list files'
    };
  }
};

/**
 * Generate a unique filename
 * @param originalName - Original filename
 * @param prefix - Optional prefix for the filename
 * @returns Unique filename with timestamp
 */
export const generateUniqueFilename = (originalName: string, prefix = ''): string => {
  const timestamp = Date.now();
  const extension = originalName.split('.').pop();
  const baseName = originalName.replace(`.${extension}`, '');

  return `${prefix}${baseName}_${timestamp}.${extension}`;
};

/**
 * Validate file type
 * @param file - File to validate
 * @param allowedTypes - Array of allowed MIME types
 * @returns Boolean indicating if file type is allowed
 */
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

/**
 * Validate file size
 * @param file - File to validate
 * @param maxSizeInMB - Maximum file size in MB
 * @returns Boolean indicating if file size is within limit
 */
export const validateFileSize = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};