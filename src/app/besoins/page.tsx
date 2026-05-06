"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Filter, XCircle, Loader2 } from "lucide-react";
import RequestCard, { Request, Category } from "@/components/RequestCard";
// Importation des constantes centralisées
import { WILAYAS, CATEGORIES } from "@/data/constants";

function NeedsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // --- ÉTAT DES DONNÉES ---
  const [allRequests, setAllRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  // --- ÉTAT DES FILTRES ---
  const [selectedCategory, setSelectedCategory] = useState<Category | "ALL">(
    "ALL",
  );
  const [searchWilaya, setSearchWilaya] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // --- 1. SYNCHRONISATION AVEC L'URL ---
  useEffect(() => {
    const urlWilaya = searchParams.get("wilaya");
    const urlCategory = searchParams.get("category");

    if (urlWilaya) setSearchWilaya(urlWilaya);

    if (urlCategory) {
      const formattedCat = urlCategory.toUpperCase() as Category;
      if (CATEGORIES.some((c) => c.id === formattedCat)) {
        setSelectedCategory(formattedCat);
      }
    }
  }, [searchParams]);

  // --- 2. APPEL API ---
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/requests/find`,
        );
        const data = await response.json();

        const formattedData = data.map((req: any) => ({
          ...req,
          id: req._id,
          // On s'assure d'avoir une valeur pour la wilaya
          wilaya: req.wilayaName || req.wilaya || "",
        }));

        setAllRequests(formattedData);
      } catch (error) {
        console.error("Erreur backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // --- 3. FONCTION DE MISE À JOUR DE L'URL ---
  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // --- 4. LOGIQUE DE FILTRAGE ---
  const filteredRequests = allRequests.filter((req: any) => {
    const isAvailable = req.status === "OUVERT";

    const matchCategory =
      selectedCategory === "ALL" || req.category === selectedCategory;

    // Normalisation pour la comparaison (minuscules + retrait des espaces)
    const normalizedReqWilaya = req.wilaya?.toString().toLowerCase().trim();
    const normalizedSearchWilaya = searchWilaya.toLowerCase().trim();

    const matchWilaya =
      searchWilaya === "" || normalizedReqWilaya === normalizedSearchWilaya;

    const matchQuery =
      searchQuery === "" ||
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.hospital?.toLowerCase().includes(searchQuery.toLowerCase());

    return isAvailable && matchCategory && matchWilaya && matchQuery;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Demandes d'aide en cours
          </h1>
          <p className="mt-2 text-gray-600">
            Trouvez une personne à aider près de chez vous.
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8 sticky top-24 z-30">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher (ex: Lovenox, Mustapha Bacha...)"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                className="px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                value={searchWilaya}
                onChange={(e) => {
                  setSearchWilaya(e.target.value);
                  updateQueryParams("wilaya", e.target.value);
                }}
              >
                <option value="">Toutes les Wilayas</option>
                {WILAYAS.map((wilaya) => (
                  <option key={wilaya} value={wilaya}>
                    {wilaya}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtres par Catégorie */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  updateQueryParams("category", cat.id.toLowerCase());
                }}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille de résultats */}
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRequests.map((req) => (
              <RequestCard key={req.id} request={req} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Aucune demande disponible
            </h3>
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchWilaya("");
                setSearchQuery("");
                router.push("?"); // Reset URL
              }}
              className="mt-6 text-emerald-600 hover:text-emerald-700 font-medium flex items-center justify-center gap-2 mx-auto"
            >
              <XCircle className="w-4 h-4" />
              Réinitialiser tous les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NeedsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-20">
          <Loader2 className="animate-spin text-emerald-600" />
        </div>
      }
    >
      <NeedsContent />
    </Suspense>
  );
}
