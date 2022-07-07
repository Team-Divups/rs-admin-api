const controller=require('../controllers/bin.controllers');
const binrouter=require("express").Router();

binrouter.get('/',controller.getAllSubBin);
binrouter.get('/lastSub',controller.getLastSubscription);

binrouter.put('/restore',controller.restoreSubscription);
binrouter.put('/fulldelete',controller.DeleteSubscription);

module.exports=binrouter;