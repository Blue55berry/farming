import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LearningPath = () => {
  const { t } = useTranslation();
  const [expandedPath, setExpandedPath] = useState(null);

  const togglePath = (pathId) => {
    if (expandedPath === pathId) {
      setExpandedPath(null);
    } else {
      setExpandedPath(pathId);
    }
  };

  const learningPaths = [
    {
      id: 'new-user',
      title: 'Welcome New Users!',
      description: 'A quick tour of the application to get you started.',
      image: 'https://via.placeholder.com/400x225?text=New+User+Guide',
      modules: [
        {
          id: 'welcome',
          title: 'Welcome to the App',
          description: 'An introduction to the features and benefits.',
          duration: '5 min',
          lessons: 1
        },
        {
          id: 'navigation',
          title: 'Navigating the App',
          description: 'Learn how to find your way around the application.',
          duration: '10 min',
          lessons: 3
        },
        {
          id: 'first-guide',
          title: 'Finding Your First Guide',
          description: 'A step-by-step walkthrough to find a guide that interests you.',
          duration: '15 min',
          lessons: 4
        }
      ]
    },
    {
      id: 'beginner',
      title: t('learning.paths.beginner.title'),
      description: t('learning.paths.beginner.description'),
      image: '/images/learning/beginner.jpg',
      modules: [
        {
          id: 'soilBasics',
          title: t('learning.paths.beginner.modules.soilBasics.title'),
          description: t('learning.paths.beginner.modules.soilBasics.description'),
          duration: '30 min',
          lessons: 4
        },
        {
          id: 'seedSelection',
          title: t('learning.paths.beginner.modules.seedSelection.title'),
          description: t('learning.paths.beginner.modules.seedSelection.description'),
          duration: '45 min',
          lessons: 5
        },
        {
          id: 'planting',
          title: t('learning.paths.beginner.modules.planting.title'),
          description: t('learning.paths.beginner.modules.planting.description'),
          duration: '1 hour',
          lessons: 6
        }
      ]
    },
    {
      id: 'intermediate',
      title: t('learning.paths.intermediate.title'),
      description: t('learning.paths.intermediate.description'),
      image: 'https://via.placeholder.com/400x225?text=Intermediate+Path',
      modules: [
        {
          id: 'waterManagement',
          title: t('learning.paths.intermediate.modules.waterManagement.title'),
          description: t('learning.paths.intermediate.modules.waterManagement.description'),
          duration: '1 hour',
          lessons: 5
        },
        {
          id: 'pestControl',
          title: t('learning.paths.intermediate.modules.pestControl.title'),
          description: t('learning.paths.intermediate.modules.pestControl.description'),
          duration: '1.5 hours',
          lessons: 7
        },
        {
          id: 'fertilization',
          title: t('learning.paths.intermediate.modules.fertilization.title'),
          description: t('learning.paths.intermediate.modules.fertilization.description'),
          duration: '1 hour',
          lessons: 6
        }
      ]
    },
    {
      id: 'advanced',
      title: t('learning.paths.advanced.title'),
      description: t('learning.paths.advanced.description'),
      image: '/images/learning/advanced.jpg',
      modules: [
        {
          id: 'cropRotation',
          title: t('learning.paths.advanced.modules.cropRotation.title'),
          description: t('learning.paths.advanced.modules.cropRotation.description'),
          duration: '1.5 hours',
          lessons: 6
        },
        {
          id: 'soilHealth',
          title: t('learning.paths.advanced.modules.soilHealth.title'),
          description: t('learning.paths.advanced.modules.soilHealth.description'),
          duration: '2 hours',
          lessons: 8
        },
        {
          id: 'seasonExtension',
          title: t('learning.paths.advanced.modules.seasonExtension.title'),
          description: t('learning.paths.advanced.modules.seasonExtension.description'),
          duration: '1.5 hours',
          lessons: 7
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('learning.pathsTitle')}</h2>
      
      {learningPaths.map(path => (
        <div key={path.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div 
            className="flex flex-col md:flex-row cursor-pointer"
            onClick={() => togglePath(path.id)}
          >
            <div className="md:w-1/3 h-48 bg-gray-200 relative">
              {path.image ? (
                <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              )}
              
              <div className="absolute top-0 right-0 p-2">
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  path.id === 'beginner' ? 'bg-green-100 text-green-800' :
                  path.id === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {path.title}
                </span>
              </div>
            </div>
            
            <div className="p-6 md:w-2/3 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{path.title}</h3>
                <p className="text-gray-600 mb-4">{path.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-4 text-sm text-gray-500">
                  <span>{path.modules.length} {t('learning.modules')}</span>
                  <span>•</span>
                  <span>
                    {path.modules.reduce((total, module) => total + module.lessons, 0)} {t('learning.lessons')}
                  </span>
                </div>
                
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 text-gray-500 transform transition-transform ${expandedPath === path.id ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {expandedPath === path.id && (
            <div className="border-t border-gray-200 p-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4">{t('learning.pathModules')}</h4>
              
              <div className="space-y-4">
                {path.modules.map(module => (
                  <div key={module.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-gray-800">{module.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>{module.duration}</div>
                        <div>{module.lessons} {t('learning.lessons')}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Link
                        to={`/learning/module/${module.id}`}
                        className="inline-flex items-center text-leaf-green hover:underline"
                      >
                        {t('learning.startModule')}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Link
                  to={`/learning/path/${path.id}`}
                  className="inline-block bg-leaf-green text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {t('learning.startLearningPath')}
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningPath;
