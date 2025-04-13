import { useTranslation as useI18nTranslation } from 'react-i18next';
import './config';

export const useTranslation = () => {
  const { t } = useI18nTranslation();
  return { t };
}; 