import { useState, useCallback } from 'react';
import { uploadFile, deleteFile, validateFileType, validateFileSize } from '../lib/supabaseStorage';

interface UseFileUploadOptions {
  maxSizeInMB?: number;
  allowedTypes?: string[];
  path?: string;
}

interface UseFileUploadReturn {
  upload: (file: File, customPath?: string) => Promise<{ success: boolean; url?: string; error?: string }>;
  delete: (path: string) => Promise<{ success: boolean; error?: string }>;
  isUploading: boolean;
  progress: number;
  error: string | null;
  resetError: () => void;
}

/**
 * Custom hook for file uploads to Supabase Storage
 */
export const useFileUpload = (options: UseFileUploadOptions = {}): UseFileUploadReturn => {
  const {
    maxSizeInMB = 5,
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    path = 'products'
  } = options;

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const upload = useCallback(async (
    file: File,
    customPath?: string
  ): Promise<{ success: boolean; url?: string; error?: string }> => {
    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Validate file type
      if (!validateFileType(file, allowedTypes)) {
        const errorMsg = `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`;
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      // Validate file size
      if (!validateFileSize(file, maxSizeInMB)) {
        const errorMsg = `File too large. Maximum size: ${maxSizeInMB}MB`;
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      setProgress(25);

      // Upload file (Supabase Storage handles filename generation)
      const result = await uploadFile(file, path, customPath);

      setProgress(100);

      if (!result.success) {
        setError(result.error || 'Upload failed');
      }

      return result;
    } catch (err: any) {
      const errorMsg = err.message || 'Upload failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsUploading(false);
    }
  }, [maxSizeInMB, allowedTypes, path]);

  const deleteFileFromStorage = useCallback(async (filePath: string) => {
    setError(null);

    try {
      // Extract filename from path for Supabase Storage
      const fileName = filePath.split('/').pop() || filePath;
      const result = await deleteFile(path, fileName);

      if (!result.success) {
        setError(result.error || 'Delete failed');
      }

      return result;
    } catch (err: any) {
      const errorMsg = err.message || 'Delete failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, [path]);

  return {
    upload,
    delete: deleteFileFromStorage,
    isUploading,
    progress,
    error,
    resetError
  };
};