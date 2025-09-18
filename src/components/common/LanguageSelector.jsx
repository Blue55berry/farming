import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, changeLanguage, supportedLanguages } = useLanguage();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (language) => {
    changeLanguage(language);
    setIsOpen(false);
  };

  const currentLanguageInfo = supportedLanguages.find(lang => lang.code === currentLanguage) || supportedLanguages[0] || { code: 'en', name: 'English' };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="flex items-center space-x-1 text-gray-700 hover:text-leaf-green"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentLanguageInfo.name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-10">
          {supportedLanguages.map((language) => (
            <button
              key={language.code}
              className={`block w-full text-left px-4 py-2 text-sm ${
                language.code === currentLanguage ? 'bg-green-50 text-leaf-green' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => handleLanguageChange(language.code)}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
