import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProgressTracker = () => {
  const { t } = useTranslation();
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data fetch
    setTimeout(() => {
      setProgressData({
        currentPath: {
          id: 'beginner',
          title: t('learning.paths.beginner.title'),
          progress: 40,
          nextModule: {
            id: 'planting',
            title: t('learning.paths.beginner.modules.planting.title'),
            description: t('learning.paths.beginner.modules.planting.description')
          }
        },
        recentActivity: [
          {
            type: 'module',
            id: 'seedSelection',
            title: t('learning.paths.beginner.modules.seedSelection.title'),
            date: '2023-08-12',
            status: 'completed'
          },
          {
            type: 'quiz',
            id: 'soilBasicsQuiz',
            title: t('dashboard.progress.soilBasicsQuiz'),
            date: '2023-08-10',
            status: 'completed',
            score: 80
          },
          {
            type: 'module',
            id: 'soilBasics',
            title: t('learning.paths.beginner.modules.soilBasics.title'),
            date: '2023-08-08',
            status: 'completed'
          }
        ],
        recommendations: [
          {
            type: 'guide',
            id: 'seedStartingGuide',
            title: t('dashboard.progress.seedStartingGuide'),
            relevance: 'high'
          },
          {
            type: 'quiz',
            id: 'plantingQuiz',
            title: t('dashboard.progress.plantingQuiz'),
            relevance: 'medium'
          },
          {
            type: 'game',
            id: 'seasonQuiz',
            title: t('learning.games.seasonQuiz.title'),
            relevance: 'medium'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [t]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-leaf-green"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {t('dashboard.progress.title')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Learning Path */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-2">
            {t('dashboard.progress.currentPath')}
          </h3>
          <div className="flex items-center mb-4">
            <span className="text-lg font-medium text-leaf-green">{progressData.currentPath.title}</span>
            <span className="ml-auto bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              {progressData.currentPath.progress}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-leaf-green h-2.5 rounded-full" 
              style={{ width: `${progressData.currentPath.progress}%` }}
            ></div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              {t('dashboard.progress.nextUp')}:
            </h4>
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <div className="font-medium text-gray-800">
                {progressData.currentPath.nextModule.title}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {progressData.currentPath.nextModule.description}
              </p>
            </div>
          </div>
          
          <Link
            to={`/learning/module/${progressData.currentPath.nextModule.id}`}
            className="inline-block bg-leaf-green text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            {t('dashboard.progress.continue')}
          </Link>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">
            {t('dashboard.progress.recentActivity')}
          </h3>
          
          <div className="space-y-4">
            {progressData.recentActivity.map((activity, index) => (
              <div key={index} className="bg-white p-3 rounded-md border border-gray-200">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'module' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'quiz' ? 'bg-purple-100 text-purple-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {activity.type === 'module' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )}
                    {activity.type === 'quiz' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-800">{activity.title}</div>
                      {activity.status === 'completed' && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {activity.score ? `${activity.score}%` : t('dashboard.progress.completed')}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(activity.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Link
            to="/learning"
            className="inline-flex items-center text-leaf-green hover:underline mt-4 text-sm"
          >
            {t('dashboard.progress.viewAll')}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="mt-8">
        <h3 className="font-semibold text-gray-800 mb-4">
          {t('dashboard.progress.recommended')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {progressData.recommendations.map((item, index) => (
            <Link
              key={index}
              to={`/${item.type === 'guide' ? 'guides' : 'learning'}/${item.id}`}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  item.type === 'guide' ? 'bg-green-100 text-green-600' :
                  item.type === 'quiz' ? 'bg-purple-100 text-purple-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {item.type === 'guide' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                  {item.type === 'quiz' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )}
                  {item.type === 'game' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <div className="font-medium text-gray-800">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {t(`dashboard.progress.relevance.${item.relevance}`)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
