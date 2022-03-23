const express = require('express');
const router = express.Router();
const pool = require('../database/database');
const bcrypt = require('bcrypt');

//GET all admin user details
router.get('/', async function(req,res){
    try {
        const sqlQuery = 'SELECT id, email, password, created_at FROM user';
        const rows = await pool.query(sqlQuery, res.body);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//Get Admin Data
router.get('/:id', async function(req,res){
    try {
        const sqlQuery = 'SELECT id, email, password, created_at FROM user WHERE id=?';
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


//Register New Admin
router.post('/register', async function(req,res) {
    try {
        const {email, password} = req.body;
        
        const encryptedPassword = await bcrypt.hash(password,10)

        const sqlQuery = 'INSERT INTO user (email, password) VALUES (?,?)';
        const result = await pool.query(sqlQuery, [email, encryptedPassword]);

        // res.status(200).json({userId: result.insertId});
        res.status(200).send({ message: "User Data Added "})


    } catch (error) {
        res.status(400).send(error.message)
    }
})


//Login Admin
router.post('/login', async function(req,res) {
    try {
        const {id,password} = req.body;

        const sqlGetUser = 'SELECT password FROM user WHERE id=?';
        const rows = await pool.query(sqlGetUser,id);
        if(rows){
            
            const isValid = await bcrypt.compare(password,rows[0].password)
            res.status(200).json({valid_password: isValid});
        }
        else{
        // res.status(200).send(`User with id ${id} was not found`);
        res.status(200).send({ message: "user data not found"});
        }
        
    } catch (error) {
        res.status(400).send(error.message)
    }
});

//Delete Admin
router.delete('/:id', async function(req,res){
    try {
            const sqlQuery = 'DELETE FROM user WHERE id=?';
            const rows = await pool.query(sqlQuery, req.params.id);
            res.status(200).send({message: "User Deleted"});

    } catch (error) {
        res.status(400).send(error.message);
    }
});

//Update Admin
router.put('/:id', async function(req,res){
    try {
            const sqlQuery = 'DELETE FROM user WHERE id=?';
            const rows = await pool.query(sqlQuery, req.params.id);
            res.status(200).send({message: "User Deleted"});

    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;