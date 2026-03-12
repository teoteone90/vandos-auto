"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })}
      className="flex w-full items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
    >
      <LogOut className="w-5 h-5" />
      <span>Esci (Logout)</span>
    </button>
  );
}
