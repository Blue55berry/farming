import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getGuideById } from '../../api/guideService';
import StepByStepGuide from './StepByStepGuide';

const GuideDetail = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const data = await getGuideById(id);
        setGuide(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGuide();
  }, [id]);

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

  if (!guide) {
    return (
      <div className="text-center p-4">
        <p>{t('guides.notFound')}</p>
        <Link to="/guides" className="text-leaf-green hover:underline mt-2 inline-block">
          {t('guides.backToList')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/guides" className="inline-flex items-center text-leaf-green hover:underline mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        {t('guides.backToList')}
      </Link>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-wrap items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800 mr-4">{guide.title}</h1>
            <div className="flex space-x-2 mt-2 md:mt-0">
              {guide.isTraditional && (
                <span className="bg-soil-brown bg-opacity-20 text-soil-brown text-sm font-semibold px-3 py-1 rounded-full">
                  {t('guides.labels.traditional')}
                </span>
              )}
              {guide.isModern && (
                <span className="bg-sky-blue bg-opacity-20 text-sky-blue text-sm font-semibold px-3 py-1 rounded-full">
                  {t('guides.labels.modern')}
                </span>
              )}
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {t(`guides.difficulty.${guide.difficulty.toLowerCase()}`)}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">{guide.summary}</p>
          
          {guide.relatedCrops && guide.relatedCrops.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{t('guides.relatedCrops')}</h2>
              <div className="flex flex-wrap gap-2">
                {guide.relatedCrops.map(crop => (
                  <Link
                    key={crop._id}
                    to={`/crops/${crop._id}`}
                    className="bg-green-50 text-leaf-green hover:bg-green-100 px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    {crop.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <StepByStepGuide steps={guide.steps} />
    </div>
  );
};

export default GuideDetail;
