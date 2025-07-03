const express = require('express');
const router = express.Router();
const { getVehicleTypesByWheelId } = require('../controllers/vehicleTypeController');

router.get('/:wheelsId', getVehicleTypesByWheelId);

module.exports = router;
