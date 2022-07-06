const express=require('express');
const dotenv = require('dotenv').config({path:'.env'});
const cors= require('cors');

const subrouter = require('./routes/subscription.routes');
const binrouter = require('./routes/bin.routes');


//defining port
const PORT=process.env.PORT || '8000';

//middleware
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



/*routes
const AdminUserRouter = require('./routes/AdminUser');
app.use('/user',AdminUserRouter);

const SubscriptionRouter = require('./routes/Subscription');
app.use('/subscription',SubscriptionRouter);

const Rolerouter=require('./routes/Role');
app.use('/role',Rolerouter);*/

app.use('/Images',express.static('./Images'))

app.use('/subscription',subrouter);
app.use('/bin',binrouter);

//listening to port 
app.listen(PORT,()=>{
    console.log(`App is running on Port : ${PORT}`);
})

