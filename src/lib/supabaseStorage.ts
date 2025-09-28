import { supabase } from './supabase';

export interface UploadOptions {
  contentType?: string;
  cacheControl?: string;
}

/**
 * Upload a file to Supabase Storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name (default: 'products')
 * @param path - The path within the bucket
 * @param options - Upload options
 * @returns Promise with upload result and public URL
 */
export const uploadFile = async (
  file: File,
  bucket: string = 'products',
  path?: string,
  options?: UploadOptions
): Promise<{ success: boolean; url?: string; error?: string }> => {
  if (!supabase) {
    return { success: false, error: 'Supabase client not initialized' };
  }

  try {
    // Generate unique filename if path not provided
    const fileName = path || `${Date.now()}_${file.name}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        contentType: options?.contentType || file.type,
        cacheControl: options?.cacheControl || '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return { success: false, error: error.message };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      success: true,
      url: urlData.publicUrl
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
 * Delete a file from Supabase Storage
 * @param bucket - The storage bucket name
 * @param path - The file path to delete
 * @returns Promise with success status
 */
export const deleteFile = async (
  bucket: string = 'products',
  path: string
): Promise<{ success: boolean; error?: string }> => {
  if (!supabase) {
    return { success: false, error: 'Supabase client not initialized' };
  }

  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return { success: false, error: error.message };
    }

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
 * Get public URL for a file
 * @param bucket - The storage bucket name
 * @param path - The file path
 * @returns Promise with public URL
 */
export const getFileURL = async (
  bucket: string = 'products',
  path: string
): Promise<{ url?: string; error?: string }> => {
  if (!supabase) {
    return { error: 'Supabase client not initialized' };
  }

  try {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return { url: data.publicUrl };
  } catch (error: any) {
    console.error('Error getting file URL:', error);
    return {
      error: error.message || 'Failed to get file URL'
    };
  }
};

/**
 * List files in a bucket/directory
 * @param bucket - The storage bucket name
 * @param path - Optional path prefix to filter files
 * @returns Promise with list of files
 */
export const listFiles = async (
  bucket: string = 'products',
  path?: string
): Promise<{ files?: any[]; error?: string }> => {
  if (!supabase) {
    return { error: 'Supabase client not initialized' };
  }

  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error('List error:', error);
      return { error: error.message };
    }

    return { files: data };
  } catch (error: any) {
    console.error('Error listing files:', error);
    return {
      error: error.message || 'Failed to list files'
    };
  }
};

/**
 * Create a storage bucket (admin function)
 * @param bucketName - Name of the bucket to create
 * @returns Promise with success status
 */
export const createBucket = async (
  bucketName: string
): Promise<{ success: boolean; error?: string }> => {
  if (!supabase) {
    return { success: false, error: 'Supabase client not initialized' };
  }

  try {
    const { error } = await supabase.storage.createBucket(bucketName, {
      public: true, // Make bucket public for easy access
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 5242880 // 5MB limit
    });

    if (error) {
      console.error('Create bucket error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error creating bucket:', error);
    return {
      success: false,
      error: error.message || 'Failed to create bucket'
    };
  }
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