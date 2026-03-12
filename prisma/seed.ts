import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
import { prisma } from '../src/lib/prisma';
import { hash } from 'bcryptjs';

async function main() {
  // Admin user
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
  console.log({ user });

  // Example Cars with real Unsplash images
  const carsData = [
    {
      make: 'Audi',
      model: 'R8',
      year: 2022,
      price: 150000,
      category: 'auto',
      trim: 'V10 Performance',
      engineSize: 5200,
      fuelType: 'benzina',
      color: 'Grigio',
      kms: 8000,
      description: 'Audi R8 V10 Performance in condizioni impeccabili. Potenza pura con un tocco di eleganza tedesca.',
      images: [
        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800',
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
      ]
    },
    {
      make: 'Mercedes-Benz',
      model: 'AMG GT',
      year: 2023,
      price: 160000,
      category: 'auto',
      trim: '63 S E Performance',
      engineSize: 4000,
      fuelType: 'ibrido',
      color: 'Nero',
      kms: 3500,
      description: 'La sportiva di riferimento di Mercedes AMG. Performance ibrida per un futuro emozionante.',
      images: [
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
        'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
      ]
    },
    {
      make: 'BMW',
      model: 'M4 Competition',
      year: 2023,
      price: 95000,
      category: 'auto',
      trim: 'Competition xDrive',
      engineSize: 3000,
      fuelType: 'benzina',
      color: 'Blu',
      kms: 12000,
      description: 'BMW M4 Competition xDrive: l\'equilibrio perfetto tra comfort quotidiano e prestazioni da pista.',
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
        'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800',
      ]
    },
    {
      make: 'Porsche',
      model: '911 Turbo S',
      year: 2023,
      price: 220000,
      category: 'auto',
      trim: 'Turbo S Cabriolet',
      engineSize: 3745,
      fuelType: 'benzina',
      color: 'Rosso',
      kms: 5200,
      description: 'La Porsche 911 Turbo S rappresenta il punto più alto dell\'ingegneria automobilistica. Iconica e senza rivali.',
      images: [
        'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      ]
    },
    {
      make: 'Lamborghini',
      model: 'Huracán',
      year: 2022,
      price: 245000,
      category: 'auto',
      trim: 'EVO Spyder',
      engineSize: 5204,
      fuelType: 'benzina',
      color: 'Giallo',
      kms: 9800,
      description: 'Lamborghini Huracán EVO Spyder: emozioni a cielo aperto. V10 aspirato da 640 CV senza filtri.',
      images: [
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
        'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800',
      ]
    },
  ];

  for (const c of carsData) {
    const car = await prisma.car.create({
      data: {
        make: c.make,
        model: c.model,
        year: c.year,
        price: c.price,
        category: c.category,
        trim: c.trim,
        engineSize: c.engineSize,
        fuelType: c.fuelType,
        color: c.color,
        kms: c.kms,
        description: c.description,
        images: {
          create: c.images.map(url => ({ url }))
        }
      }
    });
    console.log(`✅ Created car: ${car.make} ${car.model}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
