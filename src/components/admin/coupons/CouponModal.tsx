import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

export function CouponModal({ isOpen, onClose, onSubmit }: CouponModalProps) {
  const [amount, setAmount] = React.useState<number>(10);
  const [error, setError] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    if (amount > 50) {
      setError('Amount cannot exceed $50');
      return;
    }
    onSubmit(amount);
    onClose();
    setAmount(10);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md animate-fade-in rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Generate New Coupon</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Amount ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
                setError('');
              }}
              min="0"
              max="50"
              step="0.01"
              className={clsx(
                "block w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1",
                error
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
              )}
            />
            {error && (
              <div className="mt-1 flex items-center gap-1 text-xs text-red-500">
                <AlertCircle className="h-3 w-3" />
                {error}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Generate Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}