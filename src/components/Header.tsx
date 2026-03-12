"use client";

import Link from "next/link";
import { Car, User, Globe } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Language } from "@/lib/translations";
import { useState } from "react";

const LANGS: { code: Language; flag: string; label: string }[] = [
  { code: 'it', flag: '🇮🇹', label: 'Italiano' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'ro', flag: '🇷🇴', label: 'Română' },
];

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const [showLang, setShowLang] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
            <span className="text-white font-extrabold text-sm">VA</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900">VANDOS</span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Car className="w-4 h-4" />
            <span className="hidden sm:inline">{t.availableCars}</span>
          </Link>

          <Link
            href="/sell"
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            <span>€</span>
            <span className="hidden sm:inline">{t.sellCar}</span>
          </Link>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLang(!showLang)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 border border-gray-200 rounded-xl transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">
                {LANGS.find(l => l.code === lang)?.flag} {lang.toUpperCase()}
              </span>
              <span className="sm:hidden">
                {LANGS.find(l => l.code === lang)?.flag}
              </span>
            </button>
            {showLang && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 min-w-[140px]">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setShowLang(false); }}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors ${lang === l.code ? 'font-bold text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/login"
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">{t.admin}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
