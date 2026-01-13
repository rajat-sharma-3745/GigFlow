import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { NotificationProvider } from './context/NotificationContext';
import { GigProvider } from './context/GigContext';
import Layout from './components/layout/Layout';
import AuthModal from './components/auth/AuthModal';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import GigDetails from './pages/GigDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <NotificationProvider>
            <GigProvider>
              <Layout>
                <AuthModal />
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/gig/:id"
                    element={
                      <ProtectedRoute>
                        <GigDetails />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </Layout>
            </GigProvider>
          </NotificationProvider>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;