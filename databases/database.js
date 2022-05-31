const mariadb=require('mariadb');

// pool to define connection details
const pool= mariadb.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
})

//connecting and checking for errors
pool.getConnection((err,connection) =>{
    if(err){
        if(err.code==='PROTOCOL_CONNECTION_LOST')
           console.error('Database Connection Lost');
        if(err.code==='ER_CON_COUNT_ERROR')
           console.error('Database has too many connections');
        if(err.code==='ECONNREFUSED')
           console.error('Database connection got refused');
    }

    if(connection) 
        connection.release();

    return;
})

module.exports=pool;