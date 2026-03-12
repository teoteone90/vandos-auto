import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      carMake,
      carModel,
      carYear,
      carKms,
      message,
      images,
    } = body;

    if (!name || !email || !carMake || !carModel || !carYear || carKms === undefined) {
      return NextResponse.json({ error: "Compila tutti i campi obbligatori" }, { status: 400 });
    }

    const submission = await prisma.submission.create({
      data: {
        name,
        email,
        phone,
        carMake,
        carModel,
        carYear,
        carKms,
        message,
        images: images && images.length > 0 ? {
          create: images.map((url: string) => ({ url }))
        } : undefined,
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("Errore creazione proposta:", error);
    return NextResponse.json(
      { error: "Si è verificato un errore durante l'invio della proposta" },
      { status: 500 }
    );
  }
}
