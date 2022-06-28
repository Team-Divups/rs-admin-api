const express= require('express');
const pool = require('../databases/database');
const Adminrouter = express.Router();
const yup =require('yup');

AdminSchema =  yup.object().shape({
    name: yup.string().required("UserName is required").min(3).max(20),
    email: yup.string().email().required(),
    organization: yup.string().required(),
    designation: yup.string().required(),
    role: yup.string().required(),
    comments : yup.string(),
    status: yup.string(),
});

//get a specified user
Adminrouter.get('/:id',(req,res)=>{
    const sqlQuery = 'SELECT * FROM user WHERE id=?';
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
Adminrouter.get('/',(req,res)=>{
    const sqlQuery = 'SELECT * FROM user';
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



//create a new admin user
Adminrouter.post('/create',(req,res)=>{
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password=req.body.password;
        const companyID=req.body.companyID;
        const position=req.body.position;
        const role=req.body.role;
        const comments = req.body.comments;
        //const status=req.body.status;
        //const userImg=req.file;
                
        const sqlQuery='INSERT INTO user (firstName,lastName,email,password,companyID,position,role,comments) VALUES (?,?,?,?,?,?,?,?)';
        const row=pool.query(sqlQuery,[firstName,lastName,email,password,companyID,position,role,comments]);
        
        res.status(200).send({message:'user added'})
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})



//delete a specific user
Adminrouter.delete('/delete/:id',(req,res)=>{
    try {
        const sqlQuery='DELETE FROM user WHERE id=?';
        const row= pool.query(sqlQuery,req.params.id);

        res.status(200).send({message:'Data Deleted'});
    } catch (error){
        console.log(error);
        res.status(400).send(error.message);
    }
})



//delete all users
Adminrouter.delete('/',(req,res)=>{
    try {
        const sqlQuery='DELETE FROM user';
        const row= pool.query(sqlQuery);

        res.status(200).send({message:'Data Deleted'});
    } catch (error){
        res.status(400).send(error.message);
    }
})


// update a specific user by admin
Adminrouter.put('/edit',(req,res)=>{
    try {

        const id=req.body.id;
        const role=req.body.role;
        const status = req.body.status;
       
        const sqlQuery='UPDATE user SET role=?,status=? WHERE id=?';
        const row=pool.query(sqlQuery,[role,status,id]);

        res.status(200).send({message:'user updated'});
       
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }
})

//user updating his details
Adminrouter.put('/profileedit',(req,res)=>{
    try {

        const id=req.body.id;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password=req.body.password;
        const companyID=req.body.companyID;
        const position=req.body.position;
       
       
        const sqlQuery='UPDATE user SET firstName=?,lastName=?,email=?,password=?,companyId=?,position=? WHERE id=?';
        const row=pool.query(sqlQuery,[firstName,lastName,email,password,companyID,position,id]);

        res.status(200).send({message:'profile details updated'});
       
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }
})





module.exports=Adminrouter;