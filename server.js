const express=require('express');
const dotenv = require('dotenv');

//use .env file
dotenv.config({path:'env'});

const PORT = process.env.PORT||'3001';

//middleware
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//listening to port 
app.listen(PORT,()=>{
    console.log("App is running on Port : ${PORT}");
})

