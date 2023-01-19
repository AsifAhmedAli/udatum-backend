const express = require("express");
const router = express.Router();
const conn = require("../conn/conn");
const user_controllers = require("../controller/all_users");
const contactform = require("../controller/contact_form");
const msgs_controller = require("../controller/msgs");
// router.get("/", function (req, res) {
//   res.send("homepage");
// });
// router.get("/conn", conn);
router.post("/doctor-registration", user_controllers.new_doctor);
router.post("/patient-registration", user_controllers.new_patient);
router.post("/update-password", user_controllers.update_pass_func);
router.post("/new-message", msgs_controller.set_new_message);
router.post("/update-name", user_controllers.update_name);
router.get(
  "/patient-list-of-a-doctor",
  user_controllers.all_patients_of_one_doctor
);
router.post("/new-contact-form", contactform.new_contact_form);

module.exports = router;
