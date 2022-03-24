const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const bodyparser = require('body-parser');


dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log Requests
app.use(morgan('tiny'));

//parse request to body parser
app.use(bodyparser.urlencoded({extended: true}));

app.get('/',(req,res) => {
    res.send("rs-admin-api");
})

app.use(express.json());
const adminRouter = require('./server/routes/admin');
app.use('/admin',adminRouter);

const roleRouter = require('./server/routes/role');
app.use('/role',roleRouter);

const subscriptionRouter = require('./server/routes/subscription');
app.use('/subscription',subscriptionRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})