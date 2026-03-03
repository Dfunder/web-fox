import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import MainLayout from '../components/layout/MainLayout';

// Pages
import Home from '../pages/Home';
import Explore from '../pages/Explore';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import CampaignDetails from '../pages/CampaignDetails';
import CreateCampaign from '../pages/CreateCampaign';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';

// Test Component
import ErrorTest from '../components/common/ErrorTest';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="campaign/:id" element={<CampaignDetails />} />
          <Route path="create" element={<CreateCampaign />} />
          <Route path="admin" element={<Admin />} />
          <Route path="test-error" element={<ErrorTest />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
