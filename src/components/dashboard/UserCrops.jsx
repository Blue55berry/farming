import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { getAllCrops } from '../../api/cropService'; // Assuming this service exists

const UserCrops = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [userCrops, setUserCrops] = useState([]);
  const [availableCrops, setAvailableCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCropsAndAvailableCrops = async () => {
      try {
        // Fetch user's crops
        const userCropsResponse = await axios.get('http://localhost:5000/api/users/crops', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserCrops(userCropsResponse.data);

        // Fetch all available crops
        const availableCropsResponse = await getAllCrops(); // Assuming this function exists
        setAvailableCrops(availableCropsResponse);
      } catch (err) {
        setError(t('userCrops.fetchError'));
        console.error('Error fetching crops:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserCropsAndAvailableCrops();
    }
  }, [currentUser, t]);

  const handleAddCrop = async () => {
    if (!selectedCrop) {
      alert(t('userCrops.selectCropPrompt'));
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/crops',
        { cropId: selectedCrop },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setUserCrops(response.data);
      setSelectedCrop(''); // Clear selection
    } catch (err) {
      setError(t('userCrops.addError'));
      console.error('Error adding crop:', err);
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
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('userCrops.title')}</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('userCrops.addCrop')}</h3>
        <div className="flex space-x-3">
          <select
            className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-leaf-green"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            <option value="">{t('userCrops.selectCrop')}</option>
            {availableCrops.map((crop) => (
              <option key={crop._id} value={crop._id}>
                {crop.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddCrop}
            className="px-4 py-2 bg-leaf-green text-white rounded-md hover:bg-green-700 transition-colors"
          >
            {t('userCrops.addButton')}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('userCrops.myCrops')}</h3>
        {userCrops.length === 0 ? (
          <p className="text-gray-600">{t('userCrops.noCrops')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userCrops.map((crop) => (
              <div key={crop._id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h4 className="font-semibold text-gray-800">{crop.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{crop.description}</p>
                {/* Add more crop details here if needed */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCrops;