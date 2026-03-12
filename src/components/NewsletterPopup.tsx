"use client";

import { useState, useEffect } from "react";
import { X, MailOpen } from "lucide-react";

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Controlla se l'utente ha già visto o chiuso il popup in precedenza
    const hasSeenPopup = localStorage.getItem("vandos_newsletter_seen");
    
    if (!hasSeenPopup) {
      // Mostra il popup dopo 5 secondi di permanenza sul sito
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem("vandos_newsletter_seen", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Iscrizione completata con successo!");
        // Chiudi automaticamente dopo 3 secondi dal successo
        setTimeout(() => closePopup(), 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Si è verificato un errore.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Errore di connessione.");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
      >
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100/50 hover:bg-gray-100 rounded-full p-1.5 transition-colors z-10"
          aria-label="Chiudi finestra"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute -inset-1 opacity-20 transform translate-y-1/2 -skew-y-12 bg-white/20"></div>
          <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 relative z-10 backdrop-blur-md border border-white/30">
            <MailOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2 relative z-10">Resta Aggiornato</h2>
          <p className="text-blue-100 text-sm max-w-[280px] mx-auto relative z-10">
            Non perderti le nostre migliori offerte di auto importate. Massimo 2 email a settimana, niente spam!
          </p>
        </div>

        <div className="p-8">
          {status === "success" ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <p className="font-medium text-gray-900">{message}</p>
              <p className="text-sm text-gray-500 mt-1">Grazie per esserti iscritto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "error" && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
                  {message}
                </div>
              )}
              
              <div>
                <label htmlFor="newsletter-email" className="sr-only">Indirizzo Email</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Il tuo indirizzo email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || !email}
                className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all transform active:scale-[0.98] ${
                  status === "loading" || !email
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                }`}
              >
                {status === "loading" ? "Invio in corso..." : "Iscriviti Ora"}
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-4">
                Potrai annullare l'iscrizione in qualsiasi momento.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
