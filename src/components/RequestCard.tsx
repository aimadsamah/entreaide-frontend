import Link from "next/link";
import { MapPin, Clock, AlertCircle, User, ArrowRight } from "lucide-react";

// Types (à mettre idéalement dans un fichier types.ts partagé)
export type UrgencyLevel = "HIGH" | "MEDIUM" | "LOW";
export type Category =
  | "MEDICAMENT"
  | "REPAS"
  | "VISITE"
  | "AUTRE"
  | "TRANSPORT"
  | "SCANNER/RADIO/ANALYSES"
  | "SANG";

export interface Request {
  id: string;
  title: string;
  patientName: string;
  age: number;
  hospital: string;
  wilaya: string; // Code wilaya (ex: "16")
  //  wilayaName: string; // Nom (ex: "Alger")
  category: Category;
  urgency: UrgencyLevel;
  createdAt: string; // Date ISO
  description: string;
}

interface RequestCardProps {
  request: Request;
}

const getUrgencyStyles = (level: UrgencyLevel) => {
  switch (level) {
    case "HIGH":
      return "bg-red-50 text-red-700 border-red-100 ring-red-500/10";
    case "MEDIUM":
      return "bg-orange-50 text-orange-700 border-orange-100 ring-orange-500/10";
    default:
      return "bg-blue-50 text-blue-700 border-blue-100 ring-blue-500/10";
  }
};

const getCategoryLabel = (cat: Category) => {
  const labels: Record<Category, string> = {
    MEDICAMENT: "Médicament",
    REPAS: "Alimentation",
    VISITE: "Visite",
    TRANSPORT: "Transport",
    "SCANNER/RADIO/ANALYSES": "Examen",
    SANG: "Sang",
    AUTRE: "Autre besoin",
  };
  return labels[cat];
};

export default function RequestCard({ request }: RequestCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* En-tête : Urgence & Catégorie */}
      <div className="p-5 pb-0 flex justify-between items-start">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${getUrgencyStyles(request.urgency)}`}
        >
          {request.urgency === "HIGH" && (
            <AlertCircle className="w-3 h-3 mr-1 animate-pulse" />
          )}
          {request.urgency === "HIGH"
            ? "Urgent"
            : request.urgency === "MEDIUM"
              ? "Important"
              : "Besoin"}
        </span>
        <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
          {getCategoryLabel(request.category)}
        </span>
      </div>

      {/* Corps : Info Patient & Besoin */}
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2 line-clamp-2">
          {request.title}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <User className="w-4 h-4" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900">
              {request.patientName}, {request.age} ans
            </p>
            {/* <p className="text-xs text-gray-500">Patient hospitalisé</p> */}
          </div>
        </div>

        <div className="space-y-2 border-t border-gray-50 pt-3">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <span>
              <span className="font-medium text-gray-900">
                {request.hospital}
              </span>
              <br />
              <span className="text-gray-500">
                {request.wilaya}
                {/* - {request.wilayaName} */}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            <span>
              {new Date(request.createdAt).toLocaleDateString("fr-FR")}
            </span>
          </div>
        </div>
      </div>

      {/* Footer : Action */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 mt-auto">
        <Link
          href={`/besoins/${request.id}`}
          className="flex items-center justify-center w-full gap-2 px-4 py-2 bg-white hover:bg-emerald-600 text-gray-700 hover:text-white border border-gray-200 hover:border-emerald-600 rounded-xl font-medium transition-all duration-300 shadow-sm group-hover:shadow"
        >
          Voir le détail
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
