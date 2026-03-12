"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteCarButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Sei sicuro di voler eliminare questa auto? Questa azione è irreversibile.")) return;
    
    setLoading(true);
    
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        router.refresh(); // Ricarica la lista dal server
      } else {
        alert("Errore durante l'eliminazione.");
      }
    } catch (error) {
      alert("Errore di rete.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className={`p-2 rounded-lg transition-colors ${loading ? "text-gray-400 bg-gray-100" : "text-red-600 hover:bg-red-50"}`}
      title="Elimina"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
