"use client";

import { useState } from "react";
import { Send, Car, ShieldCheck, Camera } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import ImageUpload from "@/components/ImageUpload";

export default function SellCarPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carMake: "",
    carModel: "",
    carYear: "",
    carKms: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const payload = {
        ...formData,
        carYear: Number(formData.carYear),
        carKms: Number(formData.carKms),
        images: uploadedImages,
      };

      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Impossibile inviare la proposta");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", carMake: "", carModel: "", carYear: "", carKms: "", message: "" });
      setUploadedImages([]);
      window.scrollTo(0, 0);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900";

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          {t.sellTitle}
        </h1>
        <p className="text-xl text-gray-600">{t.sellSubtitle}</p>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Colonna Sinistra */}
        <div className="lg:col-span-4 mb-10 lg:mb-0">
          <div className="bg-blue-50 rounded-2xl p-8 h-full border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.whyUs}</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <ShieldCheck className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Valutazione Sicura</h4>
                  <p className="mt-1 text-gray-600">Quotazioni allineate al mercato reale senza sorprese.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Car className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Passaggio Immediato</h4>
                  <p className="mt-1 text-gray-600">Gestiamo noi tutta la burocrazia del trapasso.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Camera className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Carica le Foto</h4>
                  <p className="mt-1 text-gray-600">Aggiunge foto reali per una valutazione più veloce e precisa.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Colonna Destra: Il Form */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
            {status === "success" && (
              <div className="mb-8 bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl flex items-center justify-center flex-col text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t.successTitle}</h3>
                <p>{t.successMessage}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 px-6 py-2 bg-white text-green-700 font-medium rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
                >
                  {t.sendAnother}
                </button>
              </div>
            )}

            {status !== "success" && (
              <form onSubmit={handleSubmit} className="space-y-8">
                {status === "error" && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-6">{t.yourData}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.fullName} *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.email} *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-6">{t.vehicleInfo}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.brand} *</label>
                      <input type="text" name="carMake" placeholder="es. Audi" value={formData.carMake} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.model} *</label>
                      <input type="text" name="carModel" placeholder="es. A3" value={formData.carModel} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.year} *</label>
                      <input type="number" name="carYear" placeholder="es. 2019" min="1950" max={new Date().getFullYear()} value={formData.carYear} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.km} *</label>
                      <input type="number" name="carKms" placeholder="es. 85000" min="0" value={formData.carKms} onChange={handleChange} required className={inputClass} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.notes}</label>
                  <textarea name="message" rows={4} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`}></textarea>
                </div>

                {/* Upload Foto */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">
                    <Camera className="inline w-5 h-5 mr-2 text-blue-600" />
                    {t.carPhotos}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{t.carPhotosHint}</p>
                  <ImageUpload
                    value={uploadedImages}
                    onChange={setUploadedImages}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center gap-2 px-8 py-4 font-bold rounded-xl text-white shadow-lg transition-all ${
                      loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl"
                    }`}
                  >
                    <Send className="w-5 h-5" />
                    {loading ? t.submitting : t.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
