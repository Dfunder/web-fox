import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center animate-fade-in">
      <div className="max-w-md w-full">
        <p className="text-[9rem] font-bold leading-none text-accent select-none">
          404
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-primary">
          Page Not Found
        </h1>

        <p className="mt-3 text-slate-500 text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Check the URL or head back home.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent hover:bg-indigo-600 active:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-150"
          >
            Go Back Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 active:bg-slate-100 text-primary font-medium px-6 py-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors duration-150"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
