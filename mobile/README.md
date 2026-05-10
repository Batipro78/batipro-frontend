# MonDevisMinute Mobile

Application mobile iOS / Android de MonDevisMinute — Expo + React Native + TypeScript.

Réutilise le backend du web (`batipro-backend.onrender.com`, hébergement technique inchangé).

## Stack

- **Expo SDK 52** + **React Native 0.76**
- **expo-router** (file-based navigation, identique à Next.js App Router)
- **expo-secure-store** pour stocker le JWT et le refreshToken
- **TypeScript** strict
- **@expo/vector-icons** (Ionicons)

## Périmètre actuel (MVP)

- Auth (login + signup avec essai 14 jours)
- Dashboard (stats + derniers devis)
- Liste des devis (statut, montant, ouverture du PDF)
- Liste des factures (type, statut, montant)
- Profil (info compte + déconnexion)

À venir : création vocale de devis, signature, partage WhatsApp, gestion clients/articles, écran abonnement Stripe.

## Démarrage

```bash
cd mobile
npm install
npm start
```

Puis scan du QR code avec **Expo Go** (iOS / Android), ou `i` / `a` pour les simulateurs.

## Configuration

L'URL du backend est définie dans `app.json` (`expo.extra.apiUrl`). Override possible via `.env` (cf `.env.example`).

## Architecture

```
mobile/
├── app/                    # expo-router (routes basées fichiers)
│   ├── _layout.tsx         # AuthProvider + SafeArea + StatusBar
│   ├── index.tsx           # redirige selon auth
│   ├── (auth)/             # stack non protégée
│   │   ├── login.tsx
│   │   └── signup.tsx
│   └── (app)/              # tabs protégés
│       ├── _layout.tsx     # garde d'auth + tab bar
│       ├── dashboard.tsx
│       ├── devis.tsx
│       ├── factures.tsx
│       └── profil.tsx
├── src/
│   ├── lib/
│   │   ├── api.ts          # fetch wrapper (équivalent web)
│   │   ├── auth.tsx        # AuthProvider (JWT + SecureStore)
│   │   ├── storage.ts      # SecureStore avec fallback web
│   │   └── theme.ts        # couleurs / spacing / radius
│   └── components/         # Button, Input, Card, Badge
└── app.json                # config Expo
```

## Différences clés avec le web

| Web                     | Mobile                          |
|-------------------------|---------------------------------|
| Next.js App Router      | expo-router (même conventions)  |
| `localStorage`          | `expo-secure-store`             |
| Tailwind CSS            | StyleSheet + tokens (`theme.ts`) |
| shadcn/ui               | Composants custom (`/components`) |
| `<Link href>` / Next    | `router.push()` / expo-router   |
| `window.location.href`  | `router.replace('/login')`      |
