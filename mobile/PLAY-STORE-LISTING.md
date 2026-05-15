# Listing Google Play Store — MonDevisMinute

> Texte à copier-coller dans Play Console au moment du dépôt.
> Limite : 80 caractères pour le titre court, 4000 pour la description longue.

---

## Nom de l'application (50 caractères max)

```
MonDevisMinute
```

## Titre court / accroche (80 caractères max)

```
MonDevisMinute — Devis et factures pour artisans BTP par dictée vocale
```
(70 caractères)

## Description longue (4000 caractères max)

```
MonDevisMinute est l'application mobile destinée aux artisans du bâtiment pour créer des devis et factures conformes en quelques secondes, par la voix.

Création vocale de devis
Dictez votre devis comme vous le pensez : "100 mètres de câble 3G2.5, un tableau électrique 4 rangées, 5 prises de courant et 8 disjoncteurs 16A". L'application reconnaît chaque article du catalogue, applique automatiquement le prix et la TVA, et génère un PDF prêt à envoyer au client.

14 métiers du BTP couverts
Électricien, plombier, chauffagiste, peintre, maçon, couvreur, charpentier, menuisier, plaquiste, carreleur, serrurier, paysagiste. Catalogue de plus de 700 articles préchargés avec des prix de référence 2026 (sources : Rexel, Sonepar, Cedeo, Point P).

Fonctionnalités principales
- Devis et factures au format PDF professionnel
- Mentions légales obligatoires intégrées : SIRET, RCS ou RM, numéro de TVA intracommunautaire, assurance décennale
- Affichage du logo de votre entreprise sur les documents
- Carnet d'adresses clients avec historique
- Signature client à distance pour valider un devis
- Conversion d'un devis en facture en un clic
- Suivi des paiements et relances
- Catalogue d'articles personnalisable par métier
- Adresse de chantier, date de début et durée des travaux

Conçu pour le terrain
Interface tactile pensée pour une utilisation sur chantier. Saisie vocale qui évite le clavier. Envoi par email au client en un clic. Fonctionne en 4G.

Données et confidentialité
Hébergement européen pour la base de données. Chiffrement HTTPS de bout en bout. Conformité RGPD complète : droit d'accès, de rectification, d'effacement et de portabilité. Aucune publicité, aucune revente de données à des tiers.

Tarif
Essai gratuit de 14 jours, sans carte bancaire requise. Ensuite, abonnement à 29€ par mois, sans engagement.

Support
Une question, un bug ? Écrivez à contact@mondevisminute.com — réponse sous 24h ouvrées.

Réglementation française
Application développée en France pour les artisans français. Le PDF inclut automatiquement les mentions obligatoires pour les devis BTP : durée de validité, conditions de paiement, assurance décennale, registre du commerce ou des métiers, adresse du chantier.

Téléchargez MonDevisMinute et créez votre premier devis vocal en moins d'une minute.
```

## Catégorie

- **Catégorie principale** : Productivité
- **Tags secondaires** : Entreprise, Outils

## Coordonnées développeur

- **Email contact public** : contact@mondevisminute.com
- **Site web** : https://mondevisminute.com
- **Politique de confidentialité** : https://mondevisminute.com/confidentialite

## Classification du contenu (rating)

À remplir dans Play Console via le questionnaire. Réponses attendues :
- Violence : Non
- Contenu sexuel : Non
- Langage grossier : Non
- Substances : Non
- Jeu d'argent : Non
- Données utilisateur sensibles : Oui (uniquement email + données pro pour le service)
- → Résultat attendu : **Tous publics (3+)**

## Pays de publication

- France (priorité 1)
- Belgique, Suisse, Luxembourg, Monaco (FR francophone) — recommandé en phase 2
- Élargir Europe en phase 3 si traduction faite

## Data Safety form — réponses pré-remplies

### Données collectées et liées à l'identité utilisateur
- **Email** — pour authentification + emails transactionnels (obligatoire pour service)
- **Nom + prénom** — pour identité artisan affichée sur devis/factures (obligatoire pour service)
- **Numéro de téléphone** — pour profil artisan (obligatoire pour service)
- **Adresse** — pour mentions légales sur devis (obligatoire pour service)
- **Mot de passe** — haché bcrypt, jamais en clair (obligatoire pour service)

### Données financières
- **Aucune** stockée par l'app. Stripe gère les paiements (PCI-DSS).

### Données audio
- **Enregistrements vocaux** : temporaires, utilisés UNIQUEMENT pour transcription par OpenAI Whisper, supprimés immédiatement après transcription. Pas de stockage longue durée.

### Données utilisation
- **Logs techniques** (IP, user-agent, sessions) — 12 mois, intérêt légitime, anonymisé.

### Données partagées avec des tiers
- OpenAI (transcription audio Whisper) — clauses contractuelles types, USA
- Supabase, Render, Vercel (infrastructure) — clauses contractuelles types
- Stripe (paiements abonnement) — Irlande/USA, PCI-DSS
- Brevo (emails transactionnels) — UE

### Sécurité
- Chiffrement en transit : Oui (HTTPS/TLS)
- Chiffrement au repos : Oui (Supabase chiffré)
- Suppression compte : Oui, depuis l'app (anonymisation immédiate, archive 10 ans obligation légale française)
- Possibilité d'exporter ses données : Oui (export JSON depuis Profil)

## Screenshots à préparer (sur ton tel)

Minimum 2, idéalement 4-8. Format portrait recommandé.

Liste suggérée :
1. **Écran d'accueil / dashboard** (après login)
2. **Création de devis vocal** (bouton micro + transcription en cours)
3. **Devis généré** (avec lignes + total + bouton "Envoyer")
4. **PDF du devis** (visualisation avec logo + mentions)
5. **Liste des clients** (carnet d'adresses)
6. **Liste des factures** avec statut paiement
7. **Profil entreprise** (logo + mentions légales remplies)
8. **Page d'abonnement** (essai gratuit + 29€/mois)

## Feature graphic

Déjà créé : `mobile/assets/feature-graphic.png` (1024x500). Vérifier qu'il est à jour avec le branding MonDevisMinute.

## Build production + soumission

```bash
cd C:\Users\fethiameur\batipro-frontend\mobile

# 1. Build .aab production (~10 min + file d'attente EAS)
eas build --platform android --profile production

# 2. Une fois le .aab récupéré, upload manuel via Play Console
#    (Premier upload obligatoirement manuel pour créer la "release")

# 3. Plus tard, pour les mises à jour : utiliser EAS Submit après avoir créé
#    google-play-service-account.json (cf. https://docs.expo.dev/submit/android/)
eas submit --platform android
```

## Checklist finale avant submit

- [ ] Compte Play Console validé (24-48h après dépôt pièce d'identité)
- [ ] Application créée dans Play Console
- [ ] Description courte + longue copiées
- [ ] Catégorie + tags renseignés
- [ ] Politique de confidentialité URL renseignée : https://mondevisminute.com/confidentialite
- [ ] Classification de contenu : questionnaire complété
- [ ] Data Safety form : tout déclaré (voir ci-dessus)
- [ ] Pays : France au minimum
- [ ] Screenshots : 4-8 captures uploadées
- [ ] Feature graphic uploadé
- [ ] Icon 512x512 uploadé
- [ ] Build .aab production uploadé dans "Release internal testing" ou "Production"
- [ ] Soumis pour review Google (1-7 jours)
