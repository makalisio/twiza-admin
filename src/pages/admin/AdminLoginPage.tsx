import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Link } from 'react-router-dom';
import { LoginCredentials } from '@/services/auth.service';
import { useTranslation } from '@/utils/i18n';
import { Heart } from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-50 to-emerald-50">
      <div className="fixed top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-md p-6">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-4">
            <Heart className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">Twiza</CardTitle>
          <p className="text-gray-600 text-sm">
            {t('adminLogin.welcome')}
          </p>
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
                        className="bg-white"
                        autoComplete="email"
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
                      <Input
                        type="password"
                        placeholder={t('adminLogin.passwordPlaceholder')}
                        className="bg-white"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Link
                  to="/admin/forgot-password"
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  {t('adminLogin.forgotPassword')}
                </Link>
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                {t('adminLogin.signIn')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}; 