const controller = require('../controllers/subscription.controller');
const subrouter= require("express").Router();
const multer=require('multer');
const path = require('path');

//Image upload
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'Images')
    },
    filename : (req,file,cb)=>{
        console.log(file);
        return cb(null, Date.now()+ path.extname(file.originalname));
    }
})

 
const upload = multer({
    storage :storage
})


subrouter.get('/',controller.getAllSub);
subrouter.get('/:id',controller.getSubById);
subrouter.get('/susers/:id',controller.getSubUsers);
subrouter.get('/subsites/:id',controller.getSubSites);
subrouter.get('/ratings/:id',controller.getSubRatings);
//subrouter.get('/bin',controller.getAllSubBin);

subrouter.post('/create',upload.single('appLogo'),controller.createSub);
//subrouter.post('/restore',controller.restoreSub);

subrouter.put('/edit',upload.single('appLogo'),controller.updateSub);
subrouter.put('/delete',controller.deleteSubAll);
subrouter.put('/deleteid',controller.deleteSub);
subrouter.put('/freezeid',controller.freezeSub);
subrouter.put('/deletesite',controller.deleteSite);
//subrouter.delete('/',controller.deleteAll);
//subrouter.delete('/:id',controller.deleteOne);

module.exports = subrouter;