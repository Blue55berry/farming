import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllCrops } from '../../api/cropService';
import CropFilter from './cropFilter';

const CropList = ({ filters, onFilter }) => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true);
        const data = await getAllCrops();
        setCrops(data);
        setFilteredCrops(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchCrops();
  }, []);
  
  useEffect(() => {
    if (filters) {
      applyFilters(filters);
    }
  }, [filters, crops]);
  
  const applyFilters = (filters) => {
    let result = [...crops];
    
    if (filters.category && filters.category !== 'All') {
      result = result.filter(crop => crop.category === filters.category);
    }
    
    if (filters.waterRequirement && filters.waterRequirement !== 'All') {
      result = result.filter(crop => crop.waterRequirements === filters.waterRequirement);
    }
    
    if (filters.sunlight && filters.sunlight !== 'All') {
      result = result.filter(crop => crop.sunlightRequirements === filters.sunlight);
    }
    
    if (filters.season && filters.season !== 'All') {
      result = result.filter(crop => crop.seasonalInfo.toLowerCase().includes(filters.season.toLowerCase()));
    }
    
    setFilteredCrops(result);
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
    <div>
      {filteredCrops.length === 0 ? (
        <div className="text-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('crops.noResults.title')}</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">{t('crops.noResults.message')}</p>
          <button 
            onClick={() => onFilter({
              category: 'All',
              waterRequirement: 'All',
              sunlight: 'All',
              season: 'All'
            })}
            className="bg-leaf-green text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            {t('crops.noResults.resetButton')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCrops.map((crop) => (
            <Link
              key={crop._id}
              to={`/crops/${crop._id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-200 relative">
                {crop.image ? (
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-0 right-0 p-2">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    {t(`crops.categories.${crop.category.toLowerCase()}`)}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{crop.name}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{crop.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {t(`crops.waterRequirements.${crop.waterRequirements.toLowerCase()}`)}
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    {t(`crops.sunlight.${crop.sunlightRequirements.replace(/\s+/g, '').toLowerCase()}`)}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {crop.growthPeriod} {t('crops.days')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      <div className="mt-8 text-center text-gray-600">
        <p>
          {t('crops.showing')} {filteredCrops.length} {t('crops.of')} {crops.length} {t('crops.totalCrops')}
        </p>
      </div>
      
      {/* Crop Detail Modal - could be implemented if needed */}
      
      {/* Additional features like pagination could be added here */}
      
      {crops.length > 10 && filteredCrops.length > 10 && (
        <div className="mt-10 text-center">
          <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors">
            {t('crops.loadMore')}
          </button>
        </div>
      )}
      
      {/* Quick Jump to Categories */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('crops.quickJump')}</h3>
        <div className="flex flex-wrap gap-2">
          {['Vegetable', 'Fruit', 'Grain', 'Herb'].map((category) => (
            <button
              key={category}
              onClick={() => onFilter({
                ...filters,
                category
              })}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors"
            >
              {t(`crops.categories.${category.toLowerCase()}`)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Save Preferences or Export Selection */}
      {filteredCrops.length > 0 && (
        <div className="mt-8 flex justify-end">
          <button className="text-leaf-green hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            {t('crops.export')}
          </button>
        </div>
      )}
    </div>
  );
};

export default CropList;
