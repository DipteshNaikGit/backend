const prisma = require('../prisma/client');

const createBooking = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      startDate,
      endDate,
      vehicle,
    } = req.body;

    if (!vehicle?.id || !startDate || !endDate || !firstName || !lastName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end) || start > end) {
      return res.status(400).json({ message: 'Invalid date range' });
    }

    // Conflict check
    const existingBooking = await prisma.booking.findFirst({
      where: {
        vehicleId: vehicle.id,
        AND: [
          { startDate: { lte: end } },
          { endDate: { gte: start } },
        ],
      },
      include: {
        vehicle: true,
      },
    });

   if (existingBooking) {
  const formattedStart = new Date(existingBooking.startDate).toISOString().split('T')[0];
  const formattedEnd = new Date(existingBooking.endDate).toISOString().split('T')[0];

  return res.status(409).json({
    message: `Vehicle "${existingBooking.vehicle.name}" is already booked from ${formattedStart} to ${formattedEnd}`,
  });
}

    // Create booking
    const newBooking = await prisma.booking.create({
      data: {
        userName: `${firstName} ${lastName}`,
        vehicleId: vehicle.id,
        startDate: start,
        endDate: end,
      },
    });

    return res.status(200).json({
      message: 'Booking successful',
      booking: newBooking,
    });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { createBooking };
