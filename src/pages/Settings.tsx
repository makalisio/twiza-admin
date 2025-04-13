
import React from 'react';
import { useTranslation } from '@/utils/i18n';
import { AdminLayout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { toast } from 'sonner';

const Settings = () => {
  const { t } = useTranslation();

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('General settings saved successfully!');
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Notification settings saved successfully!');
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Security settings saved successfully!');
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t('settings')}</h1>
          <LanguageSwitcher />
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres généraux</CardTitle>
                <CardDescription>
                  Gérer les paramètres généraux de votre plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveGeneral}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="site-name">Nom du site</Label>
                      <Input id="site-name" defaultValue="Twiza" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="site-description">Description du site</Label>
                      <Input id="site-description" defaultValue="Plateforme de crowdfunding" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="contact-email">Email de contact</Label>
                      <Input id="contact-email" type="email" defaultValue="contact@twiza.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="currency">Devise par défaut</Label>
                      <Input id="currency" defaultValue="EUR" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="platform-fee">Frais de plateforme (%)</Label>
                      <Input id="platform-fee" type="number" defaultValue="5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                      <Switch id="maintenance-mode" />
                    </div>
                    <Button type="submit" className="bg-twiza hover:bg-twiza-dark w-full">
                      Enregistrer les modifications
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de notifications</CardTitle>
                <CardDescription>
                  Gérer les notifications envoyées par la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveNotifications}>
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notifications par email</h3>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="new-campaign">Nouvelle campagne</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir une notification lorsqu'une nouvelle campagne est créée
                          </p>
                        </div>
                        <Switch id="new-campaign" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="new-donation">Nouveau don</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir une notification lorsqu'un nouveau don est effectué
                          </p>
                        </div>
                        <Switch id="new-donation" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="new-user">Nouvel utilisateur</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir une notification lorsqu'un nouvel utilisateur s'inscrit
                          </p>
                        </div>
                        <Switch id="new-user" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notifications système</h3>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="campaign-completed">Campagne terminée</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir une notification lorsqu'une campagne atteint son objectif
                          </p>
                        </div>
                        <Switch id="campaign-completed" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="campaign-expired">Campagne expirée</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir une notification lorsqu'une campagne arrive à expiration
                          </p>
                        </div>
                        <Switch id="campaign-expired" defaultChecked />
                      </div>
                    </div>
                    
                    <Button type="submit" className="bg-twiza hover:bg-twiza-dark w-full">
                      Enregistrer les modifications
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de sécurité</CardTitle>
                <CardDescription>
                  Gérer les paramètres de sécurité de votre compte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveSecurity}>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="current-password">Mot de passe actuel</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-password">Nouveau mot de passe</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Authentification à deux facteurs</h3>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="enable-2fa">Activer l'authentification à deux facteurs</Label>
                          <p className="text-sm text-muted-foreground">
                            Ajouter une couche de sécurité supplémentaire à votre compte
                          </p>
                        </div>
                        <Switch id="enable-2fa" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Sessions actives</h3>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Chrome sur Windows</p>
                            <p className="text-sm text-muted-foreground">Paris, France • Dernière activité il y a 2 heures</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Déconnecter
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Safari sur Mac</p>
                            <p className="text-sm text-muted-foreground">Lyon, France • Dernière activité il y a 5 jours</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Déconnecter
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="bg-twiza hover:bg-twiza-dark w-full">
                      Enregistrer les modifications
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
