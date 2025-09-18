import { useTranslation } from 'react-i18next';
import ProblemDiagnoser from '../components/diagnosis/ProblemDiagnoser';

const Diagnosis = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{t('diagnosis.pageTitle')}</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('diagnosis.introduction.title')}</h2>
          <p className="text-gray-600 mb-4">{t('diagnosis.introduction.description')}</p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  {t('diagnosis.introduction.disclaimer')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ProblemDiagnoser />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('diagnosis.tips.title')}</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-leaf-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{t('diagnosis.tips.tip1')}</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-leaf-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{t('diagnosis.tips.tip2')}</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-leaf-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{t('diagnosis.tips.tip3')}</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-leaf-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{t('diagnosis.tips.tip4')}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('diagnosis.commonProblems.title')}</h2>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="font-medium text-gray-800">{t('diagnosis.commonProblems.problem1.title')}</h3>
                <p className="text-sm text-gray-600">{t('diagnosis.commonProblems.problem1.description')}</p>
              </div>
              <div className="border-b pb-2">
                <h3 className="font-medium text-gray-800">{t('diagnosis.commonProblems.problem2.title')}</h3>
                <p className="text-sm text-gray-600">{t('diagnosis.commonProblems.problem2.description')}</p>
              </div>
              <div className="border-b pb-2">
                <h3 className="font-medium text-gray-800">{t('diagnosis.commonProblems.problem3.title')}</h3>
                <p className="text-sm text-gray-600">{t('diagnosis.commonProblems.problem3.description')}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{t('diagnosis.commonProblems.problem4.title')}</h3>
                <p className="text-sm text-gray-600">{t('diagnosis.commonProblems.problem4.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
