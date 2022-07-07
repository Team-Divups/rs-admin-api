const controller = require('../controllers/notification.controller');
const notifyrouter= require("express").Router();

notifyrouter.get('/',controller.getAllNotification);
notifyrouter.get('/:id',controller.getNotification);

module.exports = notifyrouter;