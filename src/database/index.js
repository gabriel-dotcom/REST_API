const db = require('mysql');

//const pool = db.createPool({
  //  'user': process.env.MYSQL_USER,
    //'password': process.env.MYSQL_PASSWORD,
    //'database': process.env.MYSQL_DATABASE,
   // 'host': process.env.MYSQL_HOST,
    //'port': 3306
//});

const pool = db.createPool({
    'user': 'root',
    'password': 'G4briel132',
    'database': 'Cliente',
    'host': 'localhost',
    'port': '3306',
});

exports.pool = pool;