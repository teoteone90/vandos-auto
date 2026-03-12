import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function GET() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  try {
    const password = await hash('password123', 12);
    const user = await prisma.user.upsert({
      where: { email: 'admin@vandos.com' },
      update: {},
      create: {
        email: 'admin@vandos.com',
        name: 'Admin',
        password,
      },
    });
    return NextResponse.json({ message: 'Seed successful', user });
  } catch (error) {
    return NextResponse.json({ message: 'Seed failed', error }, { status: 500 });
  }
}
