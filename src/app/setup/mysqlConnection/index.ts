import mysql from 'mysql';

// set mysql connection
const db = mysql.createConnection({
    host: 'localhost',  // Replace with your host name
    user: 'root',   // Replace with your database username
    password: '',   // Replace with your database password
    database: 'vue-blog'    // Replace with your database Name

});
// db.connect();
// db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
// db.end();

db.connect(function(err) {
  
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS authusers (id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255),phonenumber VARCHAR(255), password VARCHAR(255))";
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });

export default db;