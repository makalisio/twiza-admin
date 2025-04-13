import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '@/utils/i18n';
import { Logo } from '@/components/ui/Logo';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';

export const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const forgotPasswordSchema = z.object({
    email: z.string().email(t('forgotPassword.invalidEmail')),
  });

  type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await authService.requestPasswordReset(data.email);
      toast.success(t('forgotPassword.successMessage')); 
      navigate('/admin/login');
    } catch (error) {
      toast.error(t('forgotPassword.errorMessage'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <Logo size={32} />
        <h1 className="text-2xl font-bold text-green-500">Twiza</h1>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">{t('forgotPassword.title')}</CardTitle>
          <CardDescription>
            {t('forgotPassword.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('forgotPassword.email')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder={t('forgotPassword.emailPlaceholder')}
                        autoComplete="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="w-full">
                  {t('forgotPassword.submit')}
                </Button>
                <Link
                  to="/admin/login"
                  className="text-sm text-center text-blue-600 hover:text-blue-800"
                >
                  {t('forgotPassword.backToLogin')}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}; 