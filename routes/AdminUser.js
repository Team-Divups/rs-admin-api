const express= require('express');
const pool = require('../databases/database');
const router = express.Router();

//get a specified user
router.get('/:id',async function(req,res){
    try {
        const sqlQuery= 'SELECT name,email,password,designation,role FROM admin_user';
        const row= await pool.query(sqlQuery,req.params.id);

        res.status(200).json(row);

    } catch (error) {
        res.status(400).send(error.message);
    }
})
module.exports=router;