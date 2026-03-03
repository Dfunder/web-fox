import { Outlet, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            color: '#0F172A',
            borderRadius: '8px',
            boxShadow:
              '0 10px 15px -3px rgba(15,23,42,0.1), 0 4px 6px -4px rgba(15,23,42,0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#ffffff',
            },
            style: {
              borderColor: '#10B981',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#ffffff',
            },
            style: {
              borderColor: '#EF4444',
            },
          },
          loading: {
            iconTheme: {
              primary: '#6366F1',
              secondary: '#ffffff',
            },
            style: {
              borderColor: '#6366F1',
            },
          },
        }}
      />
      <header>
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f0f0f0' }}>
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/create">Create Campaign</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
      
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>

      <footer style={{ padding: '1rem', textAlign: 'center', marginTop: 'auto', background: '#f0f0f0' }}>
        <p>© {new Date().getFullYear()} StellarAid. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
