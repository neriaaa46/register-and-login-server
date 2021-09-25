const mysql = require('mysql2/promise');


const db = mysql.createConnection({
    host: 'eu-cdbr-west-01.cleardb.com',
    user: 'ba93bc4c8b74eb',
    database: 'heroku_8f772d7e14d0609', 
    password: 'cac7167c'
  })

  module.exports = db


