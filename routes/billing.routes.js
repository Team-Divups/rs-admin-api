const controller = require('../controllers/billing.controller');
const billingrouter= require("express").Router();

billingrouter.get("/:id",controller.getbillingById);

billingrouter.post('/create',controller.CreateBilling);

module.exports = billingrouter;