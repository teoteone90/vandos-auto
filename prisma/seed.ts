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

  // Example Cars
  const carsData = [
    {
      make: 'Audi',
      model: 'R8',
      year: 2022,
      price: 150000,
      image: '/images/audi-r8.jpg',
      category: 'CAR',
      trim: 'V10 Performance',
      engineSize: 5200,
      fuelType: 'PETROL'
    },
    {
      make: 'Mercedes-Benz',
      model: 'AMG GT',
      year: 2023,
      price: 160000,
      image: '/images/mercedes-amg-gt.jpg',
      category: 'CAR',
      trim: '63 S E Performance',
      engineSize: 4000,
      fuelType: 'HYBRID'
    },
    {
      make: 'BMW',
      model: 'M4',
      year: 2023,
      price: 95000,
      image: '/images/bmw-m4.jpg',
      category: 'CAR',
      trim: 'Competition xDrive',
      engineSize: 3000,
      fuelType: 'PETROL'
    },
    {
      make: 'Porsche',
      model: '911 Turbo S',
      year: 2023,
      price: 220000,
      image: '/images/porsche-911.jpg',
      category: 'CAR',
      trim: 'Turbo S',
      engineSize: 3745,
      fuelType: 'PETROL'
    }
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
        images: {
          create: {
            url: c.image
          }
        }
      }
    });
    console.log(`Created car: ${car.make} ${car.model}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
