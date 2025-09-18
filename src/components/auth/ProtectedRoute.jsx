import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>; // Or a spinner, or null
  }

  if (!currentUser) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
