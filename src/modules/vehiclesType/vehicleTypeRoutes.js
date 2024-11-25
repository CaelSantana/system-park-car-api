const express = require('express');
const router = express.Router();
const vehiclesTypeController = require('./vehicleTypeController');

router.get('/vehicles-types', vehiclesTypeController.getAllVehiclesTypes);
router.post('/vehicles-types', vehiclesTypeController.createVehiclesType);
router.get('/vehicles-types/:id', vehiclesTypeController.getVehiclesTypeById);
router.put('/vehicles-types/:id', vehiclesTypeController.updateVehiclesType);
router.delete('/vehicles-types/:id', vehiclesTypeController.deleteVehiclesType);

module.exports = router;
