import { create } from 'zustand';

// Languages supported by the application
export type Language = 'fr' | 'en' | 'ar';

export const languages: Record<Language, string> = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية'
};

// Types for translation keys
type TranslationKey =
  | 'dashboard'
  | 'campaigns'
  | 'users'
  | 'settings'
  | 'logout'
  | 'adminLogin.title'
  | 'adminLogin.email'
  | 'adminLogin.emailPlaceholder'
  | 'adminLogin.password'
  | 'adminLogin.forgotPassword'
  | 'adminLogin.signIn'
  | 'adminLogin.emailRequired'
  | 'adminLogin.passwordRequired'
  | 'adminLogin.invalidEmail'
  | 'forgotPassword.title'
  | 'forgotPassword.description'
  | 'forgotPassword.email'
  | 'forgotPassword.emailPlaceholder'
  | 'forgotPassword.submit'
  | 'forgotPassword.backToLogin'
  | 'forgotPassword.invalidEmail'
  | 'forgotPassword.successMessage'
  | 'forgotPassword.errorMessage'
  | 'login.title'
  | 'login.welcome'
  | 'login.email'
  | 'login.emailPlaceholder'
  | 'login.emailInvalid'
  | 'login.password'
  | 'login.passwordPlaceholder'
  | 'login.passwordLength'
  | 'login.signIn'
  | 'login.showPassword'
  | 'login.hidePassword'
  | 'notFound.title'
  | 'notFound.message'
  | 'notFound.backHome'
  // Additional translation keys for dashboard
  | 'welcome'
  | 'lastUpdated'
  | 'totalUsers'
  | 'totalCampaigns'
  | 'activeCampaigns'
  | 'totalDonations'
  | 'todayDonations'
  | 'thisMonth'
  | 'statistics'
  | 'recentDonations'
  | 'recentCampaigns'
  | 'name'
  | 'email'
  | 'amount'
  | 'campaign'
  | 'date'
  | 'title'
  | 'creator'
  | 'goal'
  | 'raised'
  | 'status'
  | 'actions'
  | 'pending'
  | 'active'
  | 'completed'
  | 'cancelled';

// Type for locale
type Locale = Language;

// Type for text direction
type Direction = 'ltr' | 'rtl';

const locales: Record<Locale, Record<TranslationKey, string>> = {
  fr: {
    dashboard: 'Tableau de bord',
    campaigns: 'Campagnes',
    users: 'Utilisateurs',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    'adminLogin.title': 'Connexion Administrateur',
    'adminLogin.email': 'Email',
    'adminLogin.emailPlaceholder': 'admin@twiza.org',
    'adminLogin.password': 'Mot de passe',
    'adminLogin.forgotPassword': 'Mot de passe oublié ?',
    'adminLogin.signIn': 'Se connecter',
    'adminLogin.emailRequired': 'L\'email est requis',
    'adminLogin.passwordRequired': 'Le mot de passe est requis',
    'adminLogin.invalidEmail': 'Email invalide',
    'forgotPassword.title': 'Réinitialisation du mot de passe',
    'forgotPassword.description': 'Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe',
    'forgotPassword.email': 'Email',
    'forgotPassword.emailPlaceholder': 'Entrez votre email',
    'forgotPassword.submit': 'Envoyer le lien',
    'forgotPassword.backToLogin': 'Retour à la connexion',
    'forgotPassword.invalidEmail': 'Email invalide',
    'forgotPassword.successMessage': 'Si votre email existe dans notre base de données, vous recevrez un lien de réinitialisation',
    'forgotPassword.errorMessage': 'Une erreur est survenue. Veuillez réessayer plus tard.',
    'login.title': 'Connexion',
    'login.welcome': 'Bienvenue sur le panneau d\'administration Twiza',
    'login.email': 'Email',
    'login.emailPlaceholder': 'Entrez votre email',
    'login.emailInvalid': 'Format d\'email invalide',
    'login.password': 'Mot de passe',
    'login.passwordPlaceholder': 'Entrez votre mot de passe',
    'login.passwordLength': 'Le mot de passe doit contenir au moins 6 caractères',
    'login.signIn': 'Se connecter',
    'login.showPassword': 'Afficher le mot de passe',
    'login.hidePassword': 'Masquer le mot de passe',
    'notFound.title': 'Page non trouvée',
    'notFound.message': 'La page que vous recherchez n\'existe pas ou a été déplacée.',
    'notFound.backHome': 'Retourner à l\'accueil',
    welcome: 'Tableau de bord',
    lastUpdated: 'Dernière mise à jour',
    totalUsers: 'Total des utilisateurs',
    totalCampaigns: 'Total des campagnes',
    activeCampaigns: 'Campagnes actives',
    totalDonations: 'Total des dons',
    todayDonations: 'Dons du jour',
    thisMonth: 'Ce mois-ci',
    statistics: 'Statistiques des dons',
    recentDonations: 'Dons récents',
    recentCampaigns: 'Campagnes récentes',
    name: 'Nom',
    email: 'Email',
    amount: 'Montant',
    campaign: 'Campagne',
    date: 'Date',
    title: 'Titre',
    creator: 'Créateur',
    goal: 'Objectif',
    raised: 'Collecté',
    status: 'Statut',
    actions: 'Actions',
    pending: 'En attente',
    active: 'Actif',
    completed: 'Terminé',
    cancelled: 'Annulé'
  },
  en: {
    dashboard: 'Dashboard',
    campaigns: 'Campaigns',
    users: 'Users',
    settings: 'Settings',
    logout: 'Logout',
    'adminLogin.title': 'Administrator Login',
    'adminLogin.email': 'Email',
    'adminLogin.emailPlaceholder': 'admin@twiza.org',
    'adminLogin.password': 'Password',
    'adminLogin.forgotPassword': 'Forgot password?',
    'adminLogin.signIn': 'Sign in',
    'adminLogin.emailRequired': 'Email is required',
    'adminLogin.passwordRequired': 'Password is required',
    'adminLogin.invalidEmail': 'Invalid email',
    'forgotPassword.title': 'Password Reset',
    'forgotPassword.description': 'Enter your email address to receive a password reset link',
    'forgotPassword.email': 'Email',
    'forgotPassword.emailPlaceholder': 'Enter your email',
    'forgotPassword.submit': 'Send Link',
    'forgotPassword.backToLogin': 'Back to Login',
    'forgotPassword.invalidEmail': 'Invalid email',
    'forgotPassword.successMessage': 'If your email exists in our database, you will receive a reset link',
    'forgotPassword.errorMessage': 'An error occurred. Please try again later.',
    'login.title': 'Login',
    'login.welcome': 'Welcome to Twiza Admin Panel',
    'login.email': 'Email',
    'login.emailPlaceholder': 'Enter your email',
    'login.emailInvalid': 'Invalid email format',
    'login.password': 'Password',
    'login.passwordPlaceholder': 'Enter your password',
    'login.passwordLength': 'Password must be at least 6 characters',
    'login.signIn': 'Sign In',
    'login.showPassword': 'Show password',
    'login.hidePassword': 'Hide password',
    'notFound.title': 'Page Not Found',
    'notFound.message': 'The page you are looking for doesn\'t exist or has been moved.',
    'notFound.backHome': 'Return to Home',
    welcome: 'Dashboard',
    lastUpdated: 'Last updated',
    totalUsers: 'Total users',
    totalCampaigns: 'Total campaigns',
    activeCampaigns: 'Active campaigns',
    totalDonations: 'Total donations',
    todayDonations: 'Today\'s donations',
    thisMonth: 'This month',
    statistics: 'Donation statistics',
    recentDonations: 'Recent donations',
    recentCampaigns: 'Recent campaigns',
    name: 'Name',
    email: 'Email',
    amount: 'Amount',
    campaign: 'Campaign',
    date: 'Date',
    title: 'Title',
    creator: 'Creator',
    goal: 'Goal',
    raised: 'Raised',
    status: 'Status',
    actions: 'Actions',
    pending: 'Pending',
    active: 'Active',
    completed: 'Completed',
    cancelled: 'Cancelled'
  },
  ar: {
    dashboard: 'لوحة التحكم',
    campaigns: 'الحملات',
    users: 'المستخدمين',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    'adminLogin.title': 'تسجيل دخول المسؤول',
    'adminLogin.email': 'البريد الإلكتروني',
    'adminLogin.emailPlaceholder': 'admin@twiza.org',
    'adminLogin.password': 'كلمة المرور',
    'adminLogin.forgotPassword': 'نسيت كلمة المرور؟',
    'adminLogin.signIn': 'تسجيل الدخول',
    'adminLogin.emailRequired': 'البريد الإلكتروني مطلوب',
    'adminLogin.passwordRequired': 'كلمة المرور مطلوبة',
    'adminLogin.invalidEmail': 'البريد الإلكتروني غير صالح',
    'forgotPassword.title': 'إعادة تعيين كلمة المرور',
    'forgotPassword.description': 'أدخل بريدك الإلكتروني لتلقي رابط إعادة تعيين كلمة المرور',
    'forgotPassword.email': 'البريد الإلكتروني',
    'forgotPassword.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'forgotPassword.submit': 'إرسال الرابط',
    'forgotPassword.backToLogin': 'العودة إلى تسجيل الدخول',
    'forgotPassword.invalidEmail': 'البريد الإلكتروني غير صالح',
    'forgotPassword.successMessage': 'إذا كان بريدك الإلكتروني موجودًا في قاعدة البيانات لدينا، فستتلقى رابط إعادة التعيين',
    'forgotPassword.errorMessage': 'حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا.',
    'login.title': 'تسجيل الدخول',
    'login.welcome': 'مرحبًا بك في لوحة إدارة تويزا',
    'login.email': 'البريد الإلكتروني',
    'login.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'login.emailInvalid': 'صيغة البريد الإلكتروني غير صالحة',
    'login.password': 'كلمة المرور',
    'login.passwordPlaceholder': 'أدخل كلمة المرور',
    'login.passwordLength': 'يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل',
    'login.signIn': 'تسجيل الدخول',
    'login.showPassword': 'إظهار كلمة المرور',
    'login.hidePassword': 'إخفاء كلمة المرور',
    'notFound.title': 'الصفحة غير موجودة',
    'notFound.message': 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    'notFound.backHome': 'العودة إلى الصفحة الرئيسية',
    welcome: 'لوحة التحكم',
    lastUpdated: 'آخر تحديث',
    totalUsers: 'إجمالي المستخدمين',
    totalCampaigns: 'إجمالي الحملات',
    activeCampaigns: 'الحملات النشطة',
    totalDonations: 'إجمالي التبرعات',
    todayDonations: 'تبرعات اليوم',
    thisMonth: 'هذا الشهر',
    statistics: 'إحصائيات التبرعات',
    recentDonations: 'التبرعات الأخيرة',
    recentCampaigns: 'الحملات الأخيرة',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    amount: 'المبلغ',
    campaign: 'الحملة',
    date: 'التاريخ',
    title: 'العنوان',
    creator: 'المنشئ',
    goal: 'الهدف',
    raised: 'تم جمع',
    status: 'الحالة',
    actions: 'الإجراءات',
    pending: 'قيد الانتظار',
    active: 'نشط',
    completed: 'مكتمل',
    cancelled: 'ملغي'
  },
};

// Determine text direction based on language
const getDirection = (locale: Locale): Direction => {
  return locale === 'ar' ? 'rtl' : 'ltr';
};

// Global state for translations
interface I18nStore {
  locale: Locale;
  direction: Direction;
  language: Language;  // Added language property
  setLocale: (locale: Locale) => void;
  setLanguage: (language: Language) => void;  // Added setLanguage function
}

export const useI18nStore = create<I18nStore>((set) => ({
  locale: 'fr',
  direction: 'ltr',
  language: 'fr',  // Initialize language
  setLocale: (locale: Locale) => set({ 
    locale, 
    direction: getDirection(locale),
    language: locale // Update language when locale changes
  }),
  setLanguage: (language: Language) => set({
    locale: language,
    language,
    direction: getDirection(language)
  }),
}));

// Hook for using translations
export const useTranslation = () => {
  const { locale, direction, setLocale, language, setLanguage } = useI18nStore();
  
  const t = (key: TranslationKey): string => {
    return locales[locale][key];
  };

  return {
    t,
    locale,
    direction,
    setLocale,
    language,
    setLanguage,
  };
};
