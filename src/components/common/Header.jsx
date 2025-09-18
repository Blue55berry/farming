import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import SearchBar from './SearchBar';
import logo from '../../logo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Farm Education" className="h-10 w-10" />
          <span className="ml-2 text-xl font-bold text-leaf-green">FarmEdu</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <SearchBar />
          <nav className="flex space-x-6">
            <Link to="/crops" className="text-gray-700 hover:text-leaf-green transition-colors">
              {t('nav.crops')}
            </Link>
            <Link to="/guides" className="text-gray-700 hover:text-leaf-green transition-colors">
              {t('nav.guides')}
            </Link>
            <Link to="/diagnosis" className="text-gray-700 hover:text-leaf-green transition-colors">
              {t('nav.diagnosis')}
            </Link>
            <Link to="/learning" className="text-gray-700 hover:text-leaf-green transition-colors">
              {t('nav.learning')}
            </Link>
          </nav>
          <LanguageSelector />
          {currentUser ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-leaf-green">
                <span>{currentUser.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-10">
                <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {t('nav.dashboard')}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t('nav.signOut')}
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="bg-leaf-green text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">{t('nav.signIn')}</Link>
          )}
        </div>
        
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <SearchBar className="p-4" />
          <nav className="flex flex-col p-4 space-y-4">
            <Link to="/crops" className="text-gray-700 hover:text-leaf-green transition-colors">
              {t('nav.crops')}
            </Link>
            <Link to="/guides" className="text-gray-700 hover:text-leaf-green transition-colors">
              {t('nav.guides')}
            </Link>
            <Link to="/diagnosis" className="text-gray-700 hover:text-leaf-green transition-colors">
              {t('nav.diagnosis')}
            </Link>
            <Link to="/learning" className="text-gray-700 hover:text-leaf-green transition-colors">
              {t('nav.learning')}
            </Link>
          </nav>
          <div className="p-4 border-t flex justify-between items-center">
            <LanguageSelector />
            {currentUser ? (
              <div className="flex flex-col space-y-2">
                <Link to="/dashboard" className="text-gray-700 hover:text-leaf-green">
                  {t('nav.dashboard')}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800"
                >
                  {t('nav.signOut')}
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-leaf-green text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">{t('nav.signIn')}</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
