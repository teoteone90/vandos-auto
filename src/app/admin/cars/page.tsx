import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import Image from "next/image";
import DeleteCarButton from "@/components/DeleteCarButton";

export default async function AdminCarsPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const cars = await prisma.car.findMany({
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestione Auto</h1>
          <p className="text-gray-600 mt-1">Gestisci l&apos;inventario completo dei veicoli disponibili.</p>
        </div>
        <Link 
          href="/admin/cars/new" 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Aggiungi Auto
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500 uppercase tracking-wider">
                <th className="p-4">Veicolo</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Anno / Km</th>
                <th className="p-4">Alimentazione</th>
                <th className="p-4">Prezzo</th>
                <th className="p-4 text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cars.map((car: any) => (
                <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded bg-gray-100 overflow-hidden relative flex-shrink-0">
                        {car.images.length > 0 ? (
                          <Image 
                            src={car.images[0].url} 
                            alt={`${car.make} ${car.model}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{car.make} {car.model}</p>
                        <p className="text-sm text-gray-500">{car.trim}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {car.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {car.year} <br />
                    <span className="text-gray-400 text-xs">{car.kms ? `${car.kms.toLocaleString('it-IT')} km` : 'N/D'}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{car.fuelType}</td>
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(car.price)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/cars/${car.id}/edit`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Modifica"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteCarButton id={car.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {cars.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Nessun veicolo presente nell'inventario.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
