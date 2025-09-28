import React, { useRef, useState } from 'react';
import { Upload, X, FileImage, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useFileUpload } from '../hooks/useFileUpload';

interface FileUploadProps {
  onUploadSuccess?: (url: string, fileName: string) => void;
  onUploadError?: (error: string) => void;
  maxSizeInMB?: number;
  allowedTypes?: string[];
  path?: string;
  className?: string;
  showPreview?: boolean;
  currentImageUrl?: string;
  label?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUploadSuccess,
  onUploadError,
  maxSizeInMB = 5,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  path = 'products',
  className = '',
  showPreview = true,
  currentImageUrl,
  label = 'Upload Image'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { upload, isUploading, progress, error, resetError } = useFileUpload({
    maxSizeInMB,
    allowedTypes,
    path
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      resetError();

      // Create preview URL
      if (showPreview && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const result = await upload(selectedFile);

    if (result.success && result.url) {
      onUploadSuccess?.(result.url, selectedFile.name);
      setSelectedFile(null);
      // Keep the preview URL for successful uploads
    } else {
      onUploadError?.(result.error || 'Upload failed');
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(currentImageUrl || null);
    resetError();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept={allowedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />

        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          disabled={isUploading}
          className="w-full h-24 border-2 border-dashed border-gray-300 hover:border-amber-400 hover:bg-amber-50 transition-colors"
        >
          <div className="flex flex-col items-center gap-2">
            {isUploading ? (
              <Upload className="w-6 h-6 text-amber-500" />
            ) : (
              <Upload className="w-6 h-6 text-gray-400" />
            )}
            <span className="text-sm text-gray-600">
              {selectedFile ? selectedFile.name : label}
            </span>
            <span className="text-xs text-gray-400">
              Max {maxSizeInMB}MB • {allowedTypes.join(', ')}
            </span>
          </div>
        </Button>
      </div>

      {/* Preview */}
      {showPreview && previewUrl && (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          {selectedFile && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="absolute top-2 right-2"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-600 text-center">
            Uploading... {progress}%
          </p>
        </div>
      )}

      {/* Upload Button for Selected File */}
      {selectedFile && !isUploading && (
        <Button
          type="button"
          onClick={handleUpload}
          className="w-full bg-amber-500 hover:bg-amber-600"
        >
          <FileImage className="w-4 h-4 mr-2" />
          Upload Image
        </Button>
      )}

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};