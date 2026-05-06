"use client";

import { Heart, ShieldCheck, Users, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-20 md:pt-32 pb-12">
      {/* Section Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 md:mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs md:text-sm font-medium mb-4">
          <Heart className="w-4 h-4" /> Ensemble, on est plus forts
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          L'entraide au service de{" "}
          <span className="text-emerald-600 block sm:inline">nos patients</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
          Notre plateforme connecte les familles de patients hospitalisés avec
          des citoyens prêts à offrir un coup de main, un médicament ou un
          repas. Un geste simple pour vous, un espoir immense pour eux.
        </p>
      </div>

      {/* Section Valeurs (Cards) */}
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ValueCard
              icon={<ShieldCheck className="w-8 h-8 text-emerald-600" />}
              title="Solidarité Gratuite"
              description="Aucune transaction d'argent n'est autorisée. Notre plateforme repose sur le bénévolat pur et le respect mutuel."
            />
            <ValueCard
              icon={<Users className="w-8 h-8 text-emerald-600" />}
              title="Proximité"
              description="Aidez quelqu'un dans votre propre quartier ou au sein de l'hôpital le plus proche de chez vous."
            />
            <ValueCard
              icon={<CheckCircle2 className="w-8 h-8 text-emerald-600" />}
              title="Engagement"
              description="Chaque demande acceptée est un contrat moral. Nous veillons à ce que l'aide arrive à ceux qui en ont vraiment besoin."
            />
          </div>
        </div>
      </div>

      {/* Section Comment ça marche */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12 md:mb-16">
          Comment ça fonctionne ?
        </h2>
        <div className="space-y-10 md:space-y-16">
          <Step
            number="01"
            title="Publiez ou trouvez une demande"
            text="Une famille exprime un besoin précis (médicament, repas, transport). Les donneurs parcourent la liste par Wilaya."
          />
          <Step
            number="02"
            title="L'engagement"
            text="Lorsqu'un bénévole clique sur 'Je peux aider', il s'engage moralement. L'annonce est alors masquée pour éviter les appels inutiles."
          />
          <Step
            number="03"
            title="La mise en relation"
            text="Le bénévole reçoit le numéro de téléphone de la famille pour organiser la remise de l'aide en personne."
          />
        </div>
      </div>

      {/* CTA Final */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <div className="px-6 py-10 md:py-16 text-center bg-emerald-600 rounded-[2rem] shadow-xl text-white">
          <h2 className="text-xl md:text-3xl font-bold mb-8 leading-snug max-w-2xl mx-auto italic">
            "Celui qui soulage la détresse d'un musulman, Dieu le soulagera dans
            ce monde et dans l'autre."
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Link
              href="/besoins"
              className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-gray-100 transition-all active:scale-95 text-center"
            >
              Voir les demandes
            </Link>
            <Link
              href="/demander-aide"
              className="px-8 py-4 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 transition-all border border-emerald-500 active:scale-95 text-center"
            >
              Publier un besoin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sous-composant pour les cartes de valeurs
function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// Sous-composant pour les étapes
function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 md:gap-8 items-start sm:items-center group">
      <span className="text-5xl md:text-6xl font-black text-emerald-100 leading-none group-hover:text-emerald-200 transition-colors">
        {number}
      </span>
      <div className="flex-1">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">
          {title}
        </h3>
        <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
