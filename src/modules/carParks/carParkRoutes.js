const express = require('express');
const router = express.Router();
const carParkController = require('./carParkController');

router.get('/carparks', carParkController.getAllCarParks);
router.post('/carparks', carParkController.createCarPark);
router.get('/carparks/:id', carParkController.getCarParkById);
router.put('/carparks/:id', carParkController.updateCarPark);
router.delete('/carparks/:id', carParkController.deleteCarPark);

module.exports = router;