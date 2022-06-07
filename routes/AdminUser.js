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
Adminrouter.get('/:id',async function(req,res){
    try {
        const sqlQuery= 'SELECT name,email,organization,designation,role,status FROM admin_user WHERE id=?';
        const row= await pool.query(sqlQuery,req.params.id);

        res.status(200).json(row);

    } catch (error) {
        res.status(400).send(error.message);
    }
})


//get all
Adminrouter.get('/',async function(req,res){
    try {
        const sqlQuery = 'SELECT * FROM admin_user';
        const rows=await pool.query(sqlQuery,res.body);

        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
})



//create a new admin user
Adminrouter.post('/create',async function(req,res){
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password=req.body.password;
        const organization=req.body.organization;
        const designation=req.body.designation;
        const role=req.body.role;
        const comments=req.body.comments;
        const status=req.body.status;
                
        const sqlQuery='INSERT INTO admin_user (name,email,password,organization,designation,role,comments,status) VALUES (?,?,?,?,?,?,?,?)';
        const row= await pool.query(sqlQuery,[name,email,password,organization,designation,role,comments,status]);
        
        res.status(200).send({message:'user added'})
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})



//delete a specific user
Adminrouter.delete('/delete/:id',async function(req,res){
    try {
        const sqlQuery='DELETE FROM admin_user WHERE id=?';
        const row=await pool.query(sqlQuery,req.params.id);

        res.status(200).send({message:'Data Deleted'});
    } catch (error){
        res.status(400).send(error.message);
    }
})



//delete all users
Adminrouter.delete('/',async function(req,res){
    try {
        const sqlQuery='DELETE FROM admin_user';
        const row=await pool.query(sqlQuery);

        res.status(200).send({message:'Data Deleted'});
    } catch (error){
        res.status(400).send(error.message);
    }
})


// update a specific user
Adminrouter.put('/edit',async function(req,res){
    try {
        const id=req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const organization=req.body.organization;
        const designation=req.body.designation;
        const role=req.body.role;
        const status = req.body.status;

        AdminSchema.validate(
            {
                name,
                email,
                organization,
                designation,
                role,
                status
            }
        ).catch((error)=>{
            console.log(error);
            res.status(422).send({messsage:"Validation errors"});
        }).then((valid)=>{
            if(valid){
                console.log("Data validated");
                const sqlQuery='UPDATE admin_user SET name=?, email=?,organization=?,designation=?, role=?,status=? WHERE id=?';
                const row=pool.query(sqlQuery,[name,email,organization,designation,role,status,id]);

                res.status(200).send({message:'user added'});
            }
        })
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }
})


//update name of user
Adminrouter.put('/editname',async function(req,res){
    try {
        const id=req.body.id;
        const name = req.body.name;

        const sqlQuery='UPDATE admin_user SET name=? WHERE id=?';
        const row=await pool.query(sqlQuery,[name,id]);

        res.status(200).send({message:'user name updated'});
        
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }
})



//invite a user
Adminrouter.post('/invite',async function(req,res){
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password=req.body.password;
        const organization=req.body.organization;
        const designation=req.body.designation;
        const role=req.body.role;
        const comments = req.body.comments;
        const status = req.body.status;

        
        const sqlQuery='INSERT INTO admin_user (name,email,password,organization,designation,role,comments,status) VALUES (?,?,?,?,?,?,?,?)';
        const row=await pool.query(sqlQuery,[name,email,password,organization,designation,role,comments,status]);

        res.status(200).send({message:'user invited'});
    } catch (error) {
        res.status(400).send(error.message);
    }
})



module.exports=Adminrouter;