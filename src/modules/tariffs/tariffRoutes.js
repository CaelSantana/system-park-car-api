const express = require('express');
const router = express.Router();
const tariffController = require('./tariffController');

router.get('/tariffs', tariffController.getAllTariffs);
router.post('/tariffs', tariffController.createTariff);
router.get('/tariffs/:id', tariffController.getTariffById);
router.put('/tariffs/:id', tariffController.updateTariff);
router.delete('/tariffs/:id', tariffController.deleteTariff);

module.exports = router;