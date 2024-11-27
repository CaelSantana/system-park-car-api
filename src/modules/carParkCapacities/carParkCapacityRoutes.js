const express = require('express');
const router = express.Router();
const carParkCapacityController = require('./carParkCapacityController');

router.get('/capacities', carParkCapacityController.getAllCapacities);
router.post('/capacities', carParkCapacityController.createCapacity);
router.get('/capacities/:id', carParkCapacityController.getCapacityById);
router.get('/capacities/vehicle-type/:car_parks_id', carParkCapacityController.getCapacitiesByVehicleType);
router.put('/capacities/:id', carParkCapacityController.updateCapacity);
router.delete('/capacities/vehicle-type/:vehicles_type_id', carParkCapacityController.deleteCapacityByVehicleType);

module.exports = router;
