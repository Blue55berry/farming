import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`hidden md:block bg-white shadow-md ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-leaf-green"
        >
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`flex items-center p-4 ${isActive('/') ? 'text-leaf-green bg-green-50' : 'text-gray-700'} hover:text-leaf-green hover:bg-green-50`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {!isCollapsed && <span className="ml-3">{t('sidebar.home')}</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/crops"
              className={`flex items-center p-4 ${isActive('/crops') ? 'text-leaf-green bg-green-50' : 'text-gray-700'} hover:text-leaf-green hover:bg-green-50`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              {!isCollapsed && <span className="ml-3">{t('sidebar.crops')}</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/guides"
              className={`flex items-center p-4 ${isActive('/guides') ? 'text-leaf-green bg-green-50' : 'text-gray-700'} hover:text-leaf-green hover:bg-green-50`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {!isCollapsed && <span className="ml-3">{t('sidebar.guides')}</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/diagnosis"
              className={`flex items-center p-4 ${isActive('/diagnosis') ? 'text-leaf-green bg-green-50' : 'text-gray-700'} hover:text-leaf-green hover:bg-green-50`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {!isCollapsed && <span className="ml-3">{t('sidebar.diagnosis')}</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/learning"
              className={`flex items-center p-4 ${isActive('/learning') ? 'text-leaf-green bg-green-50' : 'text-gray-700'} hover:text-leaf-green hover:bg-green-50`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
              {!isCollapsed && <span className="ml-3">{t('sidebar.learning')}</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center p-4 ${isActive('/dashboard') ? 'text-leaf-green bg-green-50' : 'text-gray-700'} hover:text-leaf-green hover:bg-green-50`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {!isCollapsed && <span className="ml-3">{t('sidebar.dashboard')}</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/farm"
              className={`flex items-center p-4 ${isActive('/farm') ? 'text-leaf-green bg-green-50' : 'text-gray-700'} hover:text-leaf-green hover:bg-green-50`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              {!isCollapsed && <span className="ml-3">{t('sidebar.farm')}</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
