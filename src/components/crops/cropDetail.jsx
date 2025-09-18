import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCropById } from '../../api/cropService';

const CropDetail = () => {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const data = await getCropById(id);
        setCrop(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCrop();
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

  if (!crop) {
    return (
      <div className="text-center p-4">
        <p>{t('crops.notFound')}</p>
        <Link to="/crops" className="text-leaf-green hover:underline mt-2 inline-block">
          {t('crops.backToList')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/crops" className="inline-flex items-center text-leaf-green hover:underline mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        {t('crops.backToList')}
      </Link>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            {crop.image ? (
              <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{crop.name}</h1>
            <div className="flex flex-wrap mb-4">
              <span className="bg-green-100 text-leaf-green rounded-full px-3 py-1 text-sm mr-2 mb-2">
                {t(`crops.categories.${crop.category.toLowerCase()}`)}
              </span>
              <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                {t(`crops.waterRequirements.${crop.waterRequirements.toLowerCase()}`)}
              </span>
              <span className="bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-sm mb-2">
                {t(`crops.sunlight.${crop.sunlightRequirements.replace(/\s+/g, '').toLowerCase()}`)}
              </span>
            </div>
            
            <p className="text-gray-600 mb-6">{crop.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{t('crops.details.growthInfo')}</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">{t('crops.details.growthPeriod')}:</span>
                    <span className="font-medium">{crop.growthPeriod} {t('crops.details.days')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">{t('crops.details.soilType')}:</span>
                    <span className="font-medium">{crop.soilType}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">{t('crops.details.plantingDepth')}:</span>
                    <span className="font-medium">{crop.plantingDepth}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">{t('crops.details.spacing')}:</span>
                    <span className="font-medium">{crop.spacingNeeds}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{t('crops.details.seasonalInfo')}</h2>
                <p className="text-gray-700">{crop.seasonalInfo}</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link 
                to={`/guides?crop=${crop._id}`}
                className="bg-leaf-green hover:bg-green-700 text-white px-6 py-2 rounded-lg inline-block transition-colors"
              >
                {t('crops.viewGuides')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetail;
