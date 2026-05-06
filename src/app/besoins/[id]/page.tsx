// "use client";
// export const dynamic = "force-dynamic"; // je l'ai ajouter pour regler le probleme de la page qui ne saffiche pas

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import {
//   MapPin,
//   Clock,
//   AlertCircle,
//   User,
//   Phone,
//   CheckCircle,
//   ShieldAlert,
//   ArrowLeft,
//   Loader2,
// } from "lucide-react";
// // Import des constantes et types globaux
// import { CATEGORIES, CategoryId } from "@/data/constants";

// interface RequestDetail {
//   _id: string;
//   title: string;
//   description: string;
//   category: CategoryId;
//   urgency: "LOW" | "MEDIUM" | "HIGH";
//   patientName: string;
//   age: number;
//   locationType: "HOSPITAL" | "HOME";
//   hospital?: string;
//   wilaya: string;
//   commune?: string;
//   service?: string;
//   phone: string;
//   status: string;
//   createdAt: string;
// }

// export default function RequestDetailPage() {
//   const params = useParams();
//   const [request, setRequest] = useState<RequestDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [hasCommitted, setHasCommitted] = useState(false);

//   // Trouver les infos de la catégorie (icône et label)
//   const categoryInfo = CATEGORIES.find((c) => c.id === request?.category);
//   const CategoryIcon = categoryInfo?.icon || AlertCircle;

//   useEffect(() => {
//     const fetchDetail = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/requests/find/${params.id}`,
//         );
//         if (!response.ok) throw new Error("Demande introuvable");
//         const data = await response.json();
//         setRequest(data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (params.id) fetchDetail();
//   }, [params.id]);

//   const handleCommitment = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/requests/update/${params.id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ status: "EN_COURS" }),
//         },
//       );

//       if (response.ok) {
//         setHasCommitted(true);
//         setIsModalOpen(false);
//       } else {
//         alert("Une erreur est survenue. Veuillez réessayer.");
//       }
//     } catch (error) {
//       console.error("Erreur API:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
//       </div>
//     );
//   }

//   if (!request) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <p className="text-gray-500 mb-4">
//           Cette demande n'existe plus ou a été supprimée.
//         </p>
//         <Link
//           href="/besoins"
//           className="text-emerald-600 font-bold flex items-center gap-2"
//         >
//           <ArrowLeft className="w-4 h-4" /> Retour à la liste
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-24 pb-12">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Navigation */}
//         <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
//           <Link
//             href="/besoins"
//             className="hover:text-emerald-600 flex items-center gap-1 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" /> Retour aux besoins
//           </Link>
//           <span>/</span>
//           <span className="truncate max-w-[200px] font-medium text-gray-700">
//             {request.title}
//           </span>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* COLONNE GAUCHE : Contenu */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//               <div className="p-6 border-b border-gray-50 bg-white">
//                 <div className="flex flex-wrap gap-3 mb-4">
//                   {request.urgency === "HIGH" && (
//                     <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 animate-pulse">
//                       <AlertCircle className="w-3 h-3 mr-1" /> Urgent
//                     </span>
//                   )}
//                   <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 uppercase tracking-wider">
//                     <CategoryIcon className="w-3 h-3 mr-1" />
//                     {categoryInfo?.label || request.category}
//                   </span>
//                   <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
//                     <Clock className="w-3 h-3 mr-1" /> Posté le{" "}
//                     {new Date(request.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
//                   {request.title}
//                 </h1>
//               </div>

//               <div className="p-6 md:p-8">
//                 <div className="flex items-start gap-4 mb-8 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
//                   <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
//                     <User className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900 text-lg">
//                       Pour : {request.patientName}
//                     </p>
//                     <p className="text-gray-600 text-sm">
//                       Patient de {request.age} ans •{" "}
//                       {request.locationType === "HOSPITAL"
//                         ? "Hospitalisé"
//                         : "À domicile"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-3 ">
//                     Description
//                   </h3>
//                   <p className="whitespace-pre-line " dir="auto">
//                     {request.description}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* COLONNE DROITE : Action & Info */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-24 space-y-6">
//               <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-100 ring-1 ring-emerald-500/10">
//                 <div className="mb-6">
//                   <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 font-mono">
//                     Localisation
//                   </h3>
//                   <div className="flex items-start gap-3 text-gray-700">
//                     <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
//                     <div>
//                       <p className="font-bold text-gray-900">
//                         {request.hospital || "À domicile"}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         {request.wilaya}{" "}
//                         {request.commune && `- ${request.commune}`}
//                       </p>
//                       {request.service && (
//                         <p className="text-xs text-gray-500 mt-1 font-medium">
//                           Service : {request.service}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {hasCommitted || request.status === "EN_COURS" ? (
//                   <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 animate-in fade-in zoom-in duration-300">
//                     <div className="flex items-center gap-2 text-emerald-800 font-bold mb-2">
//                       <CheckCircle className="w-5 h-5" /> Engagement pris
//                     </div>
//                     <p className="text-sm text-emerald-700 mb-4 font-medium">
//                       Contactez la famille dès maintenant :
//                     </p>
//                     <div className="bg-white p-3 rounded-lg border border-emerald-100 flex items-center justify-between shadow-inner">
//                       <div className="flex items-center gap-2 text-gray-900 font-mono font-bold text-lg">
//                         <Phone className="w-4 h-4 text-gray-400" />{" "}
//                         {request.phone}
//                       </div>
//                       <a
//                         href={`tel:${request.phone}`}
//                         className="bg-emerald-600 text-white px-3 py-1 rounded-md text-sm hover:bg-emerald-700 transition-colors"
//                       >
//                         Appeler
//                       </a>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => setIsModalOpen(true)}
//                       className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
//                     >
//                       Je peux aider
//                     </button>
//                     <p className="text-[10px] text-center text-gray-400 mt-3 px-2 leading-tight uppercase tracking-tighter">
//                       Une fois cliqué, l'annonce sera masquée aux autres pour
//                       éviter les doublons.
//                     </p>
//                   </>
//                 )}
//               </div>

//               {/* Message de rappel en Arabe */}
//               <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-3 shadow-sm">
//                 <ShieldAlert className="w-6 h-6 text-orange-500 shrink-0" />
//                 <div className="text-right" dir="rtl">
//                   <h4 className="font-bold text-orange-800 text-sm mb-1">
//                     تنبيه هام
//                   </h4>
//                   <p className="text-[11px] text-orange-700 leading-normal">
//                     بمجرد تأكيدك للمساعدة، ستختفي هذه الحاجة من القائمة. المريض
//                     وأهله سيعتمدون عليك، فنرجو الجدية التامة.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- MODALE D'ENGAGEMENT --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
//             <div className="text-center mb-6">
//               <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <CheckCircle className="w-8 h-8 text-emerald-600" />
//               </div>
//               <h2 className="text-xl font-bold text-gray-900">
//                 Confirmation d'engagement
//               </h2>
//               <p className="text-gray-500 mt-2 text-sm px-4">
//                 En acceptant, vous devenez l'unique porteur d'espoir pour cette
//                 famille.
//               </p>
//             </div>

//             <div className="space-y-4 mb-8">
//               <CheckItem text="J'ai l'aide demandée à disposition." />
//               <CheckItem text="Je m'engage à appeler la famille sous peu." />
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="flex-1 py-3 text-gray-500 font-medium hover:bg-gray-100 rounded-xl transition-colors"
//               >
//                 Annuler
//               </button>
//               <button
//                 onClick={handleCommitment}
//                 className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-colors"
//               >
//                 Je confirme
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function CheckItem({ text }: { text: string }) {
//   return (
//     <div className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
//       <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center shrink-0">
//         <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
//       </div>
//       <p className="text-sm text-gray-700 font-medium">{text}</p>
//     </div>
//   );
// }

"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPin,
  Clock,
  AlertCircle,
  User,
  Phone,
  CheckCircle,
  ShieldAlert,
  ArrowLeft,
  Loader2,
  Bug,
} from "lucide-react";
import { CATEGORIES, CategoryId } from "@/data/constants";

interface RequestDetail {
  _id: string;
  title: string;
  description: string;
  category: CategoryId;
  urgency: "LOW" | "MEDIUM" | "HIGH";
  patientName: string;
  age: number;
  locationType: "HOSPITAL" | "HOME";
  hospital?: string;
  wilaya: string;
  commune?: string;
  service?: string;
  phone: string;
  status: string;
  createdAt: string;
}

export default function RequestDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [request, setRequest] = useState<RequestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasCommitted, setHasCommitted] = useState(false);

  // --- ÉTAT DE DEBUG BRUTAL ---
  const [debugInfo, setDebugInfo] = useState<{
    urlAppelee: string;
    status: number | string;
    error: string;
  } | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;

      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
      const finalUrl = `${baseUrl}/requests/find/${id}`;

      try {
        setLoading(true);
        const response = await fetch(finalUrl, { cache: "no-store" });

        if (!response.ok) {
          setDebugInfo({
            urlAppelee: finalUrl,
            status: response.status,
            error: "Le backend a renvoyé une erreur ou l'ID n'existe pas.",
          });
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        setRequest(data);
      } catch (error: any) {
        console.error("Erreur détaillée:", error);
        setDebugInfo({
          urlAppelee: finalUrl,
          status: "CRASH_FETCH",
          error: error.message || "Erreur de connexion au serveur",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleCommitment = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
      const response = await fetch(`${baseUrl}/requests/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "EN_COURS" }),
      });

      if (response.ok) {
        setHasCommitted(true);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Erreur API Update:", error);
    }
  };

  // 1. Écran de chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
      </div>
    );
  }

  // 2. Écran de DEBUG (Si ça ne marche toujours pas sur Vercel)
  if (debugInfo && !request) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6 text-white font-mono">
        <div className="max-w-2xl w-full border border-red-500 p-6 rounded-lg bg-slate-800 shadow-2xl">
          <div className="flex items-center gap-3 text-red-400 mb-6 border-b border-red-900/50 pb-4">
            <Bug className="w-8 h-8" />
            <h1 className="text-xl font-bold uppercase tracking-widest">
              Diagnostic Brutal
            </h1>
          </div>
          <div className="space-y-4 text-sm">
            <p>
              <span className="text-emerald-400">ID détecté :</span>{" "}
              {id || "NON DÉTECTÉ"}
            </p>
            <p>
              <span className="text-emerald-400">URL Backend :</span>{" "}
              {debugInfo.urlAppelee}
            </p>
            <p>
              <span className="text-emerald-400">Status HTTP :</span>{" "}
              <span className="bg-red-900 px-2 py-0.5 rounded">
                {debugInfo.status}
              </span>
            </p>
            <p className="bg-black/50 p-4 rounded text-red-300 border-l-4 border-red-600">
              <span className="block font-bold mb-1">Erreur :</span>
              {debugInfo.error}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 w-full py-3 bg-red-600 hover:bg-red-700 font-bold rounded transition-colors"
          >
            RECHARGER LA PAGE
          </button>
          <Link
            href="/besoins"
            className="block text-center mt-4 text-slate-400 underline"
          >
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  // 3. Rendu Normal (Le reste de ton code)
  const categoryInfo = CATEGORIES.find((c) => c.id === request?.category);
  const CategoryIcon = categoryInfo?.icon || AlertCircle;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/besoins"
            className="hover:text-emerald-600 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <span>/</span>
          <span className="truncate font-medium text-gray-700">
            {request?.title}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50">
                <div className="flex flex-wrap gap-3 mb-4">
                  {request?.urgency === "HIGH" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                      <AlertCircle className="w-3 h-3 mr-1" /> Urgent
                    </span>
                  )}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    <CategoryIcon className="w-3 h-3 mr-1" />{" "}
                    {categoryInfo?.label}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {request?.title}
                </h1>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-8 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <User className="w-6 h-6 text-emerald-700" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Pour : {request?.patientName}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {request?.age} ans •{" "}
                      {request?.locationType === "HOSPITAL"
                        ? "Hospitalisé"
                        : "À domicile"}
                    </p>
                  </div>
                </div>
                <div className="prose prose-emerald max-w-none text-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h3>
                  <p className="whitespace-pre-line" dir="auto">
                    {request?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-100">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">
                  Localisation
                </h3>
                <div className="flex items-start gap-3 text-gray-700 mb-6">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">
                      {request?.hospital || "À domicile"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {request?.wilaya}{" "}
                      {request?.commune && `- ${request?.commune}`}
                    </p>
                  </div>
                </div>

                {hasCommitted || request?.status === "EN_COURS" ? (
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold mb-2">
                      <CheckCircle className="w-5 h-5" /> Engagement pris
                    </div>
                    <div className="bg-white p-3 rounded-lg flex items-center justify-between">
                      <span className="font-bold">{request?.phone}</span>
                      <a
                        href={`tel:${request?.phone}`}
                        className="bg-emerald-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Appeler
                      </a>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg"
                  >
                    Je peux aider
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Confirmation d'engagement
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 text-gray-500 font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleCommitment}
                className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg"
              >
                Je confirme
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
