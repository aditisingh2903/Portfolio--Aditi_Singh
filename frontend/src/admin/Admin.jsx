import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';

function Guard({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return <div className="min-h-screen flex items-center justify-center text-white/50">Loading...</div>;
  return user ? children : <Navigate to="/admin/login" replace />;
}

export default function Admin() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Guard><Dashboard /></Guard>} />
      </Routes>
    </AuthProvider>
  );
}
