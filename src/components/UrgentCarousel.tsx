"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

// On importe le composant et son type
import RequestCard, { Request } from "@/components/RequestCard";

export default function UrgentCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  // --- APPEL API ---
  useEffect(() => {
    const fetchUrgentRequests = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/requests/find`,
        );
        if (!response.ok) throw new Error("Erreur réseau");

        const data = await response.json();

        // Formatage pour correspondre au type Request attendu par RequestCard
        const formattedData = data
          .map((req: any) => ({
            ...req,
            id: req._id, // Conversion de l'ID MongoDB en id pour le composant
            wilaya: req.wilaya, // Assure-toi que c'est le bon nom de champ
          }))
          // Filtrage : HIGH urgency + status OUVERT
          // Note : Vérifie que ton backend renvoie bien "HIGH" et "OUVERT" en majuscules
          .filter(
            (req: any) => req.urgency === "HIGH" && req.status === "OUVERT",
          )
          // Tri par date décroissante (si createdAt existe)
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 6);

        setRequests(formattedData);
      } catch (error) {
        console.error("Erreur Carousel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrgentRequests();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      // On calcule le scroll selon la largeur du conteneur pour plus de précision
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8;

      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center flex-col gap-3">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        <p className="text-sm text-gray-500 font-medium">
          Chargement des urgences...
        </p>
      </div>
    );
  }

  // Si aucune demande urgente n'est trouvée, on ne rend rien
  if (requests.length === 0) return null;

  return (
    <section className="w-full py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-red-600 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                Urgence Absolue
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
              Besoin d'aide immédiat
            </h2>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 hover:shadow-md transition-all active:scale-95"
              aria-label="Précédent"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 hover:shadow-md transition-all active:scale-95"
              aria-label="Suivant"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 px-4 md:px-[calc((100vw-1280px)/2+32px)] pb-10 snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Injecter une marge invisible au début pour l'alignement mobile */}
          <div className="shrink-0 w-1 md:hidden" />

          {requests.map((req) => (
            <div
              key={req.id}
              className="snap-center shrink-0 w-[85vw] md:w-[380px]"
            >
              <RequestCard request={req} />
            </div>
          ))}

          {/* Bouton Fin de liste */}
          <div className="snap-center shrink-0 w-[200px] flex items-center justify-center pr-8">
            <Link
              href="/besoins"
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all duration-300 flex items-center justify-center group-hover:scale-110 shadow-sm">
                <ChevronRight className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 group-hover:text-emerald-600 uppercase tracking-[0.2em] transition-colors">
                Voir tout
              </span>
            </Link>
          </div>
        </div>

        {/* Masquage de la scrollbar pour Chrome/Safari */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
