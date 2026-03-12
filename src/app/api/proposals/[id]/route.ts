import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updatedProposal = await prisma.submission.update({
      where: { id },
      data: {
        viewed: body.viewed,
      },
    });

    return NextResponse.json(updatedProposal);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Errore durante l'aggiornamento della proposta" },
      { status: 500 }
    );
  }
}

// Opzionale: Aggiunto DELETE per dare all'admin la possibilità di fare pulizia
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.submission.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Cancellato con successo" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Errore durante l'eliminazione" },
      { status: 500 }
    );
  }
}
