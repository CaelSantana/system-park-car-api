const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.get('/users/email/:email', userController.getUserByEmail);
router.get('/users/cpf/:cpf', userController.getUserByCPF);
router.put('/users/:id', userController.updateUser);
router.put('/users/:id', userController.updateUserPassword);
router.delete('/users/:id', userController.deleteUser);

router.post('/users/:id/address', userController.createAddressForUser);
router.get('/users/:id/address', userController.getAddressByUserId);
router.put('/users/:id/address', userController.updateAddressForUser);
router.delete('/users/:id/address', userController.deleteAddressForUser);

router.get('/users/:id/vehicle', userController.getAddressByUserId);
router.post('/users/:id/vehicle', userController.createVehicleForUser);
router.put('/users/:id/vehicle', userController.updateVehicleForUser);
router.delete('/users/:id/vehicle', userController.deleteVehicleForUser);

module.exports = router;
