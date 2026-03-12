import CarCard from "@/components/CarCard";
import { prisma } from "@/lib/prisma";
import SearchBar from "@/components/SearchBar";
import { Prisma } from "@prisma/client";

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const params = await searchParams;
  const { search, category, make, fuelType, maxPrice } = params;

  // Costruiamo dinamicamente il filtro su Prisma
  const where: any = {};

  if (search) {
    where.OR = [
      { make: { contains: search } },
      { model: { contains: search } }
    ];
  }
  if (category) where.category = category;
  if (make) where.make = { contains: make };
  if (fuelType) where.fuelType = fuelType;
  if (maxPrice) where.price = { lte: parseFloat(maxPrice) };

  const cars = await prisma.car.findMany({
    where,
    include: {
      images: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <section>
      <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-90"></div>
        {/* Potremmo inserire un'immagine di sfondo qui in futuro */}
        <div className="relative z-10 px-4 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white drop-shadow-sm">
              Vandos Auto Import-Export
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
            Trova l'auto dei tuoi sogni con la garanzia e qualità del leader nell'import-export internazionale.
          </p>
        </div>
      </div>
      
      {/* Cerca in un riquadro sospeso sopra (margin-top negativo) */}
      <div className="-mt-20 relative z-20 mb-16">
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-8 pb-16">
        {cars.map((car) => (
          // @ts-ignore
          <CarCard key={car.id} car={car} />
        ))}
        {cars.length === 0 && (
          <div className="col-span-full border-2 border-dashed border-gray-200 rounded-2xl text-center py-20 text-gray-500 text-lg">
            Nessuna auto disponibile corrisponde alla tua ricerca. Prova ad allargare i filtri!
          </div>
        )}
      </div>
    </section>
  );
}

