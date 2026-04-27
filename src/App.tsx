import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useAppStore } from './store/useAppStore';
import { auth, onAuthStateChanged } from './config/firebase';

import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { PatientDetails } from './pages/PatientDetails';
import { Analytics } from './pages/Analytics';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading application...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Layout>{children}</Layout>;
};

function App() {
  const { login, logout, setLoading } = useAuthStore();
  const { theme } = useAppStore();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Attempt to hook into Firebase auth state
    try {
      const unsubscribe = onAuthStateChanged(auth, (user: any) => {
        if (user) {
          login(user);
        } else {
          // If we have a mock user already set from login screen, don't auto logout unless firebase says so, wait, if it's mock it might not trigger.
          // Better handling: if not using mock API key
          if (auth.app.options.apiKey !== 'mock-api-key') {
            logout();
          }
          setLoading(false);
        }
      });
      return () => unsubscribe();
    } catch (e) {
      setLoading(false);
    }
  }, [login, logout, setLoading]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/patients" element={
          <ProtectedRoute>
            <PatientDetails />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
