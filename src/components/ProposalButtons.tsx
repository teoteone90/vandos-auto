"use client";

import { CheckCircle2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function MarkProposalReadButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleMarkRead = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/proposals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ viewed: true }),
      });
      if (res.ok) router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleMarkRead}
      disabled={loading}
      className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
        loading ? "text-gray-400 bg-gray-100" : "text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100"
      }`}
    >
      <CheckCircle2 className="w-4 h-4" />
      {loading ? "..." : "Segna Letto"}
    </button>
  );
}

export function DeleteProposalButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Sei sicuro di voler eliminare questa proposta?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/proposals/${id}`, { method: "DELETE" });
      if (res.ok) router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className={`p-1.5 rounded-md transition-colors ${
        loading ? "text-gray-400 bg-gray-100" : "text-red-600 hover:bg-red-50"
      }`}
      title="Elimina Messaggio"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
