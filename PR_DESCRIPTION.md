# PR : `mondevisminute-mobile` → `main`

> **À copier-coller** dans la description de la PR quand tu l'ouvres via GitHub UI :
> https://github.com/Batipro78/batipro-frontend/pull/new/mondevisminute-mobile

---

## Résumé

App mobile MonDevisMinute v1.0.0 (Expo + React Native + TypeScript) **code-complete et prête pour Google Play**. Parité fonctionnelle 100% avec le web. Pages légales web + RGPD ajoutés en bonus.

## Périmètre

### Mobile (app/(app)/_layout.tsx + nouveaux écrans)
- **Auth complète** : signup, login, CGU modal non-fermable, forgot/reset/verify-email screens
- **Tabs** : Dashboard, Devis, Factures, Clients, Profil (+ Articles/Abonnement cachés)
- **Devis vocal** : enregistrement micro → Whisper transcription → IA structurée
- **Devis manuel** : création + édition libre
- **Détail devis** : PDF, signature canvas (`react-native-signature-canvas`), facturation situation, conversion finale, partage natif
- **Factures** : détail, paiements 4 méthodes, retenue de garantie
- **Clients CRUD** : B2C / B2B / B2G, recherche, long-press delete
- **Profil 13 champs** : nom, SIRET, adresse, TVA, RCS/RM, assurance décennale × 3 + upload logo via `expo-image-picker`
- **Abonnement Stripe** : checkout + portail via `expo-web-browser.openBrowserAsync`, refreshAuth au retour
- **RGPD** : Profil → Mes données → Export JSON via RN Share API + Suppression compte (modal 2-steps avec password + saisie "SUPPRIMER")
- **Assets** : icon 1024×1024 + adaptive-icon 1024×1024 + splash 1242×2436 + favicon + feature-graphic 1024×500 (Play Store)
- **Android App Links** : `intentFilters` autoVerify pour `mondevisminute.com/reset-password` et `/verify-email`
- **EAS config** : `eas.json` production buildType app-bundle, autoIncrement, submit Play track internal

### Web
- **Pages légales** : `/cgu` et `/confidentialite` (11 sections RGPD complètes, conformes pour Play Store data safety form)
- **Footer landing** : nouvelle colonne "Légal" avec CGU + Confidentialité + Contact
- **Sitemap.ts** : ajout `/cgu` et `/confidentialite`
- **Hero landing** : badge "Application Android bientôt disponible sur Google Play"
- **Profil** : carte "Mes données" avec Export (download JSON) + Dialog suppression compte
- **assetlinks.json** : template dans `public/.well-known/` (placeholder SHA-256, à finaliser après 1er build Play Console)

## Backend
**Aucun changement.** Les endpoints RGPD (`POST /auth/rgpd/consent`, `GET /auth/rgpd/export`, `POST /auth/rgpd/delete`) sont déjà sur `main` depuis longtemps (migration `013_rgpd_compliance.sql`).

## Commits

| Commit | Phase |
|---|---|
| `a62a4a8` | Import dossier `mobile/` |
| `dea9344` | Rebrand BatiPro → MonDevisMinute |
| `a60614e` | Restructure 5 tabs + clients CRUD + devis vocal + détail MVP |
| `d576816` | Devis manuel + signature + situations + facture détail |
| `f6a6d3e` | **Phase 3.1** CGU modal + reset/verify-email |
| `199b775` | **Phase 3.2 + 3.3** Profil 13 champs + Stripe |
| `30ba32c` | **Phase 4** Assets + EAS config + GOOGLE_PLAY_RELEASE.md |
| `122b92d` | RGPD UI mobile + web |
| `c06417f` | Pages légales web + Android App Links + feature graphic |
| `f4b836b` | README mobile à jour |
| (à venir) | TEST_PLAN.md + STORE_LISTING.md + PR_DESCRIPTION.md + landing badge |

## Documents inclus pour le déploiement

| Fichier | Contenu |
|---|---|
| `mobile/GOOGLE_PLAY_RELEASE.md` | Guide complet : compte Play Console, EAS build/submit, App Links, data safety |
| `mobile/TEST_PLAN.md` | Checklist détaillée 12 sections — à dérouler sur APK preview avant prod |
| `mobile/STORE_LISTING.md` | Tous les textes ready-to-paste pour Play Console (titre, description FR, data safety, content rating, etc.) |

## Test plan pour reviewer

### Web (depuis cette PR)
- [ ] Preview Vercel ouvre → vérifier que `/cgu` et `/confidentialite` rendent correctement
- [ ] Footer affiche la colonne "Légal" avec les 3 liens
- [ ] Hero affiche le badge "Application Android bientôt disponible"
- [ ] Profil → "Mes données" : tester Export (download JSON) + Suppression (dialog s'ouvre, validations marchent)

### Mobile (après merge → main)
Voir `mobile/TEST_PLAN.md` pour la check-list complète sur APK preview.

## Risques / points d'attention

1. **Déploiement Vercel** : après merge, vérifier que `https://mondevisminute.com/confidentialite` est bien accessible (URL exigée par Play Console pour la Privacy Policy)
2. **Android App Links** : `assetlinks.json` est en place mais avec un SHA-256 placeholder. **À finaliser après le 1er build Play Console** (récupérer le fingerprint dans App signing → mettre à jour le fichier → re-push)
3. **Backend Render free tier** : peut dormir → 1er appel après veille = 30-60 sec. À l'esprit lors des tests
4. **TypeScript** : `npx tsc --noEmit` passe en exit 0 sur mobile ET web
5. **Web build prod** : `npx next build` passe, `/cgu` et `/confidentialite` prerendered en static (166 B)

## Plan post-merge

1. Vérifier que Vercel deploy `main` réussit
2. Tester en prod `https://mondevisminute.com/confidentialite`
3. Lancer `npx eas build --profile preview --platform android` pour APK de test
4. Dérouler `mobile/TEST_PLAN.md` sur device Android
5. Si OK : build production AAB + soumission Play Console suivant `mobile/GOOGLE_PLAY_RELEASE.md`

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
