import {
  HeartHandshake,
  Stethoscope,
  Utensils,
  Baby,
  Smile,
  Truck,
  Activity,
  MoreHorizontal,
  LucideIcon,
} from "lucide-react";

export type CategoryId =
  | "ALL"
  | "SANG"
  | "MEDICAMENT"
  | "TRANSPORT"
  | "SCANNER/RADIO/ANALYSES"
  | "REPAS"
  | "VISITE"
  | "AUTRE";

export interface Category {
  id: CategoryId;
  label: string;
  slug: string;
  icon: LucideIcon; // On stocke le composant d'icône ici
}

export const CATEGORIES: Category[] = [
  { id: "ALL", label: "Tout", slug: "all", icon: HeartHandshake },
  { id: "SANG", label: "Sang", slug: "sang", icon: Activity },
  {
    id: "MEDICAMENT",
    label: "Médicaments",
    slug: "medicament",
    icon: Stethoscope,
  },
  {
    id: "TRANSPORT",
    label: "Transport/Ambulance",
    slug: "transport",
    icon: Truck,
  },
  {
    id: "SCANNER/RADIO/ANALYSES",
    label: "Scanner/Radio/Analyses",
    slug: "scanner/radio/analyses",
    icon: Stethoscope,
  },
  { id: "REPAS", label: "Repas", slug: "repas", icon: Utensils },
  { id: "VISITE", label: "Soutien Moral", slug: "visite", icon: Smile },
  { id: "AUTRE", label: "Autres", slug: "autre", icon: MoreHorizontal },
];

// 2. Les Wilayas
export const WILAYAS = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annabba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arreridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
  "El M'Ghair",
  "El Meniaa",
  "Ouled Djellal",
  "Bordj Baji Mokhtar",
  "Béni Abbès",
  "Timimoun",
  "Touggourt",
  "Djanet",
  "In Salah",
  "In Guezzam",
].sort();
