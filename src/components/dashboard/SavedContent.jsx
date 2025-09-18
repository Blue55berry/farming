import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SavedContent = () => {
  const { t } = useTranslation();
  const [savedContent, setSavedContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // Mock data fetch
    setTimeout(() => {
      setSavedContent([
        {
          id: 'guide1',
          type: 'guide',
          title: 'Tomato Growing Guide',
          description: 'Complete guide to growing tomatoes from seed to harvest',
          savedDate: '2023-08-10',
          image: 'https://via.placeholder.com/400x225?text=Tomato+Guide'
        },
        {
          id: 'crop1',
          type: 'crop',
          title: 'Heirloom Tomatoes',
          description: 'Information about various heirloom tomato varieties',
          savedDate: '2023-08-08',
          image: 'https://via.placeholder.com/400x225?text=Heirloom+Tomatoes'
        },
        {
          id: 'guide2',
          type: 'guide',
          title: 'Natural Pest Control',
          description: 'Organic methods to keep pests away from your garden',
          savedDate: '2023-08-05',
          image: 'https://via.placeholder.com/400x225?text=Pest+Control'
        },
        {
          id: 'diagnosis1',
          type: 'diagnosis',
          title: 'Leaf Spot Diagnosis',
          description: 'Solutions for common leaf spot problems',
          savedDate: '2023-07-30',
          image: 'https://via.placeholder.com/400x225?text=Leaf+Spot'
        },
        {
          id: 'crop2',
          type: 'crop',
          title: 'Basil Varieties',
          description: 'Different types of basil and their growing requirements',
          savedDate: '2023-07-25',
          image: 'https://via.placeholder.com/400x225?text=Basil+Varieties'
        },
        {
          id: 'guide3',
          type: 'guide',
          title: 'Container Gardening',
          description: 'How to grow vegetables in limited space using containers',
          savedDate: '2023-07-22',
          image: 'https://via.placeholder.com/400x225?text=Container+Gardening'
        },
        {
          id: 'diagnosis2',
          type: 'diagnosis',
          title: 'Yellow Leaves Treatment',
          description: 'Causes and solutions for yellow leaves in plants',
          savedDate: '2023-07-18',
          image: 'https://via.placeholder.com/400x225?text=Yellow+Leaves'
        },
        {
          id: 'guide4',
          type: 'guide',
          title: 'Composting Basics',
          description: 'How to create rich compost for your garden',
          savedDate: '2023-07-15',
          image: 'https://via.placeholder.com/400x225?text=Composting'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getLinkForItem = (item) => {
    switch (item.type) {
      case 'guide':
        return `/guides/${item.id}`;
      case 'crop':
        return `/crops/${item.id}`;
      case 'diagnosis':
        return `/diagnosis?problem=${item.id}`;
      default:
        return '/';
    }
  };

  const filteredContent = () => {
    if (activeFilter === 'all') return savedContent;
    return savedContent.filter(item => item.type === activeFilter);
  };

  const handleRemove = (id) => {
    setSavedContent(savedContent.filter(item => item.id !== id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-leaf-green"></div>
      </div>
    );
  }

  if (savedContent.length === 0) {
    return (
      <div className="text-center py-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          {t('dashboard.saved.noItems')}
        </h3>
        <p className="text-gray-500 mb-4">
          {t('dashboard.saved.noItemsDesc')}
        </p>
        <Link
          to="/guides"
          className="inline-block bg-leaf-green text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        >
          {t('dashboard.saved.exploreContent')}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {t('dashboard.saved.title')}
        </h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-md text-sm ${
              activeFilter === 'all'
                ? 'bg-leaf-green text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('dashboard.saved.filters.all')}
          </button>
          <button
            onClick={() => setActiveFilter('guide')}
            className={`px-3 py-1 rounded-md text-sm ${
              activeFilter === 'guide'
                ? 'bg-leaf-green text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('dashboard.saved.filters.guides')}
          </button>
          <button
            onClick={() => setActiveFilter('crop')}
            className={`px-3 py-1 rounded-md text-sm ${
              activeFilter === 'crop'
                ? 'bg-leaf-green text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('dashboard.saved.filters.crops')}
          </button>
          <button
            onClick={() => setActiveFilter('diagnosis')}
            className={`px-3 py-1 rounded-md text-sm ${
              activeFilter === 'diagnosis'
                ? 'bg-leaf-green text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('dashboard.saved.filters.diagnosis')}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContent().map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-40 bg-gray-200 relative">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              <div className="absolute top-0 right-0 p-2">
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  item.type === 'guide' ? 'bg-green-100 text-green-800' :
                  item.type === 'crop' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {t(`dashboard.saved.types.${item.type}`)}
                </span>
              </div>
              
              <button
                onClick={() => handleRemove(item.id)}
                className="absolute top-0 left-0 p-2 text-gray-500 hover:text-red-500"
                title={t('dashboard.saved.remove')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <Link
                to={getLinkForItem(item)}
                className="font-medium text-gray-800 hover:text-leaf-green"
              >
                {item.title}
              </Link>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
              <div className="text-xs text-gray-500 mt-2">
                {t('dashboard.saved.savedOn')}: {new Date(item.savedDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedContent;
