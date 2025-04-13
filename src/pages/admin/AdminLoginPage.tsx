import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Link } from 'react-router-dom';
import { LoginCredentials } from '../../services/auth.service';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from '@/utils/i18n';
import { Logo } from '@/components/ui/Logo';

export const AdminLoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();

  const loginSchema = z.object({
    email: z.string().email(t('adminLogin.invalidEmail')),
    password: z.string().min(1, t('adminLogin.passwordRequired')),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data as LoginCredentials);
    } catch (error) {
      // Les erreurs sont déjà gérées dans le contexte d'authentification
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="fixed top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <Logo size={32} />
        <h1 className="text-2xl font-bold text-green-500">Twiza</h1>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('adminLogin.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('adminLogin.email')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder={t('adminLogin.emailPlaceholder')} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('adminLogin.password')}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <Link
                  to="/admin/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {t('adminLogin.forgotPassword')}
                </Link>
              </div>
              <Button type="submit" className="w-full">
                {t('adminLogin.signIn')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}; 