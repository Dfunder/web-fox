import { useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

const selectIsAnyLoading = (state) =>
  state.auth.isLoading ||
  state.campaigns.loading ||
  state.donations.loading ||
  state.dashboard.loading;

const GlobalLoadingWrapper = ({ children }) => {
  const navigation = useNavigation();
  const isReduxLoading = useSelector(selectIsAnyLoading);

  const isLoading = navigation.state !== 'idle' || isReduxLoading;

  return (
    <>
      {children}
      {isLoading && (
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
