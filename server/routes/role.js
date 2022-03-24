const express = require('express');
const router = express.Router();
const pool = require('../database/database');


//GET all roles details
router.get('/', async function(req,res){
    try {
        const sqlQuery = 'SELECT roleId, roleName, desc FROM role';
        const rows = await pool.query(sqlQuery, res.body);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;