const express= require('express');
const pool = require('../databases/database');
const Rolerouter = express.Router();

//get a specified role
Rolerouter.get('/:id',(req,res)=>{
    const sqlQuery = 'SELECT * FROM role WHERE id=?';
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
Rolerouter.get('/',(req,res)=>{
    const sqlQuery = 'SELECT * FROM role';
        pool.query(sqlQuery,(err,rows,fields)=>{
            if(!err)
            {
                //console.log(rows);
                res.status(200).json(rows);
            }
            else{
                console.log(err);
                res.status(400).send(err.message);
            }
        })
})


//delete all 
Rolerouter.delete('/',(req,res)=>{
    try {
        const sqlQuery='DELETE FROM role';
        const row=pool.query(sqlQuery);

        res.status(200).send({message:'Data Deleted'});
    } catch (error){
        res.status(400).send(error.message);
    }
})



module.exports=Rolerouter;