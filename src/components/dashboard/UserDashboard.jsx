import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import ProgressTracker from './ProgressTracker';
import SavedContent from './SavedContent';

const UserDashboard = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('progress');
  
  

  

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-leaf-green"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-6 bg-gradient-to-r from-green-500 to-green-700 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {t('dashboard.welcome', { name: currentUser?.name || 'User' })}
              </h1>
              <p className="text-green-50">
                {t('dashboard.lastLogin', { date: new Date().toLocaleDateString() })}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 grid grid-cols-2 gap-4 text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-2xl font-bold">{currentUser.coins || 0}</div>
                <div className="text-sm text-green-100">{t('dashboard.coins')}</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-2xl font-bold">{currentUser.savedItems?.length || 0}</div>
                <div className="text-sm text-green-100">{t('dashboard.saved')}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-b">
          <div className="flex">
            <button
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                activeTab === 'progress'
                  ? 'text-leaf-green border-b-2 border-leaf-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('progress')}
            >
              {t('dashboard.tabs.progress')}
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                activeTab === 'saved'
                  ? 'text-leaf-green border-b-2 border-leaf-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('saved')}
            >
              {t('dashboard.tabs.saved')}
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                activeTab === 'achievements'
                  ? 'text-leaf-green border-b-2 border-leaf-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('achievements')}
            >
              {t('dashboard.tabs.achievements')}
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'progress' && <ProgressTracker />}
          {activeTab === 'saved' && <SavedContent />}
          {activeTab === 'achievements' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t('dashboard.achievements.title')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userStats.achievements.map(achievement => (
                  <div key={achievement.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                        {achievement.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                        <div className="text-xs text-gray-500 mt-2">
                          {t('dashboard.achievements.earned')}: {new Date(achievement.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
