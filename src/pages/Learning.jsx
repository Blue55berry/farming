import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LearningPath from '../components/learning/LearningPath';
import GameCenter from '../components/learning/GameCenter';
import Quiz from '../components/learning/Quiz';

const Learning = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('paths');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{t('learning.title')}</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="border-b">
          <div className="flex">
            <button
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                activeTab === 'paths'
                  ? 'text-leaf-green border-b-2 border-leaf-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('paths')}
            >
              {t('learning.tabs.paths')}
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                activeTab === 'games'
                  ? 'text-leaf-green border-b-2 border-leaf-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('games')}
            >
              {t('learning.tabs.games')}
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                activeTab === 'quiz'
                  ? 'text-leaf-green border-b-2 border-leaf-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('quiz')}
            >
              {t('learning.tabs.quiz')}
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'paths' && <LearningPath />}
          {activeTab === 'games' && <GameCenter />}
          {activeTab === 'quiz' && <Quiz />}
        </div>
      </div>
    </div>
  );
};

export default Learning;
