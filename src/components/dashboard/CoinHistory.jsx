import React from 'react';
import { useTranslation } from 'react-i18next';

const CoinHistory = ({ coinHistory }) => {
  const { t } = useTranslation();

  if (!coinHistory || coinHistory.length === 0) {
    return <p className="text-gray-600">{t('coinHistory.noHistory')}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('coinHistory.title')}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {t('coinHistory.date')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {t('coinHistory.time')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {t('coinHistory.source')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {t('coinHistory.amount')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coinHistory.map((entry, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(entry.date).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {entry.source}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  +{entry.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinHistory;