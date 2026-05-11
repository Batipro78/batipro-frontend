# MonDevisMinute Mobile — Plan de test avant production

Ce document liste **tous les tests à faire** sur l'APK preview avant de soumettre l'app sur Google Play. Compte ~45-60 min pour faire le tour complet.

## 0. Setup

### Générer l'APK preview
```sh
cd C:/Users/fethiameur/batipro-frontend/mobile
npx eas login
# Choisis "Login with browser" ou "Login with username/password"

npx eas build --profile preview --platform android
# ~10-20 min cloud
# À la fin tu reçois une URL avec un QR code → télécharge l'APK sur ton Android
```

### Installer
1. Ouvrir l'URL EAS sur ton téléphone Android
2. Télécharger l'APK
3. Autoriser l'installation depuis "Sources inconnues" (Réglages → Apps → Spéciales)
4. Installer

> Si tu n'as pas Android sous la main, EAS peut générer un build iOS preview pour simulateur Mac, ou tu peux tester sur **Genymotion Cloud** (~5 min). Mais le mieux reste un vrai device.

---

## 1. Auth (sans CGU encore)

### 1.1. Signup nouveau compte
- [ ] Ouvrir l'app → écran login
- [ ] Cliquer "Pas encore de compte ? Essai gratuit 14 jours"
- [ ] Saisir : nom entreprise + email pro + password (8+ caractères)
- [ ] Cliquer "Créer mon compte"
- [ ] **Attendu** : message "Vérifie ton email" + email reçu dans la boîte
- [ ] Cliquer le lien dans l'email → l'app DOIT s'ouvrir sur l'écran "Email vérifié" (verify-email screen)
  - Si l'app ne s'ouvre pas → c'est normal en preview (App Links pas encore configurés, voir étape 9 de GOOGLE_PLAY_RELEASE.md). Le lien s'ouvrira dans le browser → `mondevisminute.com/verify-email?token=...` (qui devrait fonctionner si le merge → main est fait)

### 1.2. Login
- [ ] Retour à l'écran login
- [ ] Saisir email + password créés
- [ ] **Attendu** : redirection vers dashboard

### 1.3. CGU modal
- [ ] **Au premier login**, le modal CGU doit apparaître plein écran
- [ ] Impossible de le fermer (pas de bouton X, pas de tap dehors)
- [ ] Scroll dans les 10 sections
- [ ] Cliquer "J'accepte les conditions"
- [ ] **Attendu** : modal disparaît, dashboard accessible
- [ ] Killer l'app, relancer → CGU ne réapparaît PAS (déjà acceptées)

### 1.4. Mot de passe oublié
- [ ] Se déconnecter (Profil → Se déconnecter)
- [ ] Sur login, cliquer "Mot de passe oublié ?"
- [ ] Saisir email
- [ ] **Attendu** : "Email envoyé" + email reçu
- [ ] Cliquer lien email → écran reset-password de l'app (ou navigateur si App Links pas activés)
- [ ] Saisir nouveau password + confirm
- [ ] **Attendu** : "Mot de passe modifié" + redirection login

---

## 2. Profil (Phase 3.2)

### 2.1. Lecture profil
- [ ] Tab Profil
- [ ] **Attendu** : email affiché, badge "Essai 14 jours restants"
- [ ] Bandeau "Profil X% complet" avec checklist

### 2.2. Édition profil (les 13 champs)
- [ ] Remplir tous les champs obligatoires (nom entreprise, dirigeant, SIRET 14 chiffres, téléphone, adresse, CP 5 chiffres, ville)
- [ ] **Test validation** : laisser un champ obligatoire vide → cliquer "Enregistrer le profil" → message d'erreur
- [ ] **Test SIRET** : taper des lettres → automatiquement filtrées (seuls les chiffres restent)
- [ ] **Test CP** : taper 6 chiffres → bloqué à 5
- [ ] Remplir aussi les champs optionnels (TVA, RCS/RM, assurance × 3)
- [ ] Cliquer "Enregistrer le profil"
- [ ] **Attendu** : alerte "Profil enregistré"
- [ ] Killer l'app + relancer → les champs sont restaurés

### 2.3. Upload logo
- [ ] Section Logo → "Importer"
- [ ] **Test permission** : la 1ère fois, demande l'accès aux photos → accepter
- [ ] Choisir une image (PNG ou JPG)
- [ ] Cropper en carré → valider
- [ ] **Attendu** : logo affiché dans la box 128×128 + sur la carte profil en haut + sur l'avatar
- [ ] Cliquer "Supprimer" → confirmer → logo disparaît

### 2.4. Bandeau completion
- [ ] Après remplissage complet + logo → bandeau passe à 100% (vert)
- [ ] Sans logo → bandeau ~87%

---

## 3. Clients

### 3.1. Création client
- [ ] Tab Clients
- [ ] Cliquer "+"
- [ ] Choisir type (B2C, B2B, B2G)
- [ ] Saisir nom + téléphone + adresse + email (optionnel)
- [ ] **Attendu** : client apparaît dans la liste

### 3.2. Recherche + édition
- [ ] Taper dans la barre de recherche → filtre live
- [ ] Long-press sur un client → option "Supprimer"

---

## 4. Devis vocal (cœur du produit)

### 4.1. Permission micro
- [ ] Tab Devis → "+" → "Création vocale"
- [ ] La 1ère fois, demande l'accès au microphone → accepter

### 4.2. Configuration
- [ ] Choisir métier (ex : électricien)
- [ ] Sélectionner client existant OU créer rapide (juste nom + tel)
- [ ] Si métier hasGammes (élec/plomb) → checkbox "Mode comparatif 3 gammes"
- [ ] Cliquer "Commencer l'enregistrement"

### 4.3. Enregistrement
- [ ] **Tester en parlant clairement** : "Je vais faire une installation électrique dans un appartement de 60 m². Mise en place du tableau électrique, câblage de 12 prises, 8 interrupteurs, 4 luminaires. Comptez environ 1500 euros de matériel et 8 heures de main d'œuvre à 45 euros."
- [ ] Cliquer "Stop" pour arrêter
- [ ] **Attendu** : passage à "Transcribing..." puis "Generating..." (~10-30 sec)

### 4.4. Review
- [ ] Le devis généré s'affiche avec lignes structurées
- [ ] **Vérifier** : intitulé, lignes, prix HT, TVA, total TTC
- [ ] Possibilité de modifier les lignes
- [ ] Cliquer "Enregistrer le devis"
- [ ] **Attendu** : redirection vers le détail du devis créé

### Bugs potentiels à signaler
- Audio coupé prématurément → vérifier durée d'enregistrement
- Transcription incorrecte → relancer
- Erreur API → vérifier internet + backend Render éveillé

---

## 5. Devis manuel

- [ ] Tab Devis → "+" → "Création manuelle"
- [ ] Saisir intitulé, client
- [ ] Ajouter des lignes (intitulé, qté, prix, TVA)
- [ ] Vérifier les calculs HT/TTC en temps réel
- [ ] Sauvegarder

---

## 6. Détail devis + actions

Sur un devis créé :

### 6.1. PDF
- [ ] Cliquer "Voir le PDF"
- [ ] **Attendu** : ouverture du PDF natif (avec logo de profil, mentions SIRET/TVA/Assurance, lignes, totaux)

### 6.2. Signature
- [ ] Cliquer "Faire signer"
- [ ] **Attendu** : modal avec canvas de signature blanc
- [ ] Signer à l'écran avec le doigt
- [ ] Cliquer "Valider"
- [ ] **Attendu** : signature enregistrée + apparaît sur le PDF régénéré

### 6.3. Facture de situation
- [ ] Cliquer "Facturer une situation"
- [ ] Saisir pourcentage (ex : 30%) + retenue de garantie (ex : 5%)
- [ ] **Attendu** : facture intermédiaire créée + visible dans tab Factures

### 6.4. Conversion en facture finale
- [ ] Cliquer "Convertir en facture finale"
- [ ] Confirmer
- [ ] **Attendu** : facture finale créée

### 6.5. Partage
- [ ] Cliquer le bouton "Partager"
- [ ] **Attendu** : sheet natif Android (WhatsApp, Gmail, Drive, etc.)

---

## 7. Factures

### 7.1. Liste
- [ ] Tab Factures
- [ ] **Attendu** : factures de situation + finales avec badge type

### 7.2. Détail facture
- [ ] Ouvrir une facture
- [ ] Voir totaux + paiements

### 7.3. Ajouter un paiement
- [ ] Cliquer "Ajouter un paiement"
- [ ] Choisir méthode (CB, virement, chèque, espèces)
- [ ] Saisir montant + date
- [ ] **Attendu** : payé / restant à jour

### 7.4. Libération retenue de garantie
- [ ] Sur une facture **finale** avec retenue > 0
- [ ] Bouton "Libérer la retenue de garantie"
- [ ] **Attendu** : paiement de la retenue ajouté

---

## 8. Abonnement Stripe (Phase 3.3)

> ⚠️ **Test sans payer** : Stripe propose des cartes de test. Sur la page checkout Stripe, utiliser la carte `4242 4242 4242 4242` + n'importe quelle date future + n'importe quel CVC. **Sauf si tu veux vraiment payer pour tester en prod** — mais on est probablement en mode test backend.

### 8.1. Page abonnement
- [ ] Profil → "Voir l'offre Premium" → ouvre la page abonnement
- [ ] **Attendu** : 2 cartes plans (Mensuel 29€ + Annuel 290€ avec badge "2 mois offerts")

### 8.2. Checkout Mensuel
- [ ] Cliquer "S'abonner" sur Mensuel
- [ ] **Attendu** : ouverture in-app browser Stripe
- [ ] **Test mode** : carte 4242... → continuer
- [ ] **Attendu** : redirection vers `/abonnement/success` qui ferme le browser
- [ ] **Attendu côté app** : la page abonnement passe en vue "MonDevisMinute Pro" avec badge "Actif"

### 8.3. Portail client
- [ ] Cliquer "Gérer mon abonnement"
- [ ] **Attendu** : in-app browser sur portail Stripe (changer carte, annuler, etc.)
- [ ] Fermer le browser
- [ ] **Attendu** : retour app, statut conservé

### 8.4. Si tu utilises une vraie carte
- [ ] Pour annuler après test : Profil → Abonnement → Gérer mon abonnement → Annuler l'abonnement

---

## 9. RGPD (Phase RGPD UI)

### 9.1. Export
- [ ] Profil → scroller vers "Mes données"
- [ ] Cliquer "Exporter mes données"
- [ ] **Attendu** : sheet natif "Partager" avec le JSON complet (artisan + clients + devis)
- [ ] Envoyer à toi-même par email pour vérifier le contenu

### 9.2. Suppression (TEST SUR COMPTE DE TEST UNIQUEMENT !)
- [ ] **Créer un compte de test exprès** pour ce test
- [ ] Profil → "Supprimer mon compte"
- [ ] **Attendu** : modal d'avertissement avec liste des conséquences
- [ ] Cliquer "Continuer"
- [ ] **Attendu** : étape 2 avec champs "SUPPRIMER" + password
- [ ] Tester "Annuler" → ferme le modal sans rien faire
- [ ] Rouvrir, taper "SUPPRIMER" + bon password
- [ ] **Attendu** : "Compte supprimé. Vos données ont été anonymisées." + déconnexion
- [ ] Essayer de se reconnecter avec ce compte → doit échouer

---

## 10. Edge cases

### 10.1. Mode offline
- [ ] Mettre l'app en mode avion
- [ ] Essayer de créer un devis → message d'erreur clair (pas de crash)
- [ ] Réactiver le wifi → re-tenter → fonctionne

### 10.2. Token expiré
- [ ] L'app utilise refresh token automatique. Pour forcer le test : Profil → Se déconnecter → relogin

### 10.3. Backend Render en sommeil
- [ ] Render free tier dort après 15 min sans traffic. **1er appel après veille = 30-60 sec**
- [ ] Si le dashboard met du temps à charger au démarrage → c'est normal

### 10.4. Photos lourdes
- [ ] Tester upload logo avec une photo HD (>2 Mo) → l'app la passe à `quality: 0.9` donc devrait passer

### 10.5. Long-press
- [ ] Sur la liste clients → long-press → option supprimer

---

## 11. Cosmétique / UI

- [ ] Splash screen au démarrage (logo "M." sur navy + tagline)
- [ ] Icône de l'app sur le launcher Android (carré bord arrondi avec "M." blanc + dot orange)
- [ ] Tab bar : 5 tabs (Accueil, Devis, Factures, Clients, Profil)
- [ ] Pas de tab "Articles" visible (caché du nav)
- [ ] Pas de tab "Abonnement" visible (caché, accessible depuis Profil)
- [ ] Clavier ne masque pas les champs de saisie (KeyboardAvoidingView ok)
- [ ] Vues longues scrollables (profil, modal CGU)

---

## 12. Si tout est OK → Build production

```sh
cd mobile
npx eas build --profile production --platform android
```

Puis suivre `GOOGLE_PLAY_RELEASE.md` sections 4-7 pour la soumission Play Store.

---

## Bugs critiques à corriger AVANT prod

Si tu trouves un de ces problèmes, **NE PAS** soumettre en prod tant qu'ils ne sont pas fixés :

- 🔴 Crash au démarrage de l'app
- 🔴 Login impossible (alors qu'il marche sur le web)
- 🔴 Devis vocal qui crash (cœur du produit)
- 🔴 PDF illisible (logo en double, champs vides)
- 🔴 Stripe checkout qui ne s'ouvre pas
- 🔴 CGU modal qu'on peut bypasser
- 🔴 Suppression compte qui n'anonymise pas (vérifier en SQL côté Supabase)

Pour les **bugs cosmétiques** (alignement, couleur), un patch 1.0.1 post-launch est acceptable.

---

## Ce que tu peux pas tester sans build production

- **Android App Links** auto-vérifiés : la `assetlinks.json` doit être servie depuis `mondevisminute.com` ET avoir le SHA-256 du build de prod (Play Store). Le preview est signé avec une autre clé donc les liens s'ouvrent dans le browser en preview — c'est attendu.

- **Vraie soumission Stripe** : si ton backend est en mode test, c'est OK pour valider. Pour tester avec de l'argent réel, faut switch le backend en mode live Stripe.

- **Notifications push** : pas implémentées en v1.

Bon test !
