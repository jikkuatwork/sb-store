import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  User, BarChart2, CreditCard, Shield, Store, ArrowLeft,
  Users, AppWindow, Tag, Users2, Wallet2, LineChart, FileText
} from 'lucide-react';
import { clsx } from 'clsx';
import { AccountMenu } from './AccountMenu';
import { useAdminContext } from '../contexts/AdminContext';

const navItems = [
  { icon: User, label: 'Profile', to: '/accounts/profile' },
  { icon: BarChart2, label: 'Usage', to: '/accounts/usage' },
  { icon: CreditCard, label: 'Billing', to: '/accounts/billing' },
  { icon: Shield, label: 'Security', to: '/accounts/settings' },
];

const adminItems = [
  { icon: Users, label: 'Users', to: '/accounts/admin/users' },
  { icon: AppWindow, label: 'Apps', to: '/accounts/admin/apps' },
  { icon: Tag, label: 'Coupons', to: '/accounts/admin/coupons' },
  { icon: Users2, label: 'Affiliate', to: '/accounts/admin/affiliate' },
  { icon: Wallet2, label: 'Payments', to: '/accounts/admin/payments' },
  { icon: LineChart, label: 'Analytics', to: '/accounts/admin/analytics' },
  { icon: FileText, label: 'Pages', to: '/accounts/admin/pages' },
];

export function AccountLayout() {
  const navigate = useNavigate();
  const { isAdmin } = useAdminContext();

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0 border-r border-gray-200 bg-white">
        <div className="flex h-full flex-col">
          <Link 
            to="/"
            className="flex flex-col items-center gap-2 border-b border-gray-100 p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <Store className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Store</h2>
          </Link>

          <nav className="flex-1 space-y-1 p-4">
            {navItems.map(({ icon: Icon, label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}

            {isAdmin && (
              <>
                <div className="my-4 flex items-center gap-2">
                  <div className="h-px flex-1 bg-gray-100" />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">Admin</span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>

                {adminItems.map(({ icon: Icon, label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      clsx(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </NavLink>
                ))}
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex h-14 items-center border-b border-gray-200 bg-white px-4">
          <button
            onClick={() => navigate('/')}
            className="flex h-9 items-center gap-2 rounded-lg text-gray-600 transition-colors hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </button>

          <div className="flex-1" />
          
          <AccountMenu />
        </div>

        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}