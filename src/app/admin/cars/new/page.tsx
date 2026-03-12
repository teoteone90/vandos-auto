"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

export default function AddCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    category: "CAR",
    make: "",
    model: "",
    trim: "",
    engineSize: "",
    fuelType: "PETROL",
    year: new Date().getFullYear().toString(),
    price: "",
    kms: "",
    color: "",
    vin: "",
    description: "",
  });

  const [images, setImages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        images: images
      };

      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Errore durante il salvataggio");
      }

      router.push("/admin/cars");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/cars" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Aggiungi Nuova Auto</h1>
          <p className="text-gray-600 mt-1">Inserisci i dettagli del veicolo per aggiungerlo al catalogo.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-6">Informazioni Obbligatorie</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="CAR">Auto</option>
              <option value="VAN">Furgone</option>
              <option value="MOTORCYCLE">Moto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alimentazione *</label>
            <select 
              name="fuelType" 
              value={formData.fuelType} 
              onChange={handleChange} 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="PETROL">Benzina</option>
              <option value="DIESEL">Diesel</option>
              <option value="ELECTRIC">Elettrica</option>
              <option value="HYBRID">Ibrida</option>
              <option value="LPG">GPL</option>
              <option value="OTHER">Altro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marca *</label>
            <input 
              type="text" 
              name="make" 
              value={formData.make} 
              onChange={handleChange} 
              required 
              placeholder="es. BMW"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modello *</label>
            <input 
              type="text" 
              name="model" 
              value={formData.model} 
              onChange={handleChange} 
              required 
              placeholder="es. M4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Allestimento *</label>
            <input 
              type="text" 
              name="trim" 
              value={formData.trim} 
              onChange={handleChange} 
              required 
              placeholder="es. Competition M xDrive"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cilindrata (cc) *</label>
            <input 
              type="number" 
              name="engineSize" 
              value={formData.engineSize} 
              onChange={handleChange} 
              required 
              placeholder="es. 2993"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Anno Immatricolazione *</label>
            <input 
              type="number" 
              name="year" 
              value={formData.year} 
              onChange={handleChange} 
              required 
              min="1900"
              max={new Date().getFullYear() + 1}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prezzo (€) *</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
              placeholder="es. 45000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-6 mt-8">Dettagli Opzionali</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chilometraggio (km)</label>
            <input 
              type="number" 
              name="kms" 
              value={formData.kms} 
              onChange={handleChange} 
              placeholder="es. 25000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Colore Esterno</label>
            <input 
              type="text" 
              name="color" 
              value={formData.color} 
              onChange={handleChange} 
              placeholder="es. Nero Metallizzato"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Numero Telaio (VIN)</label>
            <input 
              type="text" 
              name="vin" 
              value={formData.vin} 
              onChange={handleChange} 
              placeholder="es. WBA..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-4">Immagini Veicolo</label>
            <ImageUpload 
              value={images}
              onChange={(urls) => setImages(urls)}
              onRemove={(url) => setImages(images.filter(i => i !== url))}
            />
            <p className="text-xs text-gray-500 mt-2">Carica una o più foto reali del veicolo. La prima sarà l'immagine principale.</p>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrizione Aggiuntiva</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows={4}
            placeholder="Dettagli sulle condizioni, garanzia, optionals..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <Link 
            href="/admin/cars" 
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annulla
          </Link>
          <button 
            type="submit" 
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 font-medium rounded-lg text-white transition-colors ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Save className="w-5 h-5" />
            {loading ? "Salvataggio..." : "Salva Veicolo"}
          </button>
        </div>

      </form>
    </div>
  );
}
