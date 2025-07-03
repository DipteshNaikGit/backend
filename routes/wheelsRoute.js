
const express = require('express');
const router = express.Router();
const { getAllWheels } = require('../controllers/wheelsController');

router.get('/', getAllWheels);

module.exports = router;
