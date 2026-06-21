import { Outlet, NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: '🏠', end: true },
  { to: '/explore', label: 'Explore', icon: '🔍' },
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/campaigns/create', label: 'Create', icon: '➕' },
  { to: '/admin', label: 'Admin', icon: '🛡️' },
  { to: '/login', label: 'Login', icon: '🔐' },
  { to: '/register', label: 'Register', icon: '📝' },
];

const sidebarLinkClasses = ({ isActive }) =>
  [
    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-accent text-white'
      : 'text-slate-300 hover:bg-white/10 hover:text-white',
  ].join(' ');

const bottomLinkClasses = ({ isActive }) =>
  [
    'flex min-w-[64px] flex-col items-center justify-center gap-0.5 px-2 py-1 text-[11px] font-medium transition-colors',
    isActive ? 'text-accent' : 'text-slate-500 hover:text-primary',
  ].join(' ');

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 md:flex-row">
      {/* Sidebar: visible on tablet/desktop (>= 768px) */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-primary p-4 md:flex">
        <div className="mb-8 px-3 text-xl font-bold text-white">StellarAid</div>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={sidebarLinkClasses}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <p className="px-3 text-xs text-slate-400">
          © {new Date().getFullYear()} StellarAid
        </p>
      </aside>

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar (< 768px) */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <span className="text-lg font-bold text-primary">StellarAid</span>
        </header>

        {/* Add bottom padding on mobile so content is not hidden behind bottom nav */}
        <main className="min-w-0 flex-1 p-4 pb-24 md:p-8 md:pb-8">
          <Outlet />
        </main>

        <footer className="hidden border-t border-slate-200 px-8 py-4 text-center text-sm text-slate-500 md:block">
          <p>© {new Date().getFullYear()} StellarAid. All rights reserved.</p>
        </footer>
      </div>

      {/* Bottom navigation: visible only on mobile (< 768px) */}
      <nav className="fixed inset-x-0 bottom-0 z-50 flex items-stretch justify-between overflow-x-auto border-t border-slate-200 bg-white md:hidden">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={bottomLinkClasses}
          >
            <span className="text-lg" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MainLayout;
