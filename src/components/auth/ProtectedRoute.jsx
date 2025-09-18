import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
