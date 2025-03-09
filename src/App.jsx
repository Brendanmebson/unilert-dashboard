// src/App.jsx (Updated with new routes)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import IncidentList from './pages/IncidentList';
import IncidentDetail from './pages/IncidentDetail';
import DispatchSystem from './pages/DispatchSystem';
import ChatSystem from './pages/ChatSystem';
import CallingSystem from './pages/CallingSystem';
import Alerts from './pages/Alerts';
import Users  from './pages/Users';
import SOSreport from './pages/SOSreport';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import AdminProfile from './pages/AdminProfile';



// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="incidents" element={<IncidentList />} />
              <Route path="incidents/:id" element={<IncidentDetail />} />
              <Route path="sosreport" element={<SOSreport />} />
              <Route path="dispatch" element={<DispatchSystem />} />
              <Route path="chat" element={<ChatSystem />} />
              <Route path="calling" element={<CallingSystem />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="adminprofile" element={<AdminProfile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;