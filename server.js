const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const bodyparser = require('body-parser');
// const mariadb = require('mariadb');

// const pool = mariadb.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'pradeep15',
//     database: 'rsAdmin'
// })

// async function main(){
//     try{
//         let conn = pool.getConnection(console.log('Database Connected'));
//     } catch(err) {
//         console.log('Database Conncetion Error');
//     }
// }
// main();


dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log Requests
app.use(morgan('tiny'));

//parse request to body parser
app.use(bodyparser.urlencoded({extended: true}));

app.get('/',(req,res) => {
    res.send("rs-admin-api");
})

const adminRouter = require('./server/routes/admin');
app.use(express.json());
app.use('/admin',adminRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})