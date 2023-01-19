const conn = require("../conn/conn");
//new registration patient-controller
function new_patient(req, res) {
  if (typeof req.body.device_barcode !== "undefined") {
    var device_barcode = req.body.device_barcode;
  } else {
    var device_barcode = "not set";
  }
  if (typeof req.body.hth !== "undefined") {
    var hth = req.body.hth;
  } else {
    var hth = "not set";
  }
  if (typeof req.body.lth !== "undefined") {
    var lth = req.body.lth;
  } else {
    var lth = "not set";
  }

  if (typeof req.body.mc !== "undefined") {
    var mc = req.body.mc;
  } else {
    var mc = "not set";
  }

  if (typeof req.body.notes !== "undefined") {
    var notes = req.body.notes;
  } else {
    var notes = "not set";
  }

  if (typeof req.body.dob !== "undefined") {
    var dob = req.body.dob;
  } else {
    var dob = "not set";
  }
  var name1 = req.body.name;
  var email1 = req.body.email;
  var pass1 = req.body.pass;
  //   var dob = req.body.dob;
  //   var device_barcode = req.body.device_barcode;
  //   var hth = req.body.hth;
  //   var lth = req.body.lth;
  //   var mc = req.body.mc;
  //   var notes = req.body.notes;
  var dbname = process.env.dbname;
  let sql = "CALL " + dbname + ".set_patient_registration(?, ?, ?)";

  conn.query(sql, [name1, email1, pass1], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      // return res.send({ msg: "success" });
      let sql1 = "CALL " + dbname + ".get_latest_patient()";

      conn.query(sql1, (error, results1, fields) => {
        if (error) {
          return console.error(error.message);
        } else {
          lastest_patient = results1[0][0].newpatient;
          // return res.send({ msg: "success" });
          let sql2 = "CALL " + dbname + ".set_patient_details(?, ?, ?, ?, ?)";

          conn.query(
            sql2,
            [lastest_patient, dob, hth, lth, mc],
            (error, results, fields) => {
              if (error) {
                return console.error(error.message);
              } else {
                // return res.send({ msg: "success" });
                let sql3 = "CALL " + dbname + ".set_patient_notes(?, ?)";

                conn.query(
                  sql3,
                  [notes, lastest_patient],
                  (error, results, fields) => {
                    if (error) {
                      return console.error(error.message);
                    } else {
                      //   return res.send({ msg: "success" });
                      let sql4 =
                        "CALL " + dbname + ".set_patient_devices(?, ?)";

                      conn.query(
                        sql4,
                        [lastest_patient, device_barcode],
                        (error, results, fields) => {
                          if (error) {
                            return console.error(error.message);
                          } else {
                            return res.send({ msg: "success" });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
  });
  //   console.log(
  //     device_barcode +
  //       "\n" +
  //       hth +
  //       "\n" +
  //       lth +
  //       "\n" +
  //       mc +
  //       "\n" +
  //       notes +
  //       "\n" +
  //       name1 +
  //       "\n" +
  //       email1 +
  //       "\n" +
  //       pass1 +
  //       "\n" +
  //       dob
  //   );
  return 0;
}
//update_pass
const update_pass_func = (req, res) => {
  var currentpass = req.body.current_pass;
  var updated_pass = req.body.updated_pass;
  var update_pass1 = req.body.update_pass1;
  var user_id = req.body.user_id;
  var dbname = process.env.dbname;
  let sql = "CALL " + dbname + ".get_user(?)";

  conn.query(sql, [user_id], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      if (currentpass == results[0][0].password) {
        if (updated_pass != update_pass1) {
          return res.send({ msg: "passwords not same" });
        }
        if (updated_pass == update_pass1) {
          //   return res.send({ msg: "success" });
          let sql = "CALL " + dbname + ".update_passworda(?, ?)";

          conn.query(sql, [updated_pass, user_id], (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            } else {
              return res.send({ msg: "success" });
            }
          });
        }
      } else {
        return res.send({ msg: "incorrect current pasword" });
      }
    }
  });
};
//update user name
const update_name = (req, res) => {
  var new_name = req.body.name;
  var user_id = req.body.user_id;
  var dbname = process.env.dbname;
  let sql = "CALL " + dbname + ".update_name(?, ?)";

  conn.query(sql, [new_name, user_id], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      return res.send({ msg: "success" });
    }
  });
};
//new registration doctor-controller
const new_doctor = (req, res) => {
  var name1 = req.body.name;
  var email1 = req.body.email;
  var pass1 = req.body.pass;
  var dbname = process.env.dbname;
  let sql = "CALL " + dbname + ".get_user_with_email(?)";

  conn.query(sql, [email1], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      console.log(results[0]);
    }
  });
  //   let sql = "CALL " + dbname + ".set_doctor_registration(?, ?, ?)";

  //   conn.query(sql, [name1, email1, pass1], (error, results, fields) => {
  //     if (error) {
  //       return console.error(error.message);
  //     } else {
  //       return res.send({ msg: "success" });
  //     }
  //   });
};
//all patients of one doctor
const all_patients_of_one_doctor = (req, res) => {
  var d_id1 = req.query.d_id;
  //   console.log(d_id1);
  var dbname = process.env.dbname;
  let sql = "CALL " + dbname + ".all_patients_of_one_doctor(?)";

  conn.query(sql, [d_id1], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
      //   console.log(results);
      //   return res.results;
      return res.send({ msg: results[0] });
    }
  });
};
// function all_msgs(con, err) {
//   if (err) throw err;
//   con.query("SELECT * FROM msgs", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// }
module.exports = {
  new_patient,
  new_doctor,
  all_patients_of_one_doctor,
  update_pass_func,
  update_name,
};
