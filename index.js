
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const wheelsRoute = require('./routes/wheelsRoute');
const vehicleTypeRoute = require('./routes/vehicleTypeRoute');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingsRoute = require('./routes/bookingsRoute');
app.use('/api/wheels', wheelsRoute);
app.use('/api/vehicle-types', vehicleTypeRoute);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingsRoute);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
