import Link from 'next/link';
import BrandPicto from '@/components/branding/BrandPicto';

export default function LandingFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <BrandPicto size={36} className="rounded-xl" />
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                MonDevisMinute
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Le logiciel de devis et facturation pensé pour les artisans français.
              Pilotez votre activité à la voix, depuis le chantier.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">Produit</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#voix" className="hover:text-foreground transition">Devis vocal</a></li>
              <li><a href="#fonctionnalites" className="hover:text-foreground transition">Fonctionnalités</a></li>
              <li><a href="#metiers" className="hover:text-foreground transition">Métiers couverts</a></li>
              <li><a href="#tarifs" className="hover:text-foreground transition">Tarifs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">Guides</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/guides" className="hover:text-foreground transition">Tous les guides</Link></li>
              <li><Link href="/guides/mentions-obligatoires-devis-batiment" className="hover:text-foreground transition">Mentions obligatoires du devis</Link></li>
              <li><Link href="/guides/taux-tva-travaux-renovation" className="hover:text-foreground transition">Quel taux de TVA appliquer</Link></li>
              <li><Link href="/guides/facturation-electronique-artisan-2026" className="hover:text-foreground transition">Facturation électronique</Link></li>
              <li><Link href="/guides/chiffrer-un-devis-btp" className="hover:text-foreground transition">Chiffrer un devis</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">Modèles gratuits</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/generateur-devis" className="hover:text-foreground transition">Générateur de devis gratuit</Link></li>
              <li><Link href="/modeles" className="hover:text-foreground transition">Tous les modèles</Link></li>
              <li><Link href="/modeles/devis-electricien" className="hover:text-foreground transition">Modèle devis électricien</Link></li>
              <li><Link href="/modeles/devis-plombier" className="hover:text-foreground transition">Modèle devis plombier</Link></li>
              <li><Link href="/modeles/devis-macon" className="hover:text-foreground transition">Modèle devis maçonnerie</Link></li>
              <li><Link href="/modeles/facture-electricien" className="hover:text-foreground transition">Modèle facture artisan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">Compte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/signup" className="hover:text-foreground transition">Créer un compte</Link></li>
              <li><Link href="/login" className="hover:text-foreground transition">Se connecter</Link></li>
              <li><Link href="/forgot-password" className="hover:text-foreground transition">Mot de passe oublié</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">Aide & Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/aide" className="hover:text-foreground transition">Aide & FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition">Nous contacter</Link></li>
              <li><Link href="/cgu" className="hover:text-foreground transition">CGU</Link></li>
              <li><Link href="/confidentialite" className="hover:text-foreground transition">Confidentialité</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-foreground transition">Mentions légales</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} MonDevisMinute. Tous droits réservés.</p>
          <p>Hébergé en France · Conforme RGPD · Facturation électronique 2026</p>
        </div>
      </div>
    </footer>
  );
}
