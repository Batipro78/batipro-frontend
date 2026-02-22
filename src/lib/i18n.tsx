'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Locale = 'fr' | 'en';

const translations = {
  fr: {
    // Navigation
    dashboard: 'Tableau de bord',
    clients: 'Clients',
    articles: 'Articles',
    devis: 'Devis',
    factures: 'Factures',
    voiceAi: 'IA Vocale',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    // Common
    add: 'Ajouter',
    edit: 'Modifier',
    delete: 'Supprimer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    search: 'Rechercher',
    actions: 'Actions',
    loading: 'Chargement...',
    noData: 'Aucune donnée',
    confirm: 'Confirmer',
    back: 'Retour',
    name: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    address: 'Adresse',
    city: 'Ville',
    zipCode: 'Code postal',
    status: 'Statut',
    date: 'Date',
    total: 'Total',
    // Login
    loginTitle: 'Connexion à BatiPro',
    loginSubtitle: 'Entrez vos identifiants pour accéder à votre espace',
    password: 'Mot de passe',
    loginButton: 'Se connecter',
    loginError: 'Email ou mot de passe incorrect',
    // Dashboard
    totalDevis: 'Total Devis',
    totalFactures: 'Total Factures',
    caMonth: 'CA du mois',
    pendingDevis: 'Devis en attente',
    recentDevis: 'Devis récents',
    // Clients
    addClient: 'Ajouter un client',
    editClient: 'Modifier le client',
    deleteClient: 'Supprimer le client',
    confirmDeleteClient: 'Voulez-vous vraiment supprimer ce client ?',
    firstName: 'Prénom',
    // Articles
    addArticle: 'Ajouter un article',
    editArticle: "Modifier l'article",
    unitPrice: 'Prix HT',
    unit: 'Unité',
    tva: 'TVA',
    trade: 'Métier',
    electrician: 'Électricien',
    plumber: 'Plombier',
    // Devis
    addDevis: 'Nouveau devis',
    devisNumber: 'Numéro',
    client: 'Client',
    totalHT: 'Total HT',
    totalTTC: 'Total TTC',
    draft: 'Brouillon',
    sent: 'Envoyé',
    signed: 'Signé',
    rejected: 'Refusé',
    lines: 'Lignes',
    quantity: 'Quantité',
    // Factures
    invoiceNumber: 'N° Facture',
    generatePdf: 'Générer PDF',
    // Voice AI
    voiceTitle: 'Devis par commande vocale',
    voiceSubtitle: 'Décrivez les travaux à réaliser, l\'IA créera le devis',
    startRecording: 'Démarrer l\'enregistrement',
    stopRecording: 'Arrêter',
    processing: 'Traitement en cours...',
    selectClient: 'Sélectionnez un client',
  },
  en: {
    // Navigation
    dashboard: 'Dashboard',
    clients: 'Clients',
    articles: 'Articles',
    devis: 'Quotes',
    factures: 'Invoices',
    voiceAi: 'Voice AI',
    settings: 'Settings',
    logout: 'Logout',
    // Common
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    search: 'Search',
    actions: 'Actions',
    loading: 'Loading...',
    noData: 'No data',
    confirm: 'Confirm',
    back: 'Back',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    zipCode: 'Zip code',
    status: 'Status',
    date: 'Date',
    total: 'Total',
    // Login
    loginTitle: 'Login to BatiPro',
    loginSubtitle: 'Enter your credentials to access your workspace',
    password: 'Password',
    loginButton: 'Sign in',
    loginError: 'Invalid email or password',
    // Dashboard
    totalDevis: 'Total Quotes',
    totalFactures: 'Total Invoices',
    caMonth: 'Monthly Revenue',
    pendingDevis: 'Pending Quotes',
    recentDevis: 'Recent Quotes',
    // Clients
    addClient: 'Add client',
    editClient: 'Edit client',
    deleteClient: 'Delete client',
    confirmDeleteClient: 'Are you sure you want to delete this client?',
    firstName: 'First name',
    // Articles
    addArticle: 'Add article',
    editArticle: 'Edit article',
    unitPrice: 'Unit price (excl. tax)',
    unit: 'Unit',
    tva: 'VAT',
    trade: 'Trade',
    electrician: 'Electrician',
    plumber: 'Plumber',
    // Devis
    addDevis: 'New quote',
    devisNumber: 'Number',
    client: 'Client',
    totalHT: 'Total (excl. tax)',
    totalTTC: 'Total (incl. tax)',
    draft: 'Draft',
    sent: 'Sent',
    signed: 'Signed',
    rejected: 'Rejected',
    lines: 'Lines',
    quantity: 'Quantity',
    // Factures
    invoiceNumber: 'Invoice #',
    generatePdf: 'Generate PDF',
    // Voice AI
    voiceTitle: 'Voice-powered quote',
    voiceSubtitle: 'Describe the work to be done, AI will create the quote',
    startRecording: 'Start recording',
    stopRecording: 'Stop',
    processing: 'Processing...',
    selectClient: 'Select a client',
  },
} as const;

type TranslationKey = keyof typeof translations.fr;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr');

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
