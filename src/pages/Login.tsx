
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, LogIn, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/utils/i18n';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // Simulation d'une connexion réussie
      console.log('Login with:', data);
      
      // Navigation vers le tableau de bord après connexion
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-50 to-emerald-50">
      <div className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-16 w-16 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Twiza Admin</h1>
          <p className="text-gray-600 mt-2">{t('login.welcome')}</p>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-xl font-semibold text-center">{t('login.title')}</h2>
          </CardHeader>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('login.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('login.emailPlaceholder')}
                  autoComplete="email"
                  {...register('email', { 
                    required: t('login.emailRequired'),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t('login.emailInvalid')
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('login.password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t('login.passwordPlaceholder')}
                    autoComplete="current-password"
                    {...register('password', { 
                      required: t('login.passwordRequired'),
                      minLength: {
                        value: 6,
                        message: t('login.passwordLength')
                      }
                    })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={toggleShowPassword}
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="sr-only">
                      {showPassword ? t('login.hidePassword') : t('login.showPassword')}
                    </span>
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full flex items-center justify-center gap-2">
                <LogIn className="h-4 w-4" />
                {t('login.signIn')}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
