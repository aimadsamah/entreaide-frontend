import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "DirElKhir - Solidarité entre malades et donateurs",
  description: "Plateforme d'entraide médicale en Algérie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navbar />
        {/* Contenu principal */}
        <div className="min-h-screen flex flex-col">
          {/* Le flex-grow permet au contenu de pousser le footer en bas si la page est vide */}
          <main className="flex-grow">{children}</main>

          {/* Le Footer est toujours en bas */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
