import { useAuth } from '../contexts/AuthContext';
import UserDashboard from '../components/dashboard/UserDashboard';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { currentUser, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-leaf-green"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('dashboard.notLoggedIn.title')}</h2>
          <p className="text-gray-600 mb-6">{t('dashboard.notLoggedIn.message')}</p>
          <div className="flex flex-col space-y-4">
            <Link
              to="/login"
              className="bg-leaf-green text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              {t('dashboard.notLoggedIn.login')}
            </Link>
            <Link
              to="/register"
              className="bg-white text-leaf-green border border-leaf-green py-2 px-4 rounded-md hover:bg-green-50 transition-colors"
            >
              {t('dashboard.notLoggedIn.register')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <UserDashboard />;
};

export default Dashboard;
