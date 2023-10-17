import mysql from 'mysql';

// set mysql connection
const db = mysql.createConnection({
  // local database
  host: 'localhost',  // Replace with your host name
  user: 'root',   // Replace with your database username
  password: '',   // Replace with your database password
  database: 'nightlearn'    // Replace with your database Name
  // freesqldatabase.com database
  // host: 'sql6.freesqldatabase.com',  // Replace with your host name
  // user: 'sql6643060',   // Replace with your database username
  // password: '6XuBuuPQYX',   // Replace with your database password
  // database: 'sql6643060'    // Replace with your database Name
});
// db.connect();
// db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
// db.end();

db.connect(function (err) {

  if (err) throw err;
  console.log("Connected!");
  var sql = `CREATE TABLE IF NOT EXISTS authusers (id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255),phonenumber VARCHAR(255), password VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    
    db.query("ALTER TABLE authusers AUTO_INCREMENT=1000000001", function (err, result) {
      if (err) throw err;
    });
    
  });
});

export default db;