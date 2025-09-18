import { useTranslation } from 'react-i18next';
import GuideList from '../components/guides/GuideList';

const Guides = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{t('guides.title')}</h1>
      <GuideList />
    </div>
  );
};

export default Guides;
