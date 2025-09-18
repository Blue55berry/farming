import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllGuides, getGuidesByCrop } from '../../api/guideService';

const GuideList = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cropId = queryParams.get('crop');
  const typeParam = queryParams.get('type');

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        let data;
        if (cropId) {
          data = await getGuidesByCrop(cropId);
          setActiveFilter('all');
        } else {
          data = await getAllGuides();
          if (typeParam === 'traditional') {
            setActiveFilter('traditional');
          } else if (typeParam === 'modern') {
            setActiveFilter('modern');
          } else {
            setActiveFilter('all');
          }
        }
        setGuides(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchGuides();
  }, [cropId, typeParam]);

  const filteredGuides = () => {
    if (activeFilter === 'all') return guides;
    if (activeFilter === 'traditional') return guides.filter(guide => guide.isTraditional);
    if (activeFilter === 'modern') return guides.filter(guide => guide.isModern);
    if (activeFilter === 'beginner') return guides.filter(guide => guide.difficulty === 'Beginner');
    if (activeFilter === 'intermediate') return guides.filter(guide => guide.difficulty === 'Intermediate');
    if (activeFilter === 'advanced') return guides.filter(guide => guide.difficulty === 'Advanced');
    return guides;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-leaf-green"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{t('errors.loading')}</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        {cropId ? t('guides.forCrop') : t('guides.title')}
      </h1>

      <div className="mb-8 border-b">
        <div className="flex flex-wrap -mb-px">
          <button
            className={`mr-4 py-2 px-1 border-b-2 font-medium text-sm ${
              activeFilter === 'all'
                ? 'border-leaf-green text-leaf-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            {t('guides.filters.all')}
          </button>
          <button
            className={`mr-4 py-2 px-1 border-b-2 font-medium text-sm ${
              activeFilter === 'traditional'
                ? 'border-leaf-green text-leaf-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveFilter('traditional')}
          >
            {t('guides.filters.traditional')}
          </button>
          <button
            className={`mr-4 py-2 px-1 border-b-2 font-medium text-sm ${
              activeFilter === 'modern'
                ? 'border-leaf-green text-leaf-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveFilter('modern')}
          >
            {t('guides.filters.modern')}
          </button>
          <button
            className={`mr-4 py-2 px-1 border-b-2 font-medium text-sm ${
              activeFilter === 'beginner'
                ? 'border-leaf-green text-leaf-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveFilter('beginner')}
          >
            {t('guides.filters.beginner')}
          </button>
          <button
            className={`mr-4 py-2 px-1 border-b-2 font-medium text-sm ${
              activeFilter === 'intermediate'
                ? 'border-leaf-green text-leaf-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveFilter('intermediate')}
          >
            {t('guides.filters.intermediate')}
          </button>
          <button
            className={`mr-4 py-2 px-1 border-b-2 font-medium text-sm ${
              activeFilter === 'advanced'
                ? 'border-leaf-green text-leaf-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveFilter('advanced')}
          >
            {t('guides.filters.advanced')}
          </button>
        </div>
      </div>

      {filteredGuides().length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">{t('guides.noGuides')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides().map((guide) => (
            <Link
              key={guide._id}
              to={`/guides/${guide._id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-200 relative">
                {guide.steps[0]?.image ? (
                  <img
                    src={guide.steps[0].image}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-0 right-0 p-2 flex space-x-1">
                  {guide.isTraditional && (
                    <span className="bg-soil-brown/20 text-soil-brown text-xs font-semibold px-2 py-1 rounded">
                      {t('guides.labels.traditional')}
                    </span>
                  )}
                  {guide.isModern && (
                    <span className="bg-sky-blue/20 text-sky-blue text-xs font-semibold px-2 py-1 rounded">
                      {t('guides.labels.modern')}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{guide.title}</h2>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {t(`guides.difficulty.${guide.difficulty.toLowerCase()}`)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{guide.summary}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {guide.steps.length} {t('guides.steps')}
                  </span>
                  <span className="text-leaf-green text-sm font-medium">
                    {t('guides.viewGuide')} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuideList;
