
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/utils/i18n';
import { Heart } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-50 to-emerald-50">
      <div className="text-center space-y-6">
        <Heart className="h-20 w-20 text-primary mx-auto mb-4" strokeWidth={1.5} />
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-3xl font-bold text-primary">{t('notFound.title')}</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          {t('notFound.message')}
        </p>
        <Button
          onClick={() => navigate('/')}
          className="bg-primary hover:bg-primary/90"
        >
          {t('notFound.backHome')}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
