// controllers/vehicleController.js

// Sample controller functions

exports.getAllVehicles = (req, res) => {
  // For now, sending dummy data
  res.json([
    { id: 1, name: 'Car' },
    { id: 2, name: 'Bike' }
  ]);
};

exports.getVehicleById = (req, res) => {
  const vehicleId = req.params.id;
  res.json({ id: vehicleId, name: 'Sample Vehicle' });
};
