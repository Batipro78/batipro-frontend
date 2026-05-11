# MonDevisMinute Mobile

Application mobile iOS / Android de MonDevisMinute — Expo + React Native + TypeScript.

Réutilise le backend du web (`batipro-backend.onrender.com`, hébergement technique inchangé).

## Stack

- **Expo SDK 52** + **React Native 0.76**
- **expo-router** (file-based navigation, identique à Next.js App Router)
- **expo-secure-store** pour stocker le JWT et le refreshToken
- **TypeScript** strict
- **@expo/vector-icons** (Ionicons)

## Périmètre actuel (v1.0.0 — prêt pour Google Play)

- Auth (signup + login + reset/verify-email avec deep links)
- CGU modal non-fermable au premier login
- Dashboard (stats + derniers devis)
- Devis : création **vocale** (IA via /voice/generate) + manuelle, détail PDF, signature client (canvas), conversion en facture, partage natif
- Factures : factures de situation (acomptes), retenue de garantie, paiements multi-méthodes
- Clients CRUD complet (B2C / B2B / B2G)
- Profil édition complète 13 champs + upload logo (expo-image-picker)
- Abonnement Stripe (checkout + portail via expo-web-browser)
- **RGPD** : export JSON + suppression compte avec anonymisation (Profil → Mes données)

## Publication Google Play

Voir [`GOOGLE_PLAY_RELEASE.md`](./GOOGLE_PLAY_RELEASE.md) pour le guide complet : compte Play Console, EAS build/submit, fiche store, data safety form, Android App Links.

## Démarrage

```bash
cd mobile
npm install
npm start
```

Puis scan du QR code avec **Expo Go** (iOS / Android), ou `i` / `a` pour les simulateurs.

> ⚠️ Le canvas de signature et l'audio dans Expo Go ont des limitations. Pour un test complet, utiliser un **EAS Build preview** :
> ```bash
> npx eas build --profile preview --platform android
> ```
> Puis installer l'APK sur un device Android (~10 min de build cloud).

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
