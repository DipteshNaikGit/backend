const prisma = require('../prisma/client');

// GET /api/vehicle-types/:wheelsId
const getVehicleTypesByWheelId = async (req, res) => {
  const { wheelsId } = req.params;

  try {
    const vehicleTypes = await prisma.vehicleType.findMany({
      where: { wheelsId },
      select: {
        id: true,
        type: true,
      },
    });

    if (vehicleTypes.length === 0) {
      return res.status(404).json({ message: 'No vehicle types found for this wheels ID' });
    }

    res.json(vehicleTypes);
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getVehicleTypesByWheelId };
