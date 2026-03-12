import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, Calendar, ArrowRight } from "lucide-react";

interface ImageModel {
  id: string;
  url: string;
}

interface Car {
  id: string;
  make: string;
  model: string;
  trim?: string;
  year: number;
  price: number;
  fuelType?: string;
  kms?: number;
  images: ImageModel[];
}

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  const imageUrl = car.images && car.images.length > 0 ? car.images[0].url : '/images/placeholder.jpg';

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
      {/* Immagine */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${car.make} ${car.model}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-gray-900 shadow-sm">
            {car.year}
          </span>
        </div>
      </div>

      {/* Contenuto */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-black text-gray-900 leading-tight">
            {car.make} <span className="text-blue-600">{car.model}</span>
          </h3>
          <p className="text-sm text-gray-400 font-medium truncate">{car.trim || 'Allestimento base'}</p>
        </div>

        {/* Info rapide */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6">
          <div className="flex items-center gap-2 text-gray-500">
            <Fuel className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-semibold uppercase tracking-wider">{car.fuelType || 'N/D'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Gauge className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-semibold uppercase tracking-wider">{car.kms ? `${car.kms.toLocaleString('it-IT')} km` : 'N/D'}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Prezzo</p>
            <p className="text-2xl font-black text-gray-900">
              {new Intl.NumberFormat("it-IT", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0
              }).format(car.price)}
            </p>
          </div>
          
          <Link 
            href={`/cars/${car.id}`}
            className="h-12 w-12 bg-blue-600 hover:bg-black text-white rounded-2xl flex items-center justify-center transition-colors shadow-lg shadow-blue-100 group-hover:rotate-12 duration-300"
          >
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
