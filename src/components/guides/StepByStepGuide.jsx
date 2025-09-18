import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const StepByStepGuide = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index) => {
    setCurrentStep(index);
  };

  if (!steps || steps.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">{t('guides.noSteps')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 bg-gray-50 p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('guides.steps')}</h2>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`w-full text-left p-3 rounded-md transition-colors ${
                  currentStep === index
                    ? 'bg-leaf-green text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                    currentStep === index ? 'bg-white text-leaf-green' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="font-medium truncate">{step.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="md:w-3/4 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-800">
              {t('guides.step')} {currentStep + 1}: {steps[currentStep].title}
            </h3>
            <div className="text-sm text-gray-500">
              {currentStep + 1} / {steps.length}
            </div>
          </div>
          
          {steps[currentStep].image && (
            <div className="mb-6">
              <img
                src={steps[currentStep].image}
                alt={steps[currentStep].title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700">{steps[currentStep].description}</p>
          </div>
          
          {steps[currentStep].video && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{t('guides.instructionalVideo')}</h4>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={steps[currentStep].video}
                  title={steps[currentStep].title}
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`inline-flex items-center px-4 py-2 rounded-md ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t('guides.previous')}
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className={`inline-flex items-center px-4 py-2 rounded-md ${
                currentStep === steps.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-leaf-green text-white hover:bg-green-700'
              }`}
            >
              {t('guides.next')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepByStepGuide;
