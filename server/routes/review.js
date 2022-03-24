const express = require('express');
const router = express.Router();
const pool = require('../database/database');
const bcrypt = require('bcrypt');

//GET all review details
router.get('/', async function(req,res){
    try {
        const sqlQuery = 'SELECT id, email, password, created_at FROM review';
        const rows = await pool.query(sqlQuery, res.body);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;