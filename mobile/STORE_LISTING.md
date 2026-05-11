# Play Store Listing — Copies prêtes à coller

Ce fichier contient **tous les textes** à copier dans Google Play Console (Store presence → Main store listing). Format direct, pas de markdown — chaque section indique où la mettre.

---

## App name
*(Champ "App name", 30 caractères max)*

```
MonDevisMinute
```

> 14 caractères. Tu peux mettre `MonDevisMinute — Devis BTP` (26 caractères) si tu veux pousser le mot-clé "BTP" pour l'ASO.

---

## Short description
*(Champ "Short description", 80 caractères max)*

```
Devis et factures pour artisans BTP. Dictée vocale, signature, IA.
```

> 65 caractères. Alternatives ASO si tu veux tester :
> - `Devis artisan en 1 minute. Voix, signature, PDF. Essai 14 jours gratuit.` (72)
> - `Le devis et la facture en 1 minute pour les artisans du bâtiment.` (66)

---

## Full description
*(Champ "Full description", 4000 caractères max — actuellement 1850)*

```
MonDevisMinute est l'application tout-en-un pour les artisans du bâtiment qui veulent gagner du temps sur leur administratif. Créez un devis professionnel en moins d'une minute, à la voix, depuis le chantier.

CRÉEZ DES DEVIS À LA VOIX
Dictez votre prestation en français naturel. L'intelligence artificielle structure votre devis automatiquement : intitulé, lignes de prestation, prix au m² ou forfait, TVA, retenue de garantie. Vous validez, vous envoyez. Plus besoin de rentrer au bureau pour saisir.

DEVIS, FACTURES, SIGNATURE
• Création de devis vocale OU manuelle
• Signature client directement sur l'écran de votre téléphone
• Conversion devis → facture en un tap
• Factures de situation pour les acomptes
• Gestion de la retenue de garantie
• Génération PDF aux normes
• Partage WhatsApp, email, Drive

GESTION CLIENTS COMPLÈTE
• Base clients B2C, B2B et B2G
• Recherche rapide
• Historique des devis et factures par client
• Coordonnées auto-synchronisées entre tous vos documents

CONFORME ET PROFESSIONNEL
• Mentions obligatoires : SIRET, TVA intracommunautaire, RCS/RM
• Assurance décennale affichée sur chaque devis
• Logo de votre entreprise sur tous les documents
• Conforme à la facturation électronique 2026

POUR QUI ?
Plombiers, électriciens, maçons, peintres, carreleurs, plaquistes, couvreurs, menuisiers, chauffagistes, et tous les autres métiers du BTP.

ESSAI GRATUIT 14 JOURS
Sans engagement, sans carte bancaire pendant l'essai. Puis 29 €/mois ou 290 €/an (2 mois offerts).

DONNÉES PROTÉGÉES
Hébergement européen, conforme RGPD. Vos données vous appartiennent et vous pouvez les exporter ou supprimer votre compte à tout moment depuis l'application.

UNE QUESTION ?
contact@mondevisminute.com
https://mondevisminute.com
```

---

## What's new (release notes)
*(Champ "Release notes" lors du release, 500 caractères max)*

```
v1.0.0 — Première version publique de MonDevisMinute :

• Création de devis à la voix (IA)
• Création de devis manuelle
• Signature client sur l'écran
• Factures de situation + retenue de garantie
• Gestion clients B2C / B2B / B2G
• Profil avec logo, SIRET, assurance décennale
• Abonnement Stripe (essai 14 jours)
• Conforme RGPD : export et suppression de vos données depuis l'app

Bienvenue à bord !
```

> 442 caractères.

---

## Category
*(App category)*

- **App category** : `Business`
- **Tags** : `Productivity` (secondary), `Tools` (tertiary)

> Évite "Finance" → demande plus de justifications réglementaires côté Play Console.

---

## Tags (jusqu'à 5)
*(Champ "Tags")*

1. Productivity
2. Business
3. Tools

> Les tags sont en anglais dans Play Console même pour des apps françaises. Google les utilise pour la recherche internationale.

---

## Contact details
*(Champ "Contact details")*

```
Email : contact@mondevisminute.com
Phone : (laisser vide ou ton tel pro)
Website : https://mondevisminute.com
```

---

## Privacy Policy URL

```
https://mondevisminute.com/confidentialite
```

> ⚠️ **À VÉRIFIER QUE LA PAGE EST LIVE AVANT DE SOUMETTRE.** Tester l'URL dans un navigateur incognito. Si elle renvoie 404, la PR `mondevisminute-mobile → main` n'est pas mergée encore — Vercel doit déployer depuis main pour que l'URL fonctionne en prod.

---

## Visuals à uploader

| Asset | Dimensions | Source |
|---|---|---|
| App icon | 512×512 | Auto-extrait par EAS depuis `assets/icon.png` |
| Feature graphic | 1024×500 | `mobile/assets/feature-graphic.png` |
| Phone screenshot 1 | min 1080×1920 | À prendre depuis APK (voir TEST_PLAN.md) |
| Phone screenshot 2-6 | min 1080×1920 | Idem |

### Suggestions de screenshots à prendre

1. **Login** ou **Dashboard** (premier écran "hero")
2. **Création devis vocale** en train d'enregistrer (le bouton rouge avec timer)
3. **Devis détail** avec lignes et signature
4. **Facture détail** avec paiements
5. **Profil** avec logo et bandeau "100% complet"
6. **Abonnement** (carte premium activée OU vue plans)

> Astuce : pour les screenshots, utilise les **mêmes données** dans tous les écrans (même client, même devis) → ça donne un sentiment de continuité narrative à l'utilisateur qui scroll.

---

## Content rating

Remplir le questionnaire en ligne. Réponses attendues pour MonDevisMinute :

- **Category** : Business / Productivity
- **Violence** : No
- **Sexual content** : No
- **Profanity** : No
- **Controlled substances** : No
- **Gambling** : No
- **User-generated content** : No (devis = données privées de l'artisan, pas de UGC visible publiquement)
- **Personal info collection** : Yes (email, nom, téléphone, adresse → gestion compte artisan)
- **Location sharing** : No
- **Sharing of personal info between users** : No

**Résultat attendu** : **PEGI 3 / Everyone**

---

## Target audience and content

- **Target age group** : **18+** uniquement
- **Appeals to children** : No
- **Designed for families** : No

> MonDevisMinute est strictement professionnel. Pas de mode famille / pas pour mineurs.

---

## Ads
*(Champ "Does your app contain ads?")*

**No**

---

## Data safety
*(Section critique, beaucoup de questions)*

Cocher exactement :

### Does your app collect or share any of the required user data types?
**Yes**

### Data types collected

**Personal info** : Yes
- Name (Collected, Required, Encrypted in transit, User can delete)
- Email address (Collected, Required, Encrypted in transit, User can delete)
- Phone number (Collected, Optional, Encrypted in transit, User can delete)
- Address (Collected, Required, Encrypted in transit, User can delete)
- User IDs (Collected for app functionality, Encrypted in transit)

**Financial info** :
- Purchase history (Collected via Stripe, Shared with Stripe, Encrypted in transit)
- Pas d'autre donnée financière (pas de RIB, pas de carte stockée localement)

**Messages** : No
**Photos and videos** : Yes — Photos
- Photos (Logo upload only, Optional, Collected, Encrypted in transit, User can delete)
- Audio files : Yes — App activity
- Voice recordings (Collected for voice quote generation, transmitted to OpenAI for transcription, **NOT stored** after transcription, Encrypted in transit)

**Audio files** :
- Voice or sound recordings (Collected, Required for voice quote feature, Encrypted in transit, **deleted immediately after transcription**)

**Files and docs** : No

**Calendar** : No

**Contacts** : No

**App activity** :
- App interactions (anonymized, Required, Encrypted in transit) — si pas d'analytics, mettre No

**Web browsing** : No
**App info and performance** :
- Crash logs : si tu en collectes (pas en v1), oui. Sinon No.
- Diagnostics : No

**Device or other IDs** : No (sauf si tu actives un analytics, à mettre No pour v1)

### Data shared with third parties

| Data | Recipient | Reason |
|---|---|---|
| Email, name | Stripe | Subscription billing |
| Purchase history | Stripe | Subscription billing |
| Audio | OpenAI (Whisper API) | Voice transcription, audio deleted after |

### Security practices

- ✅ Data is encrypted in transit (TLS/HTTPS)
- ✅ You can request that data be deleted

### Justification "Users can delete data"
Path: Profil → Mes données → Supprimer mon compte. Anonymisation immédiate des coordonnées, suppression des audios, conservation comptable légale uniquement pour devis/factures (10 ans, conformément à l'article L123-22 du Code de commerce français).

---

## Pricing
- Free (paiement géré par Stripe en dehors de Play Billing — autorisé car app B2B SaaS)

---

## Countries / regions
- France
- Belgique (option, si tu vises francophone)
- Luxembourg (option)
- Suisse (option, mais TVA différente)
- Canada (option, marché Québec)

> Limite à France pour la v1.0.0, étend ensuite.

---

## App access
*(Section "App access" pour le review Google)*

**Google needs login credentials to test your app.**

Si ton compte d'essai est suffisant pour la review, choisir :
```
All functionality is available without special access
```

Sinon créer un compte test :
- Email : `play-review@mondevisminute.com`
- Password : un mot de passe simple genre `PlayReview2026!`
- Compte marqué premium gratuit dans Supabase (pour éviter d'avoir à payer pendant la review)
- Profil pré-rempli (nom, SIRET test, etc.) pour éviter aux reviewers d'avoir à le remplir

---

## Stripe — Justification pour Google Play

Si Google demande pourquoi tu utilises Stripe et pas Play Billing pour l'abonnement, répondre :

```
MonDevisMinute is a B2B SaaS application for construction craftsmen (plumbers, electricians, masons, etc.). The subscription provides access to professional business management tools (quote and invoice generation, customer management, voice dictation). Per Google Play's policies, B2B SaaS subscriptions for professional/business use are not required to use Play Billing and can use external payment processors. Stripe is used as the payment processor, with all transactions handled outside the app via secure HTTPS redirect.
```

---

## Anti-patterns à éviter

- ❌ Mentionner "AI" ou "ChatGPT" dans la description sans préciser ce que ça fait (Google peut demander plus d'infos)
- ❌ Promettre des features non-livrées
- ❌ Captures d'écran avec des informations fake "tape" sur des écrans (ex : barre de batterie/wifi photoshoppée) — Google rejette
- ❌ Logo de pub Stripe ou OpenAI dans les screenshots
- ❌ Mentionner "Free" dans le titre (Google le considère trompeur si tu as un abonnement payant)
