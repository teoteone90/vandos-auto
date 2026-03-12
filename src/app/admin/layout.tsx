import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CarFront, LayoutDashboard, Settings, Users } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import LogoutButton from "../../components/LogoutButton";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <CarFront className="text-blue-600" />
            Vandos Admin
          </h2>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/cars" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <CarFront className="w-5 h-5" />
            <span>Gestione Auto</span>
          </Link>
          <Link href="/admin/proposals" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <Users className="w-5 h-5" />
            <span>Proposte Clienti</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Impostazioni</span>
          </Link>
        </div>
        <div className="p-4 border-t border-gray-200">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center md:hidden">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <CarFront className="text-blue-600" />
            Vandos Admin
          </h2>
          <button className="text-gray-500">Menu</button>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
