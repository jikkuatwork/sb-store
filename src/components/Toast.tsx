import React from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 5000 }: ToastProps) {
  const [isExiting, setIsExiting] = React.useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 200); // Wait for animation to complete
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className={clsx(
      "fixed bottom-12 right-4 z-50",
      isExiting ? "animate-fade-out" : "animate-fade-in"
    )}>
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-lg">
        <p className="text-sm text-gray-700">{message}</p>
        <button
          onClick={handleClose}
          className="rounded-full p-0.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}