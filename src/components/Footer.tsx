"use client";

import Link from "next/link";
import { Heart, ShieldCheck, Mail, AlertTriangle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Colonne 1 : Identité & Mission */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-bold text-2xl"
            >
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
              <span>DirElKhir</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              La première plateforme de solidarité directe en Algérie. Nous
              connectons les donateurs et les familles sans intermédiaire.
            </p>
            <a
              href="mailto:salam@direlkhir.dz"
              className="inline-flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              salam@direlkhir.dz
            </a>
          </div>

          {/* Colonne 2 : Navigation simplifiée */}
          <div className="md:text-center">
            <h3 className="text-white font-semibold text-lg mb-4 text-left md:text-center">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm flex flex-col items-start md:items-center">
              <li>
                <Link
                  href="/besoins"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Voir les demandes
                </Link>
              </li>
              <li>
                <Link
                  href="/demander-aide"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Publier un besoin
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-emerald-400 transition-colors"
                >
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Sécurité (Le plus important) */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              Sécurité
            </h3>
            <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 border-l-4 border-l-emerald-500">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  <span className="font-bold text-gray-200 block mb-1 uppercase tracking-wider">
                    Avertissement
                  </span>
                  Ce site ne collecte **jamais** d'argent. Toutes les aides se
                  font en nature et en main propre.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de bas de page */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] uppercase tracking-widest text-gray-500 font-medium text-center">
          <p>&copy; {currentYear} DirElKhir. Solidarité Algérie.</p>

          <div className="flex items-center gap-1 text-gray-400">
            Fait avec{" "}
            <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />{" "}
            en Algérie
          </div>
        </div>
      </div>
    </footer>
  );
}
