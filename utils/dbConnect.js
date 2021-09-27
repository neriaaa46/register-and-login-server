const mysql = require('mysql2/promise');


const db = mysql.createConnection({
    host: 'eu-cdbr-west-01.cleardb.com',
    user: 'ba93bc4c8b74eb',
    database: 'heroku_8f772d7e14d0609', 
    password: 'cac7167c'
  })


  const connection

  export function handleDisconnect() {
    connection = mysql.createConnection(db); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }


  module.exports = db
