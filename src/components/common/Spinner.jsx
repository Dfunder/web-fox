const sizeClassMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-4',
};

const Spinner = ({ size = 'md', className = '' }) => {
  const spinnerSizeClass = sizeClassMap[size] || sizeClassMap.md;

  return (
    <span
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-solid border-current border-t-transparent ${spinnerSizeClass} ${className}`}
      role="status"
    />
  );
};

export default Spinner;
