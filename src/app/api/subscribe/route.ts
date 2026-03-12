import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email non valida" }, { status: 400 });
    }

    // Controlla se esiste già
    // @ts-ignore
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json({ error: "Sei già iscritto alla newsletter!" }, { status: 409 });
    }

    // Salva nel DB
    // @ts-ignore
    const subscriber = await prisma.subscriber.create({
      data: { email },
    });

    return NextResponse.json(subscriber, { status: 201 });
  } catch (error) {
    console.error("Errore iscrizione newsletter:", error);
    return NextResponse.json(
      { error: "Si è verificato un errore durante l'iscrizione" },
      { status: 500 }
    );
  }
}
