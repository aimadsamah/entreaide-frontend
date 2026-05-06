"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  HeartHandshake,
  Search,
  Stethoscope,
  Utensils,
  Baby,
  Smile,
  Syringe,
  Ambulance,
} from "lucide-react";
import { WILAYAS, CATEGORIES } from "../data/constants";

export default function QuickSearch() {
  const router = useRouter();
  const [wilaya, setWilaya] = useState("");
  const [category, setCategory] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    // On envoie le NOM de la wilaya au lieu du code
    if (wilaya) params.append("wilaya", wilaya);
    if (category && category !== "all") params.append("category", category);

    router.push(`/besoins?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 relative z-20">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 -mt-32 md:-mt-32">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Trouvez un malade à aider près de chez vous
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Sélectionnez votre wilaya pour voir les besoins locaux.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4"
        >
          {/* Sélecteur de Wilaya (Utilise maintenant les noms en value) */}
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
            </div>
            <select
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
              required
              className="appearance-none w-full pl-10 pr-10 py-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all cursor-pointer hover:bg-white"
            >
              <option value="" disabled>
                Dans quelle Wilaya êtes-vous ?
              </option>
              {WILAYAS.map((wilaya) => (
                <option key={wilaya} value={wilaya}>
                  {wilaya}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Sélecteur de Catégorie */}
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HeartHandshake className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none w-full pl-10 pr-10 py-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="md:w-auto w-full px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600"
          >
            <Search className="h-5 w-5" />
            <span>Rechercher</span>
          </button>
        </form>

        {/* Suggestions rapides corrigées avec les noms */}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-gray-500 justify-center md:justify-start">
          <span>Recherches fréquentes :</span>
          <button
            onClick={() => {
              setWilaya("Alger");
              setCategory("medicament");
            }}
            className="px-3 py-1 bg-gray-100 hover:bg-emerald-50 text-emerald-700 rounded-full transition-colors border border-transparent hover:border-emerald-200"
          >
            💊 Médicaments à Alger
          </button>
          <button
            onClick={() => {
              setWilaya("Oran");
              setCategory("repas");
            }}
            className="px-3 py-1 bg-gray-100 hover:bg-orange-50 text-orange-700 rounded-full transition-colors border border-transparent hover:border-orange-200"
          >
            🍲 Repas à Oran
          </button>
        </div>
      </div>
    </div>
  );
}
