import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

// DELETE: Elimina un'auto (Solo Admin)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.car.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Auto eliminata con successo" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Errore durante l'eliminazione dell'auto" },
      { status: 500 }
    );
  }
}

// PUT: Modifica un'auto (Solo Admin)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    const { images, ...carData } = data;

    const updatedCar = await prisma.car.update({
      where: { id },
      data: {
        ...carData,
        images: {
          deleteMany: {},
          create: images?.map((url: string) => ({ url })) || [],
        },
      },
      include: { images: true },
    });

    return NextResponse.json(updatedCar);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Errore durante la modifica dell'auto" },
      { status: 500 }
    );
  }
}
