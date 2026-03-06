import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';
import GlobalLoadingWrapper from '../components/common/GlobalLoadingWrapper';
import Spinner from '../components/common/Spinner';
import NotFound from '../pages/NotFound';
import ErrorTest from '../components/common/ErrorTest';
import AdminRoute from './AdminRoute';

// Auth pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import VerifyEmailPage from '../pages/auth/VerifyEmailPage';

// Lazy-loaded pages
const Home = lazy(() => import('../pages/Home'));
const Explore = lazy(() => import('../pages/Explore'));
const CampaignDetails = lazy(() => import('../pages/CampaignDetails'));
const CreateCampaign = lazy(() => import('../pages/CreateCampaign'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Admin = lazy(() => import('../pages/Admin'));

const SuspenseFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <Spinner size="lg" className="text-accent" />
  </div>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <GlobalLoadingWrapper>
        <Suspense fallback={<SuspenseFallback />}>
          <Routes>

            {/* Public pages with Navbar + Footer */}
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="explore" element={<Explore />} />
              <Route path="campaign/:id" element={<CampaignDetails />} />
              <Route path="create" element={<CreateCampaign />} />
              <Route path="test-error" element={<ErrorTest />} />
            </Route>

            {/* Auth pages (no layout if desired) */}
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="verify-email/:token" element={<VerifyEmailPage />} />

            {/* App pages */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Suspense>
      </GlobalLoadingWrapper>
    </BrowserRouter>
  );
};

export default AppRouter;