const express = require('express');
const router = express.Router();
const vehicleController = require('./vehicleController');

router.post('/vehicles', vehicleController.createVehicle);
router.get('/vehicles', vehicleController.getAllVehicles);
router.get('/vehicles/:plate', vehicleController.getVehicleByPlate);
router.get('/vehicles/user/:userId', vehicleController.getVehiclesByUserId);
router.put('/vehicles/:plate', vehicleController.updateVehicle);
router.delete('/vehicles/:plate', vehicleController.deleteVehicle);

module.exports = router;