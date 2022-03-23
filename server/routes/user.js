// const { request, response } = require('express')
const { request, response } = require('express')
const express =require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignupModules')

//New user update
router.post('/signup',(request,response) => {
    const signedUpUser = new signUpTemplateCopy({
        VehicleOwner:request.body.VehicleOwner,
        VehicleModel:request.body.VehicleModel,
        VehicleNumber:request.body.VehicleNumber,
        Type:request.body.Type,
        Seats:request.body.Seats,
        ID:request.body.ID,
        MNumber:request.body.MNumber,
        email:request.body.email,
        password:request.body.password,
        Date:request.body.Date
    })

    signedUpUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})
//Get all user Deatils
router.get('/signup',(req, res) => {
    // signUpTemplateCopy.find
    if(req.query.id){
        const id = req.query.id;

        signUpTemplateCopy.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        signUpTemplateCopy.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
})

//Update User
router.put('/signup/:id',(req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    signUpTemplateCopy.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : Cannot Update user with ${id}. Maybe user not found!})
            }else{
                // res.send(data)
                res.send({
                    message : "User was updated successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
})

//Delete User
router.delete('/signup/:id',(req,res) => {
    const id = req.params.id;

    signUpTemplateCopy.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : Cannot Delete with id ${id}. Maybe id is wrong})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });    
})
// router.get('/signup')

module.exports = router