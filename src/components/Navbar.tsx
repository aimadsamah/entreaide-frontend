"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, PlusCircle } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  // Détection du scroll pour l'effet de transparence
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile lors d'un changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Les Demandes", href: "/besoins" },
    { name: "À propos", href: "/about" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-white shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* 1. LOGO */}
            <Link
              href="/"
              className="flex items-center gap-2 group relative z-50"
            >
              <div
                className={`p-2 rounded-xl transition-colors ${
                  isScrolled || isMobileMenuOpen
                    ? "bg-emerald-100"
                    : "bg-white/20 backdrop-blur-sm"
                }`}
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    isScrolled || isMobileMenuOpen
                      ? "text-emerald-600 fill-emerald-600"
                      : "text-white fill-white"
                  } group-hover:scale-110 duration-300`}
                />
              </div>
              <span
                className={`font-bold text-xl tracking-tight transition-colors ${
                  isScrolled || isMobileMenuOpen
                    ? "text-gray-900"
                    : "text-white"
                }`}
              >
                DirElKhir
              </span>
            </Link>

            {/* 2. NAVIGATION DESKTOP */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-emerald-500 ${
                    pathname === link.href
                      ? "text-emerald-500 font-semibold"
                      : isScrolled
                        ? "text-gray-600"
                        : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* 3. ACTION DESKTOP */}
            <div className="hidden md:flex items-center">
              <Link
                href="/demander-aide"
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${
                  isScrolled
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20"
                    : "bg-white text-emerald-700 hover:bg-emerald-50 shadow-black/10"
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publier un besoin</span>
              </Link>
            </div>

            {/* 4. BOUTON HAMBURGER (MOBILE) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-all ${
                  isScrolled || isMobileMenuOpen
                    ? "text-gray-900 hover:bg-gray-100"
                    : "text-white hover:bg-white/20"
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 5. MENU MOBILE (Full Screen Overlay) */}
        <div
          className={`fixed inset-0 bg-white z-[-1] transition-transform duration-500 ease-in-out md:hidden ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex flex-col h-full pt-24 pb-8 px-6">
            <div className="flex flex-col space-y-4 flex-grow">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-2xl font-bold py-4 border-b border-gray-50 ${
                    pathname === link.href
                      ? "text-emerald-600"
                      : "text-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto">
              <Link
                href="/demander-aide"
                className="flex justify-center items-center gap-3 w-full py-5 text-white font-bold bg-emerald-600 rounded-2xl shadow-xl active:scale-95 transition-transform"
              >
                <PlusCircle className="w-6 h-6" />
                <span className="text-lg">Publier</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay de fond pour bloquer le scroll quand le menu est ouvert */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
