import { useTranslation } from 'react-i18next';

const SymptomChecker = ({ plantType, selectedSymptoms, onSymptomToggle, onDiagnose, isLoading }) => {
  const { t } = useTranslation();

  // Symptom data based on plant type
  const getSymptoms = (plant) => {
    const commonSymptoms = [
      { id: 'yellowLeaves', label: t('diagnosis.symptoms.yellowLeaves') },
      { id: 'wilting', label: t('diagnosis.symptoms.wilting') },
      { id: 'spots', label: t('diagnosis.symptoms.spots') },
      { id: 'stunted', label: t('diagnosis.symptoms.stunted') },
      { id: 'holes', label: t('diagnosis.symptoms.holes') },
      { id: 'discoloration', label: t('diagnosis.symptoms.discoloration') }
    ];

    // Add plant-specific symptoms
    switch (plant) {
      case 'tomato':
        return [
          ...commonSymptoms,
          { id: 'blossom_end_rot', label: t('diagnosis.symptoms.blossomEndRot') },
          { id: 'cracking', label: t('diagnosis.symptoms.cracking') }
        ];
      case 'cucumber':
        return [
          ...commonSymptoms,
          { id: 'bitter_taste', label: t('diagnosis.symptoms.bitterTaste') },
          { id: 'powdery_mildew', label: t('diagnosis.symptoms.powderyMildew') }
        ];
      case 'potato':
        return [
          ...commonSymptoms,
          { id: 'tuber_rot', label: t('diagnosis.symptoms.tuberRot') },
          { id: 'green_tubers', label: t('diagnosis.symptoms.greenTubers') }
        ];
      default:
        return commonSymptoms;
    }
  };

  const symptoms = getSymptoms(plantType);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {t('diagnosis.selectSymptoms')}
      </h3>
      
      <div className="space-y-3 mb-6">
        {symptoms.map(symptom => (
          <div key={symptom.id} className="flex items-center">
            <input
              type="checkbox"
              id={symptom.id}
              checked={selectedSymptoms.includes(symptom.id)}
              onChange={() => onSymptomToggle(symptom.id)}
              className="h-4 w-4 text-leaf-green focus:ring-leaf-green border-gray-300 rounded"
            />
            <label htmlFor={symptom.id} className="ml-2 block text-gray-700">
              {symptom.label}
            </label>
          </div>
        ))}
      </div>
      
      <button
        onClick={onDiagnose}
        disabled={selectedSymptoms.length === 0 || isLoading}
        className={`w-full py-2 px-4 rounded-md ${
          selectedSymptoms.length === 0
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-leaf-green text-white hover:bg-green-700'
        } transition-colors flex justify-center items-center`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('diagnosis.diagnosing')}
          </>
        ) : (
          t('diagnosis.diagnose')
        )}
      </button>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>{t('diagnosis.hint')}</p>
      </div>
    </div>
  );
};

export default SymptomChecker;
