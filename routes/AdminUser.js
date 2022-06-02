const express= require('express');
const pool = require('../databases/database');
const router = express.Router();

//get a specified user
router.get('/:id',async function(req,res){
    try {
        const sqlQuery= 'SELECT name,email,password,designation,role FROM admin_user WHERE id=?';
        const row= await pool.query(sqlQuery,req.params.id);

        res.status(200).json(row);

    } catch (error) {
        res.status(400).send(error.message);
    }
})

//get all
router.get('/',async function(req,res){
    try {
        const sqlQuery = 'SELECT * FROM admin_user';
        const rows=await pool.query(sqlQuery,res.body);

        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


//create a new admin user
router.post('/create',async function(req,res){
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password=req.body.password;
        const designation=req.body.designation;
        const role=req.body.role;

        const sqlQuery='INSERT INTO admin_user (name,email,password,designation,role) VALUES (?,?,?,?,?)';
        const row=await pool.query(sqlQuery,[name,email,password,designation,role]);

        res.status(200).send({message:'user added'});
    } catch (error) {
        res.status(400).send(error.message);
    }
})

//delete a specific user
router.delete('/delete/:id',async function(req,res){
    try {
        const sqlQuery='DELETE FROM admin_user WHERE id=?';
        const row=await pool.query(sqlQuery,req.params.id);

        res.status(200).send({message:'Data Deleted'});
    } catch (error){
        res.status(400).send(error.message);
    }
})

//delete all users
router.delete('/',async function(req,res){
    try {
        const sqlQuery='DELETE FROM admin_user';
        const row=await pool.query(sqlQuery);

        res.status(200).send({message:'Data Deleted'});
    } catch (error){
        res.status(400).send(error.message);
    }
})


// update a specific user
module.exports=router;