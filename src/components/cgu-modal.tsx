'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function CguModal() {
  const { user, refreshAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!user || user.cgu_accepted) return null;

  const handleAccept = async () => {
    setLoading(true);
    try {
      const res = await api.post<{ data: { token: string; refreshToken: string } }>('/auth/accept-cgu', {});
      const { token, refreshToken } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      await refreshAuth();
    } catch {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="sm:max-w-lg max-h-[90vh] flex flex-col"
      >
        <DialogHeader>
          <DialogTitle>Conditions Generales d&apos;Utilisation</DialogTitle>
          <DialogDescription>
            Veuillez lire et accepter nos conditions avant de continuer.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[50vh] border rounded-md p-4 text-sm text-muted-foreground space-y-4">
          <h3 className="font-semibold text-foreground">1. Objet</h3>
          <p>
            Les presentes Conditions Generales d&apos;Utilisation (CGU) ont pour objet de definir les
            modalites et conditions d&apos;utilisation de la plateforme BatiPro, accessible via
            l&apos;application web et mobile. BatiPro est un service de gestion destine aux artisans
            du batiment, incluant la creation de devis, factures, la gestion de clients et
            l&apos;assistance vocale par intelligence artificielle.
          </p>

          <h3 className="font-semibold text-foreground">2. Acceptation des CGU</h3>
          <p>
            L&apos;utilisation de BatiPro implique l&apos;acceptation pleine et entiere des
            presentes CGU. En cliquant sur &quot;J&apos;accepte les conditions&quot;, l&apos;Utilisateur
            reconnait avoir pris connaissance de l&apos;ensemble des presentes conditions et les
            accepter sans reserve.
          </p>

          <h3 className="font-semibold text-foreground">3. Description du service</h3>
          <p>
            BatiPro propose les fonctionnalites suivantes : creation et gestion de devis et
            factures, gestion de la base clients, dictee vocale assistee par IA pour la creation
            de devis, catalogue d&apos;articles et de prix, generation de documents PDF, et mode
            comparatif multi-gammes.
          </p>

          <h3 className="font-semibold text-foreground">4. Inscription et compte</h3>
          <p>
            L&apos;Utilisateur s&apos;engage a fournir des informations exactes lors de son
            inscription et a maintenir la confidentialite de ses identifiants de connexion. Toute
            utilisation du compte est reputee faite par l&apos;Utilisateur lui-meme.
          </p>

          <h3 className="font-semibold text-foreground">5. Protection des donnees personnelles</h3>
          <p>
            Conformement au Reglement General sur la Protection des Donnees (RGPD), BatiPro
            s&apos;engage a proteger les donnees personnelles de ses utilisateurs. Les donnees
            collectees sont necessaires au fonctionnement du service et ne sont pas cedees a des
            tiers. L&apos;Utilisateur dispose d&apos;un droit d&apos;acces, de rectification, de
            portabilite et de suppression de ses donnees.
          </p>

          <h3 className="font-semibold text-foreground">6. Propriete intellectuelle</h3>
          <p>
            L&apos;ensemble des elements de BatiPro (logiciel, interface, contenus, marques) sont
            proteges par le droit de la propriete intellectuelle. Toute reproduction ou utilisation
            non autorisee est interdite.
          </p>

          <h3 className="font-semibold text-foreground">7. Responsabilite</h3>
          <p>
            BatiPro s&apos;efforce d&apos;assurer la disponibilite et la fiabilite du service, mais
            ne saurait etre tenu responsable des interruptions temporaires, des erreurs de
            transcription vocale ou des inexactitudes dans les prix du catalogue. L&apos;Utilisateur
            reste seul responsable de la verification des devis et factures generes.
          </p>

          <h3 className="font-semibold text-foreground">8. Abonnement et paiement</h3>
          <p>
            L&apos;acces a BatiPro est soumis a un abonnement payant apres une periode d&apos;essai
            gratuite de 14 jours. Les tarifs et modalites de paiement sont detailles sur la page
            d&apos;abonnement. L&apos;Utilisateur peut resilier son abonnement a tout moment.
          </p>

          <h3 className="font-semibold text-foreground">9. Modification des CGU</h3>
          <p>
            BatiPro se reserve le droit de modifier les presentes CGU a tout moment. Les
            utilisateurs seront informes de toute modification substantielle et devront accepter
            les nouvelles conditions pour continuer a utiliser le service.
          </p>

          <h3 className="font-semibold text-foreground">10. Droit applicable</h3>
          <p>
            Les presentes CGU sont soumises au droit francais. Tout litige relatif a leur
            interpretation ou execution sera soumis aux tribunaux competents de Paris.
          </p>
        </div>

        <DialogFooter>
          <Button onClick={handleAccept} disabled={loading} className="w-full sm:w-auto">
            {loading ? 'Traitement...' : "J'accepte les conditions"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
