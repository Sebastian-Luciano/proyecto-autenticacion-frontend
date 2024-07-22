import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { darkMode } = useAuth();
  return (
    <div className={darkMode ? 'dark' : ''}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/edit" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/profile" replace />} />
        </Routes>
    </div>
  );
};
export default App;