import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
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
        {/* Outlet renders the matched child route */}
        <Outlet />
      </main>

      <footer style={{ padding: '1rem', textAlign: 'center', marginTop: 'auto', background: '#f0f0f0' }}>
        <p>© {new Date().getFullYear()} StellarAid. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
