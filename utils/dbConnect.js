const mysql = require('mysql2/promise');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'authentication', 
    password: process.env.DB_PASSWORD
  })

  module.exports = db