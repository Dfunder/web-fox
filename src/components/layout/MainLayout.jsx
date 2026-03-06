import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * MainLayout
 * Wraps every public page with the sticky Navbar and Footer.
 * Usage in AppRouter.jsx:
 *
 *   <Route element={<MainLayout />}>
 *     <Route path="/"        element={<Home />} />
 *     <Route path="/explore" element={<Explore />} />
 *     …
 *   </Route>
 */
export default function MainLayout() {
  return (
    <>
      <style>{`
        .ml-root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .ml-main {
          flex: 1;
        }
      `}</style>

      <div className="ml-root">
        <Navbar />
        <main className="ml-main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}