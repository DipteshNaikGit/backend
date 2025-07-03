const express = require('express');
const router = express.Router();
const { getVehiclesByType } = require('../controllers/vehicleController');

// GET /api/vehicles/:vehicleTypeId
router.get('/:vehicleTypeId', getVehiclesByType);

module.exports = router;
