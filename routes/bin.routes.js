const controller=require('../controllers/bin.controllers');
const binrouter=require("express").Router();

binrouter.get('/',controller.getAllSubBin);

binrouter.put('/restore',controller.restoreSubscription);

module.exports=binrouter;