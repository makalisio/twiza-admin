import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const fr = {
  // Titres des pages
  adminDashboard: 'Tableau de bord administrateur',
  
  // Statistiques
  totalUsers: 'Utilisateurs totaux',
  totalDonations: 'Total des dons',
  activeCampaigns: 'Campagnes actives',
  totalCampaigns: 'Total des campagnes',
  
  // Graphique
  statistics: 'Statistiques des dons',
  
  // Tableau des campagnes
  recentCampaigns: 'Campagnes récentes',
  title: 'Titre',
  creator: 'Créateur',
  goal: 'Objectif',
  raised: 'Collecté',
  status: 'Statut',
  actions: 'Actions',
  
  // États des campagnes
  pending: 'En attente',
  active: 'Active',
  completed: 'Terminée',
  cancelled: 'Annulée',
  
  // Menu
  dashboard: 'Tableau de bord',
  campaigns: 'Campagnes',
  users: 'Utilisateurs',
  settings: 'Paramètres',
  logout: 'Déconnexion',

  // Page de connexion admin
  adminLogin: {
    title: 'Connexion administrateur',
    email: 'Email',
    emailPlaceholder: 'Entrez votre email',
    password: 'Mot de passe',
    signIn: 'Se connecter',
    invalidEmail: 'Email invalide',
    passwordRequired: 'Le mot de passe est requis',
    forgotPassword: 'Mot de passe oublié ?'
  },

  // Page de réinitialisation du mot de passe
  forgotPassword: {
    title: 'Réinitialisation du mot de passe',
    description: 'Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe',
    email: 'Email',
    emailPlaceholder: 'Entrez votre email',
    submit: 'Envoyer le lien',
    backToLogin: 'Retour à la connexion',
    invalidEmail: 'Email invalide',
    successMessage: 'Si votre email existe dans notre base de données, vous recevrez un lien de réinitialisation',
    errorMessage: 'Une erreur est survenue. Veuillez réessayer plus tard.'
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: fr
      }
    },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 