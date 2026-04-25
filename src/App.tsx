import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

// Import pages (will be created in later phases)
const PublicHomePage = React.lazy(() => import('./pages/PublicHomePage'));
const AuthenticatedHomePage = React.lazy(() => import('./pages/AuthenticatedHomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));

const App: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<PublicHomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<AuthenticatedHomePage />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default App;