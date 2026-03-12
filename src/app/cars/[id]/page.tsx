import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Car, Fuel, Gauge, Calendar, Palette, Info, CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const car = await prisma.car.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!car) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(car.price);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900 line-clamp-1">
            {car.make} {car.model} {car.trim}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galleria Immagini */}
          <div className="space-y-4">
            <div className="relative aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-sm">
              {car.images.length > 0 ? (
                <Image
                  src={car.images[0].url}
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <Car className="w-16 h-16 mb-2 opacity-20" />
                  <span>Nessuna immagine disponibile</span>
                </div>
              )}
            </div>
            
            {car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {car.images.slice(1).map((image: any, index: number) => (
                  <div key={image.id} className="relative aspect-square bg-gray-200 rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                    <Image
                      src={image.url}
                      alt={`${car.make} ${car.model} preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dettagli e Prezzo */}
          <div className="space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
                    {car.category === 'CAR' ? 'Auto' : car.category === 'VAN' ? 'Furgone' : 'Moto'}
                  </span>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                    {car.make} {car.model}
                  </h2>
                  <p className="text-xl text-gray-500 font-medium">{car.trim}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-blue-600 tracking-tight">
                    {formattedPrice}
                  </p>
                  <p className="text-sm text-gray-400">IVA inclusa</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100 my-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase">Anno</p>
                    <p className="text-sm font-bold text-gray-900">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase">Kilometri</p>
                    <p className="text-sm font-bold text-gray-900">{car.kms ? `${car.kms.toLocaleString('it-IT')} km` : 'N/D'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                    <Fuel className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase">Alimentazione</p>
                    <p className="text-sm font-bold text-gray-900">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase">Colore</p>
                    <p className="text-sm font-bold text-gray-900">{car.color || 'N/D'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link 
                  href="/sell" 
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200"
                >
                  Contattaci per questa auto
                </Link>
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> Garanzia 12 mesi</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> Tagliando incluso</span>
                </div>
              </div>
            </div>

            {car.description && (
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Descrizione del veicolo</h3>
                </div>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {car.description}
                </p>
              </div>
            )}

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Specifiche tecniche</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Cilindrata</span>
                  <span className="font-bold text-gray-900">{car.engineSize} cc</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Codice Telaio (VIN)</span>
                  <span className="font-bold text-gray-900">{car.vin || 'Disponibile su richiesta'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
