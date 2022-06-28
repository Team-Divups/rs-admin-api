//const mariadb=require('mariadb');
const mysql = require('mysql2')

// pool to define connection details
const pool= mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    port:process.env.DB_PORT,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
})

//connecting and checking for errors
pool.connect((err) =>{
    if(err){
        if(err.code==='PROTOCOL_CONNECTION_LOST')
           console.error('Database Connection Lost');
        if(err.code==='ER_CON_COUNT_ERROR')
           console.error('Database has too many connections');
        if(err.code==='ECONNREFUSED')
           console.error('Database connection got refused');

        console.log('DB connection failed in error :' + JSON.stringify(err,undefined,2));
    }else
        console.log('DB connection succedded');
})

module.exports=pool;