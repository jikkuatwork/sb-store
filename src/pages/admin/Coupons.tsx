import React from 'react';
import { Ticket } from 'lucide-react';
import { CouponModal } from '../../components/admin/coupons/CouponModal';
import { CouponsTable } from '../../components/admin/coupons/CouponsTable';
import { UserDetailsModal } from '../../components/admin/coupons/UserDetailsModal';
import { generateCouponCode } from '../../utils/coupon';
import type { Coupon, User } from '../../types/coupon';

// Sample data - in a real app, this would come from an API
const initialCoupons: Coupon[] = [
  {
    id: '1',
    code: 'sb-abc-def-ghi',
    amount: 25,
    created_at: '2024-03-10T10:00:00Z',
    availed_on: '2024-03-11T15:30:00Z',
    user_id: '1'
  },
  {
    id: '2',
    code: 'sb-jkl-mno-pqr',
    amount: 15,
    created_at: '2024-03-12T14:20:00Z'
  },
  {
    id: '3',
    code: 'sb-stu-vwx-yz1',
    amount: 10,
    created_at: '2024-03-13T09:45:00Z',
    revoked: true
  }
];

export function Coupons() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [coupons, setCoupons] = React.useState<Coupon[]>(initialCoupons);

  const handleGenerateCoupon = (amount: number) => {
    const newCoupon: Coupon = {
      id: Math.random().toString(36).substr(2, 9),
      code: generateCouponCode(),
      amount,
      created_at: new Date().toISOString()
    };
    setCoupons(prev => [newCoupon, ...prev]);
  };

  const handleRevokeCoupon = (couponId: string) => {
    if (window.confirm('Are you sure you want to revoke this coupon?')) {
      setCoupons(prev => prev.map(coupon => 
        coupon.id === couponId ? { ...coupon, revoked: true } : coupon
      ));
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Coupon Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Generate and manage promotional coupons.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Active Coupons</h2>
            <p className="mt-1 text-sm text-gray-500">View and manage promotional codes.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <Ticket className="h-4 w-4" />
            Generate Coupon
          </button>
        </div>
        <div className="p-6">
          <CouponsTable
            coupons={coupons}
            onShowUser={setSelectedUser}
            onRevoke={handleRevokeCoupon}
          />
        </div>
      </div>

      <CouponModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleGenerateCoupon}
      />

      {selectedUser && (
        <UserDetailsModal
          isOpen={true}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
        />
      )}
    </div>
  );
}