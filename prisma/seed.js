const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding data...');

  // Step 1: Insert Wheels
  const wheels2 = await prisma.wheels.create({
    data: {
      id: uuidv4(),
      count: 2
    }
  });

  const wheels4 = await prisma.wheels.create({
    data: {
      id: uuidv4(),
      count: 4
    }
  });

  // Step 2: Insert Vehicle Types (No car Cruiser here)
  const vehicleTypes = await prisma.vehicleType.createMany({
    data: [
      { id: uuidv4(), type: 'Hatchback', wheelsId: wheels4.id },
      { id: uuidv4(), type: 'SUV', wheelsId: wheels4.id },
      { id: uuidv4(), type: 'Sedan', wheelsId: wheels4.id },
      { id: uuidv4(), type: 'Cruiser', wheelsId: wheels2.id }, // Only bike Cruiser
      { id: uuidv4(), type: 'Sports', wheelsId: wheels2.id }
    ]
  });

  // Fetch vehicle types
  const types = await prisma.vehicleType.findMany();

  const getTypeId = (type, wheelCount) =>
    types.find(t => t.type === type && t.wheelsId === (wheelCount === 2 ? wheels2.id : wheels4.id))?.id;

  // Step 3: Insert Vehicles
  await prisma.vehicle.createMany({
    data: [
      { id: uuidv4(), name: 'Maruti Alto', vehicleTypeId: getTypeId('Hatchback', 4) },
      { id: uuidv4(), name: 'Hyundai Creta', vehicleTypeId: getTypeId('SUV', 4) },
      { id: uuidv4(), name: 'Honda City', vehicleTypeId: getTypeId('Sedan', 4) },
      { id: uuidv4(), name: 'Royal Enfield', vehicleTypeId: getTypeId('Cruiser', 2) },
      { id: uuidv4(), name: 'Yamaha R15', vehicleTypeId: getTypeId('Sports', 2) }
    ]
  });

  console.log('✅ Seed completed.');
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
