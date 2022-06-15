const express= require('express');
const pool = require('../databases/database');
const Subscriptionrouter = express.Router();



//get a specified subscription
Subscriptionrouter.get('/:id',async function(req,res){
    try {
        const sqlQuery= 'SELECT subid,name,subcategory,mode,owner,location,date FROM subscription WHERE id=?';
        const row= await pool.query(sqlQuery,req.params.id);

        res.status(200).json(row);

    } catch (error) {
        res.status(400).send(error.message);
    }
})


//get all
Subscriptionrouter.get('/',async function(req,res){
    try {
        const sqlQuery = 'SELECT * FROM subscription';
        const rows=await pool.query(sqlQuery,res.body);

        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
})



//create a new subscription
Subscriptionrouter.post('/create',async function(req,res){
    try {
        const subid = req.body.subid;
        const name = req.body.name;
        const subcategory=req.body.subcategory;
        const mode=req.body.mode;
        const owner=req.body.owner;
        const location=req.body.location;
                
        const sqlQuery='INSERT INTO subscription (subid,name,subcategory,mode,owner,location) VALUES (?,?,?,?,?,?)';
        const row= await pool.query(sqlQuery,[subid,name,subcategory,mode,owner,location]);
        
        res.status(200).send({message:'subscription added'})
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})



//delete a specific user
Subscriptionrouter.delete('/:id',async function(req,res){
    try {
        const sqlQuery='DELETE FROM subscription WHERE id=?';
        const row=await pool.query(sqlQuery,req.params.id);
        
        res.status(200).send({message:'Data Deleted'});
    } catch (error){
        res.status(400).send(error.message);
    }
})



//delete all users
Subscriptionrouter.delete('/',async function(req,res){
    try {
        const sqlQuery='DELETE FROM subscription';
        const row=await pool.query(sqlQuery);

        res.status(200).send({message:'Data Deleted'});
    } catch (error){
        res.status(400).send(error.message);
    }
})


// update a specific user
Subscriptionrouter.put('/edit',async function(req,res){
    try {
        const id=req.body.id;
        const name = req.body.name;
        const subcategory=req.body.subcategory;
        const mode=req.body.mode;
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