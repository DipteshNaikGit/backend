const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const vehicleRoutes = require('./routes/vehicleRoutes');

// Middleware to parse JSON
app.use(express.json());

// Use the vehicle routes for /api/vehicles
app.use('/api/vehicles', vehicleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
