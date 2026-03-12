"use client";

import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    make: searchParams.get("make") || "",
    fuelType: searchParams.get("fuelType") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    router.push(`/?${params.toString()}`);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setFilters({ search: "", category: "", make: "", fuelType: "", maxPrice: "" });
    router.push("/");
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-12 px-4 relative z-20">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
        <form onSubmit={handleApply} className="flex items-center">
          <div className="flex-1 flex items-center px-4">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Cerca per modello o marca..."
              className="w-full py-3 bg-transparent border-none focus:ring-0 text-gray-900 outline-none"
            />
          </div>
          
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="hidden md:flex items-center gap-2 px-6 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium border-l border-gray-100"
          >
            <Filter className="w-4 h-4" />
            Filtri
          </button>
          
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 rounded-xl font-medium transition-colors ml-2 shadow-md hover:shadow-lg"
          >
            Cerca
          </button>
        </form>
      </div>

      {/* Advanced Filters Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-4 right-4 md:left-auto md:right-8 md:w-96 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Filtri Avanzati</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select name="category" value={filters.category} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Tutte le categorie</option>
                <option value="CAR">Auto</option>
                <option value="VAN">Furgone</option>
                <option value="MOTORCYCLE">Moto</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alimentazione</label>
              <select name="fuelType" value={filters.fuelType} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Tutte</option>
                <option value="PETROL">Benzina</option>
                <option value="DIESEL">Diesel</option>
                <option value="ELECTRIC">Elettrica</option>
                <option value="HYBRID">Ibrida</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prezzo Massimo (€)</label>
              <input 
                type="number" 
                name="maxPrice" 
                placeholder="es. 30000" 
                value={filters.maxPrice} 
                onChange={handleChange} 
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
              />
            </div>

            <div className="pt-4 flex gap-3 border-t border-gray-100">
              <button onClick={clearFilters} className="flex-1 py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-medium transition-colors">
                Ripristina
              </button>
              <button onClick={handleApply} className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm">
                Applica
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
