const mysql = require('mysql2/promise');


const db = mysql.createPool({
    connectionLimit: 10,
    host: "eu-cdbr-west-01.cleardb.com",
    user: "ba93bc4c8b74eb", 
    password: "cac7167c",
    database: "heroku_8f772d7e14d0609", 
  })


  module.exports = db
