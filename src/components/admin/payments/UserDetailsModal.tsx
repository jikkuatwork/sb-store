import React from 'react';
import { X, Mail, Calendar, CreditCard, DollarSign } from 'lucide-react';
import { formatDateTime } from '../../../utils/formatters';
import type { PaymentUser } from '../../../types/payment';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: PaymentUser;
}

export function UserDetailsModal({ isOpen, onClose, user }: UserDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md animate-fade-in rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">User Details</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
            <span className="text-xl font-medium text-indigo-600">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <div>
            <h3 className="font-medium text-gray-900">{user.name}</h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <Mail className="h-4 w-4" />
              {user.email}
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {formatDateTime(user.added_on)}
            </div>
            {user.payment_method && (
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                <CreditCard className="h-4 w-4" />
                {user.payment_method.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </div>
            )}
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <DollarSign className="h-4 w-4" />
              Total Spent: ${user.total_spent.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center justify-end border-t border-gray-100 pt-4">
            <button
              onClick={onClose}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}