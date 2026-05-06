import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 1. Image de fond avec Next/Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/hero1.png"
          alt="hero image"
          fill
          priority // Important pour charger l'image du hero en priorité
          className="object-cover object-center w-full h-full"
          quality={90}
        />
      </div>

      {/* 2. Superposition (Overlay) sombre pour assurer la lisibilité du texte */}
      {/* J'utilise un dégradé subtil du bas vers le haut pour donner de la profondeur */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-gray-900/50"></div>

      {/* 3. Contenu Central */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Titre Principal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-lg">
          <span className="block mb-2">Face à la maladie,</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-blue-300">
            personne ne devrait être seul.
          </span>
        </h1>

        {/* Sous-titre inspirant */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-100 leading-relaxed font-light drop-shadow-md">
          Notre communauté unit des cœurs généreux à ceux qui traversent des
          moments difficiles. Ensemble, tissons une chaîne de solidarité et
          redonnons de l'espoir.
        </p>

        {/* Boutons d'Action (CTA) */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-5">
          {/* Bouton Primaire : Pour les donateurs (couleur chaude/positive comme le vert émeraude) */}
          <Link
            href="/faire-un-don"
            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-bold text-white rounded-full bg-emerald-600 overflow-hidden shadow-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-emerald-500/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {/* L'effet de brillance (shine) */}
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            {/* SVG Corrigé */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 group-hover:animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Je veux aider quelqu'un
          </Link>

          {/* Bouton Secondaire : Pour les demandeurs (plus doux, bordure blanche) */}
          <Link
            href="/demander-aide"
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-white rounded-full border-2 border-white/80 hover:bg-white hover:text-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 bg-white/10 backdrop-blur-sm"
          >
            J'ai besoin d'aide
          </Link>
        </div>

        {/* Petit message de réassurance en bas */}
        <p className="mt-8 text-sm text-gray-300/80">
          Rejoignez une communauté bienveillante et sécurisée.
        </p>
      </div>
    </section>
  );
};

export default Hero;
