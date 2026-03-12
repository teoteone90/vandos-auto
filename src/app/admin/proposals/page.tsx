import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Mail, Clock } from "lucide-react";
import { MarkProposalReadButton, DeleteProposalButton } from "@/components/ProposalButtons";
import { Submission } from "@prisma/client";

export default async function AdminProposalsPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const proposals = await prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Proposte dei Clienti</h1>
        <p className="text-gray-600 mt-1">Utenti che vogliono vendere la loro auto al tuo salone.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proposals.map((proposal: Submission) => (
          <div 
            key={proposal.id} 
            className={`bg-white rounded-xl shadow-sm border p-6 relative overflow-hidden transition-all flex flex-col ${
              !proposal.viewed ? "border-blue-200 ring-1 ring-blue-100" : "border-gray-100"
            }`}
          >
            {/* Indicatore Nuovo */}
            {!proposal.viewed && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                Nuova
              </div>
            )}

            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-full ${!proposal.viewed ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{proposal.carMake} {proposal.carModel}</h3>
                <p className="text-sm text-gray-500">
                  {proposal.carYear} • {proposal.carKms.toLocaleString("it-IT")} km
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                <p><strong>Cliente:</strong> {proposal.name}</p>
                <p><strong>Email:</strong> <a href={`mailto:${proposal.email}`} className="text-blue-600 hover:underline">{proposal.email}</a></p>
                {proposal.phone && <p><strong>Telefono:</strong> {proposal.phone}</p>}
              </div>

              {proposal.message && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Messaggio</p>
                  <p className="text-sm text-gray-700 italic border-l-2 border-gray-200 pl-3">&quot;{proposal.message}&quot;</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
              <div className="flex items-center text-xs text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                {new Intl.DateTimeFormat('it-IT', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(proposal.createdAt))}
              </div>
              
              <div className="flex items-center gap-2">
                {!proposal.viewed && <MarkProposalReadButton id={proposal.id} />}
                <DeleteProposalButton id={proposal.id} />
              </div>
            </div>
          </div>
        ))}

        {proposals.length === 0 && (
          <div className="col-span-full bg-white rounded-xl border border-gray-100 p-12 text-center">
            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Nessuna proposta</h3>
            <p className="text-gray-500 mt-1">Non hai ancora ricevuto richieste di vendita dai clienti.</p>
          </div>
        )}
      </div>
    </div>
  );
}
