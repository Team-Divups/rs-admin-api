const express= require('express');
const pool = require('../databases/database');
const Subscriptionrouter = express.Router();
const multer = require('multer');
const path = require('path');

//image upload
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'Images')
    },
    filename : (req,file,cb)=>{
        console.log(file);
        cb(null,Date.now()+path.extname(file.originalname))
    }
})


const upload = multer({
    storage :storage,
    limits:{fileSize:'1000000'},
    fileFilter : (req,file,cb)=>{
        const fileTypes = /jpeg|jpg|png|gif/
        const mimType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimType && extname){
            return(cb,null,true);
        }
        cb('Give proper filtypes to upload')
    }
}).single('applogo')



//get a specified subscription
Subscriptionrouter.get('/:id',(req,res)=>{
   
    const sqlQuery = 'SELECT * FROM subscription WHERE id=?';
    pool.query(sqlQuery,req.params.id,(err,rows,fields)=>{
        if(!err)
        {
            console.log(rows);
            res.status(200).json(rows);
        }
        else{
            console.log(err);
            res.status(400).send(err.message);
        }
    })
})



//get all
Subscriptionrouter.get('/',(req,res)=>{

        const sqlQuery = 'SELECT * FROM subscription';
        pool.query(sqlQuery,(err,rows,fields)=>{
            if(!err)
            {
                console.log(rows);
                res.status(200).json(rows);
            }
            else{
                console.log(err);
                res.status(400).send(err.message);
            }
        })
})



//get all users of a specified subscription
Subscriptionrouter.get('/susers/:id',(req,res)=>{
   
    const sqlQuery = 'SELECT * FROM client_user WHERE idSub=?';
    pool.query(sqlQuery,req.params.id,(err,rows,fields)=>{
        if(!err)
        {
            console.log(rows);
            res.status(200).json(rows);
        }
        else{
            console.log(err);
            res.status(400).send(err.message);
        }
    })
})



//get all sites of a specified subscription
Subscriptionrouter.get('/subsites/:id',(req,res)=>{
   
    const sqlQuery = 'SELECT * FROM site WHERE idSubscription=?';
    pool.query(sqlQuery,req.params.id,(err,rows,fields)=>{
        if(!err)
        {
            console.log(rows);
            res.status(200).json(rows);
        }
        else{
            console.log(err);
            res.status(400).send(err.message);
        }
    })
})




//create a new subscription
Subscriptionrouter.post('/create', (req,res)=>{
    console.log('Hi');
    try {
       
        //const appLogo=req.file;
        //const subId = req.body.subId;
        const name = req.body.name;
        const type=req.body.type;
        const category=req.body.category;
        const location=req.body.location;
        const description = req.body.description;
        const owner=req.body.owner;
        const email = req.body.email;
        const contactNo = req.body.contactNo;
        const WebsiteURL = req.body.WebsiteURL;
        const LinkedIn = req.body.LinkedIn;
        const facebook = req.body.facebook;
        const Instagram = req.body.Instagram;

        const sqlQuery='INSERT INTO subscription (name,type,category,location,description,owner,email,contactNo,WebsiteURL,LinkedIn,facebook,Instagram) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        const row= pool.query(sqlQuery,[name,type,category,location,description,owner,email,contactNo,WebsiteURL,LinkedIn,facebook,Instagram]);
        
        console.log(row);
        res.status(200).send({message:'subscription added'})
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})


/*Subscriptionrouter.post('/create', function(req,res){
    try {
       
        //const appLogo=req.file;
        const subid = req.body.subid;
        const name = req.body.name;
        const subcategory=req.body.subcategory;
        const mode=req.body.mode;
        const owner=req.body.owner;
        const location=req.body.location;
       

        const sqlQuery='INSERT INTO subscription (subid,name,subcategory,mode,owner,location) VALUES (?,?,?,?,?,?)';
        const row= pool.query(sqlQuery,[subid,name,subcategory,mode,owner,location]);
        
        res.status(200).send({message:'subscription added'})
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})*/


Subscriptionrouter.post('/image',(req,res)=>{
    try{
        const applogo=req.file;
        
        console.log(applogo);

        const sqlQuery='INSERT INTO test (applogo) VALUES (?)';
        const row=pool.query(sqlQuery,[applogo]);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

//delete a specific user
Subscriptionrouter.delete('/:id',(req,res)=>{
    try {
        const sqlQuery='DELETE FROM subscription WHERE id=?';
        const row=pool.query(sqlQuery,req.params.id);
        
        res.status(200).send({message:'Data Deleted'});
    } catch (error){
        res.status(400).send(error.message);
    }
})



//delete all users
Subscriptionrouter.delete('/',(req,res)=>{
    try {
        const sqlQuery='DELETE FROM subscription';
        const row=pool.query(sqlQuery);

        res.status(200).send({message:'Data Deleted'});
    } catch (error){
        res.status(400).send(error.message);
    }
})


// update a specific user
Subscriptionrouter.put('/edit',(req,res)=>{
    try {
        //const subId = req.body.subId;
        const name = req.body.name;
        const category=req.body.category;
        const owner=req.body.owner;
        const location = req.body.location;
   
        const sqlQuery='UPDATE subscription SET name=?,subcategory=?,mode=?, owner=?,location=?  WHERE id=?';
        const row=pool.query(sqlQuery,[name,subcategory,mode,owner,location,id]);

        res.status(200).send({message:'subscription updated'});
 
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }
})




module.exports=Subscriptionrouter;