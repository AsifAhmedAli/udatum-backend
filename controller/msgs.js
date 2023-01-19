const conn = require("../conn/conn");

//set_new_message
const set_new_message = (req, res) => {
  var from = req.body.from;
  var to = req.body.to;
  var msg = req.body.msg;
  var dbname = process.env.dbname;
  let sql3 = "CALL " + dbname + ".set_message(?, ?, ?)";
  conn.query(sql3, [from, to, msg], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      return res.send({ msg: "success" });
    }
  });
};

// getchat
// const getchat = (req, res) => {
//     var from = req.body.from;
//     var to = req.body.to;

// }
module.exports = { set_new_message };
