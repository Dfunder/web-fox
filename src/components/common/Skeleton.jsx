const borderRadiusMap = {
  md: '0.375rem',
  lg: '0.5rem',
  full: '9999px',
};

const Skeleton = ({
  width = '100%',
  height = '1rem',
  rounded = 'md',
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse shrink-0 ${className}`}
      style={{
        display: 'block',
        width,
        height,
        minHeight: height,
        borderRadius: borderRadiusMap[rounded] ?? borderRadiusMap.md,
        backgroundColor: '#cbd5e1',
      }}
    />
  );
};

export default Skeleton;