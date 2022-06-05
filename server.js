const express=require('express');
const dotenv = require('dotenv').config({path:'.env'});
const cors= require('cors');

//defining port
const PORT=process.env.PORT || '8000';

//middleware
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
const AdminUserRouter = require('./routes/AdminUser');
app.use('/adminuser',AdminUserRouter);



//listening to port 
app.listen(PORT,()=>{
    console.log(`App is running on Port : ${PORT}`);
})

