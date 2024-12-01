import React from 'react';
import { Camera, X } from 'lucide-react';
import { clsx } from 'clsx';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
  aspectRatio?: 'square' | 'cover';
  shape?: 'square' | 'circle';
}

export function ImageUploader({ 
  value, 
  onChange, 
  className,
  aspectRatio = 'square',
  shape = 'square'
}: ImageUploaderProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server
      // For demo, we'll create an object URL
      const url = URL.createObjectURL(file);
      onChange(url);
    }
  };

  return (
    <div className={clsx(
      'relative overflow-hidden bg-gray-50',
      shape === 'circle' ? 'rounded-full' : 'rounded-lg',
      aspectRatio === 'cover' ? 'aspect-[2/1]' : 'aspect-square',
      className
    )}>
      {value ? (
        <>
          <img
            src={value}
            alt="Uploaded"
            className={clsx(
              'h-full w-full object-cover',
              shape === 'circle' ? 'rounded-full' : 'rounded-lg'
            )}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className={clsx(
              "absolute p-1 text-gray-500 shadow-sm transition-colors hover:text-gray-700",
              shape === 'circle' 
                ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                : "right-2 top-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={clsx(
            "flex h-full w-full flex-col items-center justify-center border-2 border-dashed border-gray-200 text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-500",
            shape === 'circle' ? 'rounded-full' : 'rounded-lg'
          )}
        >
          <Camera className="h-5 w-5" />
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}