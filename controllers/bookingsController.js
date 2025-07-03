const bookings = []; // Replace this with a real database or persistent storage

const createBooking = (req, res) => {
  const { vehicle, startDate, endDate } = req.body;

  if (!vehicle?.id || !startDate || !endDate) {
    return res.status(400).json({ message: 'Missing vehicle ID, startDate, or endDate' });
  }

  const requestedStart = new Date(startDate);
  const requestedEnd = new Date(endDate);

  // Check if vehicle is already booked during this period
  const conflictingBooking = bookings.find((booking) => {
    return (
      booking.vehicle.id === vehicle.id &&
      new Date(booking.endDate) >= requestedStart &&
      new Date(booking.startDate) <= requestedEnd
    );
  });

if (conflictingBooking) {
  return res.status(409).json({
    message: `Vehicle "${conflictingBooking.vehicle.name}" is already booked from ${conflictingBooking.startDate} to ${conflictingBooking.endDate}`,
  });
}

  // If not booked, add new booking
  bookings.push({
    vehicle,
    startDate,
    endDate,
    user: req.body.firstName + ' ' + req.body.lastName, // Optional
  });

  res.status(200).json({ message: 'Booking successful' });
};

module.exports = { createBooking };
