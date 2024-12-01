import React from 'react';
import { clsx } from 'clsx';

interface MessageProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  onDismiss?: () => void;
}

export function Message({ message, type = 'info', onDismiss }: MessageProps) {
  return (
    <div
      className={clsx(
        "animate-fade-in flex items-center rounded-md px-2 py-1 text-xs",
        {
          'bg-blue-50 text-blue-700': type === 'info',
          'bg-green-50 text-green-700': type === 'success',
          'bg-yellow-50 text-yellow-700': type === 'warning',
          'bg-red-50 text-red-700': type === 'error',
        }
      )}
    >
      <span>{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-1.5 text-current opacity-60 hover:opacity-100"
        >
          ×
        </button>
      )}
    </div>
  );
}