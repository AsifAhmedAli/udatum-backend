var mysql = require("mysql2/promise");
require("dotenv").config();
const connection =async () => {
var con = await mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.pass,
  database: process.env.dbname,
});
// console.log(process.env.user);
// console.log(process.env.host);
// console.log(process.env.dbname);
// console.log(process.env.pass);
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
};

module.exports = con;
