import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

// GET: Recupera tutte le auto
export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(cars);
  } catch (error) {
    return NextResponse.json({ error: "Errore nel recupero delle auto" }, { status: 500 });
  }
}

// POST: Aggiungi una nuova auto (Solo Admin)
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
    }

    const data = await req.json();
    
    // Validazione base
    if (!data.make || !data.model || !data.category || !data.fuelType) {
      return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 });
    }

    const newCar = await prisma.car.create({
      data: {
        make: data.make,
        model: data.model,
        category: data.category,
        trim: data.trim || "",
        engineSize: Number(data.engineSize),
        fuelType: data.fuelType,
        year: Number(data.year),
        price: Number(data.price),
        kms: data.kms ? Number(data.kms) : null,
        color: data.color || null,
        vin: data.vin || null,
        description: data.description || null,
        images: {
          create: data.images?.map((url: string) => ({ url })) || [],
        },
      },
      include: { images: true },
    });

    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Errore durante il salvataggio dell'auto" }, { status: 500 });
  }
}
