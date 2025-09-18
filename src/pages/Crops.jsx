import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CropList from '../components/crops/CropList';
import CropFilter from '../components/crops/cropFilter';

const Crops = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    category: 'All',
    waterRequirement: 'All',
    sunlight: 'All',
    season: 'All',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{t('crops.title')}</h1>
      <CropFilter onFilter={handleFilterChange} />
      <CropList filters={filters} onFilter={handleFilterChange} />
    </div>
  );
};

export default Crops;
