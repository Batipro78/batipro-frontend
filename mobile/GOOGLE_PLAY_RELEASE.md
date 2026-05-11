# MonDevisMinute — Guide de publication Google Play

Ce guide liste **toutes** les étapes manuelles pour publier la v1.0.0 sur le Google Play Store. Lis-le en entier avant de commencer.

---

## 0. Pré-requis (à faire une seule fois)

### 0.1. Compte Google Play Console
1. Va sur https://play.google.com/console/signup
2. Connecte-toi avec le compte Google que tu veux utiliser (Fethi : ameur.fethi78@gmail.com)
3. Choisis le type **Développeur individuel** (ou Organisation si tu as une SARL/SAS)
4. Paye les **25 € de frais d'inscription** (one-shot, à vie)
5. Vérifie ton identité (photo de pièce d'identité + adresse) — peut prendre 1 à 7 jours

### 0.2. Compte Expo (EAS)
Si pas déjà fait :
```sh
cd mobile
npx eas login
```
Identifiants : ceux du compte Expo lié au `projectId` `6886c377-4d2e-41a0-992f-69820954675e` dans `app.json`.

### 0.3. Service account Google pour `eas submit` (optionnel mais recommandé)
Permet de soumettre automatiquement depuis la CLI sans uploader manuellement le `.aab`.

1. Va sur https://console.cloud.google.com/iam-admin/serviceaccounts
2. Crée un projet GCP s'il n'en existe pas
3. **Create service account** : nom `eas-submit-mondevisminute`
4. Skip les rôles GCP (pas nécessaire)
5. Une fois créée → onglet **Keys** → **Add Key** → **JSON** → télécharge le fichier
6. Renomme le en `google-play-service-account.json` et place-le dans `mobile/` (déjà dans `.gitignore`)
7. Dans Google Play Console → **Setup** → **API access** → lie le projet GCP → invite ton service account → donne les permissions **Release manager** + **Release Apps**

Si tu veux skipper le service account pour la v1, tu peux uploader le `.aab` manuellement dans Play Console (voir étape 4).

---

## 1. Vérifier la branche et l'état du code

```sh
cd C:/Users/fethiameur/batipro-frontend
git branch --show-current   # doit afficher: mondevisminute-mobile
git status                  # doit être clean
```

Tous les commits doivent être pushés sur `origin/mondevisminute-mobile`.

---

## 2. Tester l'app avant le build

Avant de claquer un build EAS (10-20 min, billable en quota), valide rapidement que rien n'est cassé :

### Option A — Web (rapide, pas de firewall)
```sh
cd mobile
npx expo start --web
```
Ouvre dans Chrome, teste : login → CGU modal → création devis vocal (micro) → signature → conversion facture.
Le canvas signature ne marche PAS sur web — c'est normal, c'est une feature mobile-only.

### Option B — APK preview cloud (test sur vrai téléphone Android, ~10 min)
```sh
cd mobile
npx eas build --profile preview --platform android
```
À la fin, EAS te donne une URL pour télécharger l'APK. Installe-le sur ton Android, teste **tout** : devis vocal (signature canvas inclus), upload logo, abonnement Stripe (annule juste après la redirection si tu veux pas payer).

**Si tu reportes un bug en production, c'est trop tard.** Sois minutieux ici.

---

## 3. Build de production (AAB pour Google Play)

```sh
cd mobile
npx eas build --profile production --platform android
```

Ce que ça fait :
- Compile dans le cloud Expo (~10-20 min)
- Génère un Android App Bundle (`.aab`) signé
- `autoIncrement: true` dans eas.json → bumpe automatiquement le `versionCode` Android
- `appVersionSource: remote` → la version est stockée sur EAS, pas dans git

Tu récupères une URL de téléchargement à la fin. **Télécharge le `.aab` localement** au cas où tu ne veux pas utiliser `eas submit`.

---

## 4. Soumettre à Google Play

### Option A — Avec service account (recommandé, automatique)
```sh
cd mobile
npx eas submit --profile production --platform android --latest
```
Le `.aab` du dernier build production est envoyé dans le track **internal** (cf. eas.json) en mode **draft**. Tu finis la soumission dans Play Console (voir étape 5).

### Option B — Manuel via Play Console
1. Télécharge le `.aab` depuis la page du build EAS
2. Va sur https://play.google.com/console
3. **Create app** : nom `MonDevisMinute`, langue par défaut FR, type `App`, gratuit, accepte les déclarations
4. Side menu → **Production** ou **Internal testing** (recommandé pour la 1ère release)
5. **Create new release** → upload le `.aab`

---

## 5. Remplir la fiche Play Console

### 5.1. App content (obligatoire avant publication)

| Section | Réponse pour MonDevisMinute |
|---|---|
| **Privacy Policy** | `https://mondevisminute.com/confidentialite` |
| **App access** | "All functionality is available without special access" → laisser vide (pas de credentials test à fournir car compte d'essai gratuit). Si Google Review demande un compte test, créer `play-review@mondevisminute.com` avec mot de passe pré-rempli. |
| **Ads** | Non (pas de pub dans l'app) |
| **Content rating** | Remplir le questionnaire → catégorie **Business**, pas de contenu sensible → résultat normalement **Everyone / PEGI 3** |
| **Target audience** | **18+** (artisans pros, pas pour mineurs) |
| **News app** | Non |
| **COVID-19 contact tracing** | Non |
| **Data safety** | Voir 5.4 ci-dessous |
| **Government app** | Non |
| **Financial features** | **Cocher "Manages user-initiated transactions"** (Stripe). Joindre une déclaration : "Subscription management via Stripe — managed by the user from the Subscription page or Stripe customer portal" |

### 5.2. Store listing (FR par défaut)

**App name** (30 chars max) :
```
MonDevisMinute
```

**Short description** (80 chars max) :
```
Devis et factures pour artisans BTP. Dictée vocale, signature, IA.
```

**Full description** (4000 chars max) :
```
MonDevisMinute est l'application tout-en-un pour les artisans du bâtiment qui veulent gagner du temps sur leur administratif.

CRÉEZ DES DEVIS À LA VOIX
Dictez votre prestation en quelques secondes. L'IA structure le devis pour vous : intitulé, lignes, prix au m² ou forfait, TVA, retenue de garantie. Vous validez, vous envoyez.

DEVIS, FACTURES, SIGNATURE
- Création manuelle ou vocale
- Signature client directement sur l'écran de votre téléphone
- Conversion devis → facture en un tap
- Factures de situation (acomptes)
- Retenue de garantie

GESTION CLIENTS COMPLÈTE
- Base clients B2C, B2B, B2G
- Recherche rapide
- Historique des devis et factures
- Coordonnées synchronisées entre tous vos documents

CONFORME ET PROFESSIONNEL
- Mentions obligatoires : SIRET, TVA, RCS/RM
- Assurance décennale affichée
- Logo de votre entreprise sur tous les documents
- Export PDF aux normes

POUR QUI ?
Plombiers, électriciens, maçons, peintres, carreleurs, plaquistes, couvreurs, menuisiers, et tous les autres métiers du BTP.

ESSAI GRATUIT 14 JOURS
Sans engagement, sans carte bancaire pendant l'essai. Puis 29 €/mois ou 290 €/an (2 mois offerts).

DONNÉES PROTÉGÉES
Hébergement en Europe (RGPD), chiffrement, vos données vous appartiennent.

Une question ? contact@mondevisminute.com
```

### 5.3. Visuels (à préparer, dimensions exactes)

| Asset | Dimensions | Note |
|---|---|---|
| **App icon** | 512×512 PNG | Généré automatiquement par EAS à partir de `assets/icon.png` |
| **Feature graphic** | 1024×500 PNG | **À créer** — bannière marketing, ex : "MonDevisMinute — Devis vocaux pour artisans" sur fond navy |
| **Phone screenshots** | 1080×1920 minimum (16:9) | **Minimum 2, idéalement 4-8.** À prendre depuis un device physique ou émulateur. Suggestions : 1. Login/Splash, 2. Dashboard, 3. Création devis vocale (en train d'enregistrer), 4. Détail devis avec signature, 5. Facture avec paiements, 6. Profil + logo |
| **7" tablet screenshots** | Optionnel — skip pour v1 | |
| **10" tablet screenshots** | Optionnel — skip pour v1 | |

**Pour faire les screenshots** : démarre `npx expo start --web` ou installe l'APK preview sur ton phone. Capture d'écran natif Android (Power + Volume bas). Crop si nécessaire en 1080×1920.

### 5.4. Data safety (très important — Play Store rejette si mal rempli)

Section par section :

**Data collection** : **Oui**, l'app collecte des données

**Data types collected** (cocher) :
- Personal info → Name, Email address, Phone number, Address
- Financial info → Purchase history (via Stripe)
- App activity → App interactions (analytics)
- Device or other IDs → Si tu n'as pas d'analytics, **NON**. Si tu utilises Firebase Analytics ou similaire, **OUI**.

**For each data type**, déclare :
- **Collected** : Yes
- **Shared with third parties** : Yes (Stripe pour paiements), Sinon No
- **Processing** : "Required for the app's functionality"
- **Optional** : No (sauf logo qui est optional)
- **Encrypted in transit** : Yes
- **Can users request deletion** : **Yes** (à implémenter — voir TODO RGPD ci-dessous)

**Security practices** :
- Data encrypted in transit : **Yes**
- Users can request data deletion : **Yes** — endpoints `GET /auth/rgpd/export` et `POST /auth/rgpd/delete` en place côté backend, UI dans **Profil → Mes données** (mobile + web). Anonymisation immédiate via fonction Postgres `anonymize_artisan`, audit dans `rgpd_logs`.

### 5.5. Pricing & distribution
- Free (l'achat in-app sera géré via Stripe, pas Google Play Billing → **important** : ne PAS cocher "Contains ads" ni "In-app products" car le paiement est externe)

⚠️ **Attention sur le sujet paiement externe** : Google exige que les apps utilisent Google Play Billing pour les abonnements numériques **sauf** si l'app est en categorie B2B SaaS comme MonDevisMinute. C'est notre cas (gestion d'entreprise), donc Stripe est autorisé. Mais si Google rejette, il faudra documenter ce point dans la review.

---

## 6. Internal testing → Production

**Workflow recommandé** :

1. **Internal testing** (track `internal` dans eas.json) — déploiement instantané, jusqu'à 100 testeurs invités par email. Pas de review Google.
2. Teste pendant 1-3 jours, fixe les bugs trouvés, push une 1.0.1 si besoin
3. Promouvoir le release de `internal` → **Closed testing** ou directement **Production** depuis Play Console
4. **Production review** : 1 à 7 jours par Google. Si OK, l'app est publique sur le Play Store.

Pour la v1 je recommande **internal → production** directement (skip closed testing) pour aller vite.

---

## 7. Après publication

### 7.1. Lien Play Store
Sous la forme : `https://play.google.com/store/apps/details?id=com.mondevisminute.mobile`
À ajouter sur la landing `mondevisminute.com` (CTA "Télécharger sur Google Play" avec le badge officiel : https://play.google.com/intl/en_us/badges/).

### 7.2. Monitoring
- Play Console → **Vitals** → suit les crashs ANR/JS
- EAS Dashboard → suit les builds
- Sentry (optionnel, pas installé) → suit les erreurs runtime

### 7.3. Mises à jour
Pour pousser une mise à jour :
1. Bump `version` dans `app.json` (1.0.0 → 1.0.1)
2. `npx eas build --profile production --platform android` (le versionCode s'incrémente auto)
3. `npx eas submit --profile production --platform android --latest`
4. Promouvoir depuis le track internal vers production dans Play Console

---

## TODO avant lancement public

- [x] **Backend RGPD** : `POST /auth/rgpd/consent`, `GET /auth/rgpd/export`, `POST /auth/rgpd/delete` (avec confirmation password) — déjà en place + migration `013_rgpd_compliance.sql` + UI Profil → Mes données mobile + web
- [ ] **Deep links** : configurer Android App Links via `assetlinks.json` sur `mondevisminute.com` pour que les liens reset-password/verify-email s'ouvrent dans l'app (cf. note dans memory `project_mondevisminute_mobile.md`)
- [ ] **Feature graphic 1024×500** : créer la bannière Play Store
- [ ] **Screenshots** : 4-6 captures depuis un vrai device
- [ ] **Privacy Policy** : vérifier que `mondevisminute.com/confidentialite` mentionne explicitement Stripe, le traitement des données, et le contact RGPD
- [ ] **CGU web** : vérifier que `mondevisminute.com/cgu` est à jour (le mobile envoie déjà l'utilisateur l'accepter via la CGUModal)
- [ ] **Service account Google Play** : créer le fichier JSON (étape 0.3) si tu veux `eas submit` automatique
- [ ] **Compte de review Google** : créer `play-review@mondevisminute.com` avec un mot de passe simple, mettre en premium gratuit, fournir dans Play Console pour que les reviewers Google puissent tester

---

## Liens utiles

- Play Console : https://play.google.com/console
- EAS Dashboard : https://expo.dev/accounts/[ton-compte]/projects/mondevisminute-mobile
- Docs EAS Submit : https://docs.expo.dev/submit/android/
- Badge officiel Play Store : https://play.google.com/intl/en_us/badges/
