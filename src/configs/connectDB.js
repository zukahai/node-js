import mysql from 'mysql2';

// // create the connection to database

console.log("Creating connection pool...");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodejs',
    // password: 'password'
})

connection.query(
    'SELECT * FROM users',
    function (err, result, fields) {
        console.log('Check mysql connection succeeded');
        // console.log(result);
        // console.log(fields);
    }
)


export default connection;