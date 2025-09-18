import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const SolutionViewer = ({ result, onReset, plantType }) => {
  const { t } = useTranslation();
  const plantName = t(`diagnosis.plants.${plantType}`);

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'low':
        return t('diagnosis.severity.low');
      case 'medium':
        return t('diagnosis.severity.medium');
      case 'high':
        return t('diagnosis.severity.high');
      default:
        return t('diagnosis.severity.unknown');
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold text-gray-800">{result.problemName}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(result.severity)}`}>
            {getSeverityLabel(result.severity)}
          </span>
        </div>
        
        <p className="text-gray-700 mb-6">{result.description}</p>
        
        {result.image && (
          <div className="mb-6">
            <img src={result.image} alt={result.problemName} className="w-full h-48 object-cover rounded-lg" />
          </div>
        )}
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            {t('diagnosis.recommendedSolutions')}
          </h4>
          <ul className="space-y-2">
            {result.solutions.map((solution, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-6 w-6 text-leaf-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">{solution}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            {t('diagnosis.preventionTips')}
          </h4>
          <ul className="space-y-2">
            {result.preventionTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={onReset}
            className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {t('diagnosis.newDiagnosis')}
          </button>
          
          <Link
            to={`/guides?search=${encodeURIComponent(`${plantName} ${result.problemName}`)}`}
            className="py-2 px-4 bg-leaf-green text-white rounded-md hover:bg-green-700 transition-colors text-center"
          >
            {t('diagnosis.findRelatedGuides')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SolutionViewer;
