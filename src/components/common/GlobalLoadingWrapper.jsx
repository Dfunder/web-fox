import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

const isDashboardRoute = (pathname) => pathname.startsWith('/dashboard');

const GlobalLoadingWrapper = ({ children }) => {
  const { pathname } = useLocation();
  const onDashboard = isDashboardRoute(pathname);

  const isReduxLoading = useSelector((state) => {
    if (onDashboard) {
      return state.campaigns.isLoading || state.donations.loading;
    }

    return (
      state.auth.isLoading ||
      state.campaigns.isLoading ||
      state.donations.loading ||
      state.dashboard.isLoading
    );
  });

  return (
    <>
      {children}
      {isReduxLoading && (
        <div
          aria-busy="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm"
        >
          <Spinner size="lg" className="text-accent" />
        </div>
      )}
    </>
  );
};

export default GlobalLoadingWrapper;