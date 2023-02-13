const conn = require("../conn/conn");
function new_contact_form(req, res) {
  
  // var name1 = req.body.name;
  // var email1 = req.body.email;
  // var msg1 = req.body.msg;
  // var dbname = process.env.dbname;
  // let sql = "CALL " + dbname + ".set_contact_form(?, ?, ?)";

  // conn.query(sql, [name1, email1, msg1], (error, results, fields) => {
  //   if (error) {
  //     return console.error(error.message);
  //   } else {
  //     return res.send({ msg: "success" });
  //   }
  // });
}
module.exports = { new_contact_form };
// function add_data(con, err) {
//   if (err) throw err;
//   con.query("SELECT * FROM users", function (err, result, fields) {
//     if (err) throw err;
//     Object.keys(result).forEach(function (key) {
//       var row = result[key];
//       //   console.log(row.name);
//     });
//   });
// }
