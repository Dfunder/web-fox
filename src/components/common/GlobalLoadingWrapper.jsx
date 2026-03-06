import { useSelector } from 'react-redux';
import Spinner from './Spinner';

const selectIsAnyLoading = (state) =>
  state.auth.isLoading ||
  state.campaigns.loading ||
  state.donations.loading ||
  state.dashboard.loading;

const GlobalLoadingWrapper = ({ children }) => {
  const isReduxLoading = useSelector(selectIsAnyLoading);

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
