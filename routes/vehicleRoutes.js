// routes/vehicleRoutes.js

const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Define routes and map to controller functions
router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);

module.exports = router;
