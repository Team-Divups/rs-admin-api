const controller = require('../controllers/payment.controller');
const paymentrouter=require("express").Router();

paymentrouter.get('/:id',controller.getPaymentId);

paymentrouter.post('/create',controller.CreatePayment);

module.exports = paymentrouter;