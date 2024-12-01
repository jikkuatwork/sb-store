import React from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, AppWindow, Tag, Users2, Wallet2, LineChart, FileText,
  Store, ArrowLeft
} from 'lucide-react';
import { clsx } from 'clsx';
import { AccountMenu } from './AccountMenu';
import { Breadcrumbs, type Breadcrumb } from './Breadcrumbs';

const adminItems = [
  { icon: Building2, label: 'Organisations', to: '/admin/organisations' },
  { icon: AppWindow, label: 'Apps', to: '/admin/apps' },
  { icon: Tag, label: 'Coupons', to: '/admin/coupons' },
  { icon: Users2, label: 'Affiliate', to: '/admin/affiliate' },
  { icon: Wallet2, label: 'Payments', to: '/admin/payments' },
  { icon: LineChart, label: 'Analytics', to: '/admin/analytics' },
  { icon: FileText, label: 'Pages', to: '/admin/pages' },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const getBreadcrumbs = (): Breadcrumb[] => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: Breadcrumb[] = [{ label: 'Admin', to: '/admin' }];

    if (paths.includes('organisations')) {
      breadcrumbs.push({ label: 'Organisations', to: '/admin/organisations' });
      
      // If we're on a specific organisation page
      if (paths.length > 2) {
        breadcrumbs.push({ label: 'Organisation Details' });
      }
    } else if (paths.includes('apps')) {
      breadcrumbs.push({ label: 'Apps' });
    } else if (paths.includes('coupons')) {
      breadcrumbs.push({ label: 'Coupons' });
    } else if (paths.includes('affiliate')) {
      breadcrumbs.push({ label: 'Affiliate' });
    } else if (paths.includes('payments')) {
      breadcrumbs.push({ label: 'Payments' });
    } else if (paths.includes('analytics')) {
      breadcrumbs.push({ label: 'Analytics' });
    } else if (paths.includes('pages')) {
      breadcrumbs.push({ label: 'Pages' });
    }

    return breadcrumbs;
  };

  const handleBack = () => {
    if (location.pathname.includes('/admin/organisations/')) {
      navigate('/admin/organisations');
    } else {
      navigate('/accounts');
    }
  };

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
          </nav>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex h-9 items-center gap-2 rounded-lg text-gray-600 transition-colors hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </button>
            <div className="h-4 w-px bg-gray-200" />
            <Breadcrumbs items={getBreadcrumbs()} />
          </div>

          <AccountMenu />
        </div>

        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}