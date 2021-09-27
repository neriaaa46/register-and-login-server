const mysql = require('mysql2/promise');


const db = mysql.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database:  process.env.DB_NAME, 
    password: process.env.DB_PASSWORD
  })


  module.exports = db
