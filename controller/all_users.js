const con = require("../conn/conn");

function all_users1(con, err) {
  if (err) throw err;
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    Object.keys(result).forEach(function (key) {
      var row = result[key];
      console.log(row.name);
    });
  });
}

function all_msgs(con, err) {
  if (err) throw err;
  con.query("SELECT * FROM msgs", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}
module.exports = { all_users1, all_msgs };
