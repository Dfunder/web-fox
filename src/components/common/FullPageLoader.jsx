import Spinner from './Spinner';

const FullPageLoader = ({ className = '' }) => {
  return (
    <div
      aria-busy="true"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] ${className}`}
    >
      <Spinner className="text-white" size="lg" />
    </div>
  );
};

export default FullPageLoader;
