import Spinner from './Spinner';

const ButtonSpinner = ({ className = '' }) => {
  return <Spinner className={`text-current ${className}`} size="sm" />;
};

export default ButtonSpinner;
