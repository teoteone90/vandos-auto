import Link from "next/link";
import { Car, Euro, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-40 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black text-gray-900 tracking-tighter flex items-center gap-2">
          <span className="bg-blue-600 text-white p-1.5 rounded-lg">VA</span>
          VANDOS
        </Link>
        <nav className="flex gap-6 items-center">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-1.5 hidden sm:flex">
             <Car className="w-4 h-4" />
             Auto Disponibili
          </Link>
          <Link href="/sell" className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-xl font-medium transition-colors inline-flex items-center gap-1.5 border border-blue-100 hover:border-blue-600 shadow-sm">
             <Euro className="w-4 h-4" />
             Vendi auto
          </Link>
          <Link href="/login" className="text-gray-500 hover:text-blue-600 font-medium transition-colors flex items-center gap-1.5 ml-2 border-l border-gray-200 pl-4">
             <User className="w-5 h-5" />
             <span className="hidden sm:inline">Admin</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
