"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  User,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Building2,
  Home,
  Phone,
} from "lucide-react";
// Import de tes constantes globales
import { CATEGORIES, WILAYAS, CategoryId } from "@/data/constants";

/* ================= TYPES ================= */

type Step = 0 | 1 | 2; // Ajusté à 2 car tu as 3 étapes (0, 1, 2)
type LocationType = "HOSPITAL" | "HOME";

type FormData = {
  locationType: LocationType;
  wilaya: string;
  commune: string;
  hospital: string;
  service: string;
  category: CategoryId | "";
  urgency: string;
  title: string;
  description: string;
  patientName: string;
  phone: string;
  age: string;
};

/* ================= STEP COMPONENTS (Inchangés mais propres) ================= */

function StepIdentity({
  formData,
  handleChange,
}: {
  formData: FormData;
  handleChange: any;
}) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Qui a besoin d'aide ?
        </h2>
        <p className="text-gray-500">
          Ces informations aident à humaniser votre demande.
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom (ou Pseudonyme)
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Ex: Mohamed K."
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Âge
        </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Ex: 45"
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Numéro de téléphone
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-500 font-bold">
            +213
          </span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="05 50 12 34 56"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-r-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
}

function StepLocation({
  formData,
  setFormData,
  handleChange,
}: {
  formData: FormData;
  setFormData: any;
  handleChange: any;
}) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Localisation</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          type="button"
          onClick={() =>
            setFormData((prev: any) => ({ ...prev, locationType: "HOSPITAL" }))
          }
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${formData.locationType === "HOSPITAL" ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm" : "border-gray-100 bg-white text-gray-500 hover:bg-gray-50"}`}
        >
          <Building2 className="w-8 h-8 mb-2" />
          <span className="font-bold">À l'Hôpital</span>
        </button>
        <button
          type="button"
          onClick={() =>
            setFormData((prev: any) => ({ ...prev, locationType: "HOME" }))
          }
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${formData.locationType === "HOME" ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm" : "border-gray-100 bg-white text-gray-500 hover:bg-gray-50"}`}
        >
          <Home className="w-8 h-8 mb-2" />
          <span className="font-bold">À la Maison</span>
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Wilaya
        </label>
        <select
          name="wilaya"
          value={formData.wilaya}
          onChange={handleChange}
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
        >
          <option value="">Sélectionnez la Wilaya</option>
          {WILAYAS.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>
      {formData.locationType === "HOSPITAL" ? (
        <div className="space-y-4 animate-in fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom de l'Hôpital
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              placeholder="Ex: CHU Mustapha Bacha"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Commune / Quartier
          </label>
          <input
            type="text"
            name="commune"
            value={formData.commune}
            onChange={handleChange}
            placeholder="Ex: Kouba, Garidi 1"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      )}
    </div>
  );
}

function StepDetails({
  formData,
  setFormData,
  handleChange,
}: {
  formData: FormData;
  setFormData: any;
  handleChange: any;
}) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Détails du besoin</h2>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Catégorie
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.filter((c) => c.id !== "ALL").map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() =>
                setFormData((prev: any) => ({ ...prev, category: cat.id }))
              }
              className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${formData.category === cat.id ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-100 bg-white text-gray-500 hover:border-emerald-200"}`}
            >
              <cat.icon className="w-5 h-5 mb-2" />
              <span className="text-[11px] font-bold text-center leading-tight">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Degré d'Urgence
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              id: "LOW",
              label: "Normal",
              color: "border-blue-500 bg-blue-50 text-blue-700",
            },
            {
              id: "MEDIUM",
              label: "Urgent",
              color: "border-orange-500 bg-orange-50 text-orange-700",
            },
            {
              id: "HIGH",
              label: "Vital",
              color: "border-red-500 bg-red-50 text-red-700",
            },
          ].map((urg) => (
            <button
              key={urg.id}
              type="button"
              onClick={() =>
                setFormData((prev: any) => ({ ...prev, urgency: urg.id }))
              }
              className={`p-3 rounded-xl border-2 transition-all text-sm font-bold ${formData.urgency === urg.id ? urg.color : "border-gray-100 text-gray-500"}`}
            >
              {urg.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Titre de la demande"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
        />
        <textarea
          name="description"
          rows={4}
          placeholder="Détaillez votre besoin ici..."
          value={formData.description}
          onChange={handleChange}
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none resize-none"
        />
      </div>
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */

export default function CreateRequestPage() {
  const [currentStep, setCurrentStep] = useState<Step>(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    locationType: "HOSPITAL",
    wilaya: "",
    commune: "",
    hospital: "",
    service: "",
    category: "",
    urgency: "MEDIUM",
    title: "",
    description: "",
    patientName: "",
    phone: "",
    age: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.MouseEvent) => {
    // Empêche toute tentative de soumission du formulaire par le bouton "Continuer"
    e.preventDefault();

    if (currentStep === 0) {
      if (!formData.patientName || !formData.phone)
        return alert("Nom et téléphone requis.");
    }
    if (currentStep === 1) {
      if (!formData.wilaya) return alert("La Wilaya est requise.");
    }

    setCurrentStep((prev) => (prev + 1) as Step);
  };

  const handleBack = () => setCurrentStep((prev) => (prev - 1) as Step);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // On ne valide les détails que lors de la soumission finale (Step 2)
    if (!formData.category || !formData.title) {
      return alert(
        "Veuillez remplir les détails du besoin (Catégorie et Titre).",
      );
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/requests/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        window.location.href = "/besoins?success=true";
      } else {
        alert("Une erreur est survenue lors de la publication.");
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8 flex justify-between items-center px-2">
          {[0, 1, 2].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full flex-1 mx-1 ${currentStep >= s ? "bg-emerald-500" : "bg-gray-200"}`}
            />
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
          <form onSubmit={handleSubmit}>
            {currentStep === 0 && (
              <StepIdentity formData={formData} handleChange={handleChange} />
            )}
            {currentStep === 1 && (
              <StepLocation
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
              />
            )}
            {currentStep === 2 && (
              <StepDetails
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
              />
            )}

            <div className="flex gap-4 mt-10 pt-6 border-t border-gray-100">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-xl text-gray-600 hover:bg-gray-100 font-medium flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" /> Retour
                </button>
              )}

              <button
                // Modification ici : "submit" uniquement à l'étape finale
                type={currentStep === 2 ? "submit" : "button"}
                onClick={currentStep === 2 ? undefined : handleNext}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading
                  ? "Publication..."
                  : currentStep === 2
                    ? "Publier la demande"
                    : "Continuer"}
                {!loading && <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
