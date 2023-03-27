const express = require("express");
const router = express.Router();
const conn = require("../conn/conn");
const upload = require("../middleware/multer.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const user_controllers = require("../controller/all_users");
const admin_controller = require("../controller/admin_controller");
const contactform = require("../controller/contact_form");
const msgs_controller = require("../controller/msgs.js");
const notification_controller = require("../controller/notification_controller.js")
const {
  validateRegistration,
  validatePatient,
  validateLogin,
  validate,
  validateContactForm,
} = require("../middleware/validations.js");
const { request } = require("express");
// router.get("/", function (req, res) {
//   res.send("homepage");
// });
// router.get("/conn", conn);
router.post(
  "/doctor-registration",
  validateRegistration,
  user_controllers.new_doctor
);
router.get("/verify/:token", user_controllers.verify_email);
router.post(
  "/doctor-login",
  validateLogin,
  validate,
  user_controllers.doctor_login
);
router.get("/doctor-logout", user_controllers.doctor_logout);
router.get("/get-one-doctor/:id", user_controllers.get_one_doctor);
router.get("/get-one-patient/:id", user_controllers.get_one_patient);

router.get(
  "/patient-search/",
  verifyToken,
  user_controllers.patient_search_by_name
);
router.post("/add-note", user_controllers.add_notes);
router.get(
  "/all-notes-of-one-patient/:id",
  user_controllers.get_one_patient_notes
);
router.post("/share-email-data", user_controllers.sharepatientdata);

router.get(
  "/get-one-patient-devices/:id",
  user_controllers.get_one_patient_devices
);

router.post(
  "/patient-login",
  validateLogin,
  validate,
  user_controllers.patient_login
);
router.put(
  "/patient-edit/:id",
  validatePatient,
  validate,
  verifyToken,
  user_controllers.edit_patient
);
router.delete(
  "/patient-delete/:id",
  verifyToken,
  user_controllers.delete_patient
);

// router.get("/patient-logout", user_controllers.patient_logout);

// admin
router.put("/admin/approve/:id",verifyToken, admin_controller.verifyUser);
router.get("/admin/get-all-doctors",verifyToken, admin_controller.get_all_doctors);
router.put("/admin/block-doctor-account/:id",verifyToken, admin_controller.block_doctor_account);
// end admin
router.post(
  "/patient-registration",
  validatePatient,
  validate,
  verifyToken,
  user_controllers.new_patient
);
router.put("/update-password", verifyToken, user_controllers.update_pass_func);
router.put("/update-name", verifyToken, user_controllers.update_name);
router.get(
  "/patient-list-of-a-doctor",
  verifyToken,
  user_controllers.all_patients_of_one_doctor
);

router.post(
  "/new-contact-form",
  validateContactForm,
  contactform.new_contact_form
);

// messages
router.post(
  "/new-message",
  verifyToken,
  upload.array("attachments", 10),
  msgs_controller.set_new_message
);
router.put("/edit-message/:id", verifyToken, msgs_controller.edit_message);
router.delete(
  "/delete-message/:id",
  verifyToken,
  msgs_controller.delete_message
);
router.delete(
  "/delete-all-messages",
  verifyToken,
  msgs_controller.delete_all_messages
);

// notification
router.get(
  "/check-patient-notifications",
  verifyToken,
  notification_controller.check_patient_notifications
);
router.put(
  "/mark-read-notifications/:patientId",
  verifyToken,
  notification_controller.markNotificationAsRead
);


module.exports = router;
