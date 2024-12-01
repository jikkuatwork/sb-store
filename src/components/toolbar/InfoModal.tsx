import React from 'react';
import { X, Store, Github, Twitter } from 'lucide-react';
import { clsx } from 'clsx';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: InfoModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm animate-fade-in rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">About Store</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
            <Store className="h-8 w-8 text-indigo-600" />
          </div>
          
          <div className="text-center">
            <h3 className="font-semibold text-gray-900">Store</h3>
            <p className="mt-1 text-sm text-gray-500">Version 1.0.0</p>
          </div>

          <div className="w-full rounded-lg border border-gray-100 bg-gray-50/50 p-3 text-center">
            <p className="text-sm font-medium text-gray-900">StoryBrain</p>
            <a 
              href="https://store.storybrain.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-xs text-indigo-600 hover:text-indigo-700"
            >
              store.storybrain.com
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              <Twitter className="h-3.5 w-3.5" />
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}