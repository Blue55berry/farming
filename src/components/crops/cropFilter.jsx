import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CropFilter = ({ onFilter }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    category: 'All',
    waterRequirement: 'All',
    sunlight: 'All',
    season: 'All',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      category: 'All',
      waterRequirement: 'All',
      sunlight: 'All',
      season: 'All',
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{t('crops.filters.title')}</h2>
        <button
          onClick={handleReset}
          className="text-sm text-leaf-green hover:underline"
        >
          {t('crops.filters.reset')}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('crops.filters.category')}
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-leaf-green focus:border-leaf-green"
          >
            <option value="All">{t('crops.filters.all')}</option>
            <option value="Vegetable">{t('crops.categories.vegetable')}</option>
            <option value="Fruit">{t('crops.categories.fruit')}</option>
            <option value="Grain">{t('crops.categories.grain')}</option>
            <option value="Herb">{t('crops.categories.herb')}</option>
            <option value="Other">{t('crops.categories.other')}</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('crops.filters.waterRequirement')}
          </label>
          <select
            name="waterRequirement"
            value={filters.waterRequirement}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-leaf-green focus:border-leaf-green"
          >
            <option value="All">{t('crops.filters.all')}</option>
            <option value="Low">{t('crops.waterRequirements.low')}</option>
            <option value="Medium">{t('crops.waterRequirements.medium')}</option>
            <option value="High">{t('crops.waterRequirements.high')}</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('crops.filters.sunlight')}
          </label>
          <select
            name="sunlight"
            value={filters.sunlight}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-leaf-green focus:border-leaf-green"
          >
            <option value="All">{t('crops.filters.all')}</option>
            <option value="Full Sun">{t('crops.sunlight.fullSun')}</option>
            <option value="Partial Shade">{t('crops.sunlight.partialShade')}</option>
            <option value="Full Shade">{t('crops.sunlight.fullShade')}</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('crops.filters.season')}
          </label>
          <select
            name="season"
            value={filters.season}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-leaf-green focus:border-leaf-green"
          >
            <option value="All">{t('crops.filters.all')}</option>
            <option value="Spring">{t('crops.seasons.spring')}</option>
            <option value="Summer">{t('crops.seasons.summer')}</option>
            <option value="Fall">{t('crops.seasons.fall')}</option>
            <option value="Winter">{t('crops.seasons.winter')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CropFilter;
