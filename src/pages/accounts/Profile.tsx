import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export function Profile() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account information and preferences.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
        <p className="mt-1 text-sm text-gray-500">Update your personal details.</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Admin Access</h2>
            <p className="mt-1 text-sm text-gray-500">Access administrative features and settings.</p>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <ShieldCheck className="h-4 w-4" />
            Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
}