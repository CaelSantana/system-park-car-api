const express = require('express');
const router = express.Router();
const paymentController = require('./paymentController');

const authenticateToken = require('../../auth/authenticateToken');
const authorize = require('../../auth/authorize');

router.get('/payments', authenticateToken, authorize(['ROLE_USER', 'ROLE_EMPLOYEE', 'ROLE_MASTER']), paymentController.getAllPayments);
router.post('/payments', authenticateToken, authorize(['ROLE_MASTER', 'ROLE_EMPLOYEE']), paymentController.createPayment);
router.get('/payments/:id', authenticateToken, authorize(['ROLE_MASTER']), paymentController.getPaymentById);
router.put('/payments/:id', authenticateToken, authorize(['ROLE_MASTER']), paymentController.updatePayment);
router.delete('/payments/:id', authenticateToken, authorize(['ROLE_MASTER']), paymentController.deletePayment);

module.exports = router;
