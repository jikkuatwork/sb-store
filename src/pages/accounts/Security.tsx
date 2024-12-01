import React from 'react';

export function Security() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Security Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account security and authentication settings.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-medium text-gray-900">Password</h2>
        <p className="mt-1 text-sm text-gray-500">Update your password and security preferences.</p>
      </div>
    </div>
  );
}