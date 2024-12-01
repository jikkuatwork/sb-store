import React from 'react';

export function Affiliate() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Affiliate Program</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage affiliate partners and track referrals.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-medium text-gray-900">Affiliate Partners</h2>
        <p className="mt-1 text-sm text-gray-500">View and manage affiliate relationships.</p>
      </div>
    </div>
  );
}