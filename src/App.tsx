import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ModelsPage } from './pages/ModelsPage';
import { AccountLayout } from './components/AccountLayout';
import { AdminLayout } from './components/AdminLayout';
import { Profile } from './pages/accounts/Profile';
import { Usage } from './pages/accounts/Usage';
import { Billing } from './pages/accounts/Billing';
import { Security } from './pages/accounts/Security';
import { Organisations } from './pages/admin/Organisations';
import { OrganisationDetail } from './pages/admin/OrganisationDetail';
import { Apps } from './pages/admin/Apps';
import { Coupons } from './pages/admin/Coupons';
import { Affiliate } from './pages/admin/Affiliate';
import { Payments } from './pages/admin/Payments';
import { Analytics } from './pages/admin/Analytics';
import { Pages } from './pages/admin/Pages';
import { PageDetail } from './pages/admin/PageDetail';
import { Toolbar } from './components/toolbar/Toolbar';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ModelsPage />} />
        <Route path="/accounts" element={<AccountLayout />}>
          <Route index element={<Navigate to="/accounts/profile" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="usage" element={<Usage />} />
          <Route path="billing" element={<Billing />} />
          <Route path="settings" element={<Security />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/organisations" replace />} />
          <Route path="organisations" element={<Organisations />} />
          <Route path="organisations/:id" element={<OrganisationDetail />} />
          <Route path="apps" element={<Apps />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="affiliate" element={<Affiliate />} />
          <Route path="payments" element={<Payments />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="pages" element={<Pages />} />
          <Route path="pages/:id" element={<PageDetail />} />
        </Route>
      </Routes>
      <Toolbar />
    </>
  );
}