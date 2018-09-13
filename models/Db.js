var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "StormCloud3",
  database: 'dashboard'
});

let Db = {

    query: async (sql) => {
        return new Promise((resolve, reject) => {

	  con.query(sql, function (err, result) {
	      if (err){ 
		  throw err;
	      }
	 	resolve(result);	
	  });
	});
    }
}

module.exports = Db;
