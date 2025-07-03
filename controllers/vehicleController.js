const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getVehiclesByType = async (req, res) => {
  const { vehicleTypeId } = req.params;

  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        vehicleTypeId: vehicleTypeId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};

module.exports = {
  getVehiclesByType,
};
