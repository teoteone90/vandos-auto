import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Car, MailWarning, Users } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  // Load counts for the dashboard cards
  const carsCount = await prisma.car.count();
  const proposalsCount = await prisma.submission.count({
    where: { viewed: false }
  });
  // @ts-ignore
  const subscribersCount = await prisma.subscriber.count();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Benvenuto nel pannello di amministrazione di Vandos, {session?.user?.name || 'Admin'}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Auto in Vetrina</p>
            <h3 className="text-3xl font-bold text-gray-900">{carsCount}</h3>
          </div>
          <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <Car className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Nuove Proposte</p>
            <h3 className="text-3xl font-bold text-gray-900">{proposalsCount}</h3>
          </div>
          <div className="h-12 w-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600">
            <MailWarning className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Iscritti Newsletter</p>
            <h3 className="text-3xl font-bold text-gray-900">{subscribersCount}</h3>
          </div>
          <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
            <Users className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Azioni Rapide</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/admin/cars" className="p-4 border border-blue-100 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex flex-col items-center justify-center text-center">
            <Car className="h-8 w-8 text-blue-600 mb-2" />
            <span className="font-medium text-blue-900">Aggiungi Nuova Auto</span>
          </a>
          <a href="/admin/proposals" className="p-4 border border-yellow-100 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors flex flex-col items-center justify-center text-center">
            <MailWarning className="h-8 w-8 text-yellow-600 mb-2" />
            <span className="font-medium text-yellow-900">Verifica Proposte da Clienti</span>
          </a>
        </div>
      </div>
    </div>
  );
}
