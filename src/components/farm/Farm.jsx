import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { getAllCrops } from '../../api/cropService'; // To get available seeds

const Farm = () => {
  const { t } = useTranslation();
  const { currentUser, setCurrentUser } = useAuth(); // Need setCurrentUser to update coins
  const [landPlots, setLandPlots] = useState([]);
  const [availableSeeds, setAvailableSeeds] = useState([]);
  const [selectedSeed, setSelectedSeed] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to calculate growth percentage and stage
  const calculateGrowthData = (plantingTime, growthPeriodDays) => {
    if (!plantingTime || !growthPeriodDays) return { percentage: 0, stage: 'seed' };
    const plantedDate = new Date(plantingTime);
    const now = new Date();
    const timeElapsed = now.getTime() - plantedDate.getTime();
    const growthPeriodMs = growthPeriodDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds

    let percentage = (timeElapsed / growthPeriodMs) * 100;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;
    percentage = Math.floor(percentage);

    let stage = 'seed';
    if (percentage >= 100) {
      stage = 'mature';
    } else if (percentage >= 60) {
      stage = 'youngPlant';
    } else if (percentage >= 20) {
      stage = 'seedling';
    }

    return { percentage, stage };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch land plots
        const landResponse = await axios.get('http://localhost:5000/api/users/land', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setLandPlots(landResponse.data);

        // Fetch available crops (seeds)
        const cropsResponse = await getAllCrops();
        setAvailableSeeds(cropsResponse);
      } catch (err) {
        setError(t('farm.fetchError'));
        console.error('Error fetching farm data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchData();
    }

    // Set up interval for real-time growth updates
    const growthInterval = setInterval(() => {
      setLandPlots(currentPlots =>
        currentPlots.map(plot => {
          if (plot.isPlanted && plot.cropId) {
            const cropDetails = availableSeeds.find(seed => seed._id === plot.cropId._id); // Find crop details from availableSeeds
            if (cropDetails) {
              const { percentage: newGrowthPercentage, stage: newGrowthStage } = calculateGrowthData(plot.plantingTime, cropDetails.growthPeriod);
              return { ...plot, growthStage: newGrowthPercentage, currentImageStage: newGrowthStage };
            }
          }
          return plot;
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(growthInterval); // Cleanup interval on unmount
  }, [currentUser, t, availableSeeds]); // Add availableSeeds to dependency array

  const handlePlantSeed = async (plotNumber) => {
    if (!selectedSeed) {
      alert(t('farm.selectSeedPrompt'));
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/land/plant',
        { plotNumber, cropId: selectedSeed },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      // Update land plots and current user (coins)
      setLandPlots(response.data.landPlots);
      setCurrentUser(response.data); // Backend returns updated user object
      setSelectedSeed(''); // Clear selection
      alert(t('farm.plantSuccess'));
    } catch (err) {
      setError(t('farm.plantError'));
      console.error('Error planting seed:', err);
      alert(err.response?.data?.msg || t('farm.plantErrorGeneric'));
    }
  };

  const handleHarvest = async (plotNumber) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/land/harvest',
        { plotNumber },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setLandPlots(response.data.landPlots);
      setCurrentUser(response.data); // Backend returns updated user object
      alert(t('farm.harvestSuccess'));
    } catch (err) {
      setError(t('farm.harvestError'));
      console.error('Error harvesting crop:', err);
      alert(err.response?.data?.msg || t('farm.harvestErrorGeneric'));
    }
  };

  const handleSell = async (cropId, quantity) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/inventory/sell',
        { cropId, quantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setCurrentUser(response.data); // Backend returns updated user object
      alert(t('farm.sellSuccess', { quantity, cropName: response.data.inventory.find(item => item.cropId._id === cropId)?.cropId.name || 'crop' }));
    } catch (err) {
      setError(t('farm.sellError'));
      console.error('Error selling crop:', err);
      alert(err.response?.data?.msg || t('farm.sellErrorGeneric'));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-leaf-green"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('farm.title')}</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">{t('farm.buySeeds')}</h2>
        <div className="flex space-x-3">
          <select
            className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-leaf-green"
            value={selectedSeed}
            onChange={(e) => setSelectedSeed(e.target.value)}
          >
            <option value="">{t('farm.selectSeed')}</option>
            {availableSeeds.map((seed) => (
              <option key={seed._id} value={seed._id}>
                {seed.name} ({seed.seedPrice} {t('farm.coins')})
              </option>
            ))}
          </select>
          <p className="text-lg font-semibold text-gray-700 self-center">
            {t('farm.yourCoins')}: {currentUser?.coins || 0}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">{t('farm.availableSeeds')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableSeeds.map((seed) => (
            <div key={seed._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
              <img src={seed.seedImage || '/images/placeholder_seed.png'} alt={seed.name} className="w-16 h-16 object-contain mb-2" />
              <h3 className="font-semibold text-gray-800">{seed.name}</h3>
              <p className="text-gray-600">{t('farm.price')}: {seed.seedPrice} {t('farm.coins')}</p>
              <p className="text-sm text-gray-500">{t('farm.growthPeriod')}: {seed.growthPeriod} {t('farm.days')}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {landPlots.map((plot) => (
          <div
            key={plot.plotNumber}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center h-48"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t('farm.plot')} {plot.plotNumber}
            </h3>
            {plot.isPlanted ? (
              <div className="text-center w-full">
                <p className="text-gray-600">{t('farm.planted')}: {plot.cropId?.name}</p>
                <p className="text-sm text-gray-500">
                  {t('farm.plantedOn')}: {new Date(plot.plantingTime).toLocaleDateString()}
                </p>
                <div className="mt-2 w-full flex justify-center items-center">
                  {plot.currentImageStage && (
                    <img
                      src={plot.cropId?.[`${plot.currentImageStage}Image`] || '/images/placeholder_plant.png'}
                      alt={`${plot.cropId?.name} ${plot.currentImageStage}`}
                      className="w-24 h-24 object-contain"
                    />
                  )}
                </div>
                <div className="mt-2 w-full">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-leaf-green h-2.5 rounded-full"
                      style={{ width: `${plot.growthStage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-green-600 font-medium mt-1">
                    {t('farm.growing')} ({plot.growthStage}%)
                  </p>
                </div>
                {plot.growthStage >= 100 && (
                  <button
                    onClick={() => handleHarvest(plot.plotNumber)}
                    className="mt-4 py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    {t('farm.harvestButton')}
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => handlePlantSeed(plot.plotNumber)}
                className="py-2 px-4 bg-leaf-green text-white rounded-md hover:bg-green-700 transition-colors"
              >
                {t('farm.plantSeed')}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">{t('farm.inventory')}</h2>
        {currentUser?.inventory?.length === 0 ? (
          <p className="text-gray-600">{t('farm.emptyInventory')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentUser?.inventory?.map(item => (
              <div key={item.cropId._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                <img src={item.cropId.maturePlantImage || '/images/placeholder_plant.png'} alt={item.cropId.name} className="w-16 h-16 object-contain mb-2" />
                <h3 className="font-semibold text-gray-800">{item.cropId.name}</h3>
                <p className="text-gray-600">{t('farm.quantity')}: {item.quantity}</p>
                <p className="text-sm text-gray-500">{t('farm.sellPrice')}: {item.cropId.harvestPrice} {t('farm.coins')}</p>
                <button
                  onClick={() => handleSell(item.cropId._id, 1)} // Sell 1 at a time for simplicity
                  className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  {t('farm.sellButton')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Farm;