const mysql = require("./connection");

mysql.query("select * from tasks", (err, result) => {
  console.log(result);
});
