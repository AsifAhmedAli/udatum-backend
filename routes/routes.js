const express = require("express");
const router = express.Router();
const conn = require("../conn/conn");
const upload = require("../middleware/multer.js");
const { verifyToken, verifyToken1 } = require("../middleware/verifyToken.js");
const user_controllers = require("../controller/all_users");
const admin_controller = require("../controller/admin_controller");
const contactform = require("../controller/contact_form");
const msgs_controller = require("../controller/msgs.js");
const notification_controller = require("../controller/notification_controller.js");
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
router.post("/get-access-token", user_controllers.get_auth_token);
router.post("/get-weight", user_controllers.get_weight);
router.post("/get-blood-pressure",verifyToken, user_controllers.get_blood_pressure);

router.get(
  "/get-cid-csecret/:did",
  verifyToken,
  user_controllers.get_cid_csecret
);
router.get("/get-withings-url", verifyToken, user_controllers.get_url);
// console.log(response)
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
router.get("/get-one-doctor/:id", verifyToken, user_controllers.get_one_doctor);
router.post(
  "/get-one-patient-time/:id",
  verifyToken,
  user_controllers.get_one_patient_time
);
router.post(
  "/update-one-patient-time/",
  verifyToken,
  user_controllers.addtotime
);

router.get(
  "/get-one-patient/:id",
  verifyToken,
  user_controllers.get_one_patient
);
router.post("/add-note", verifyToken, user_controllers.add_notes);
router.get(
  "/all-notes-of-one-patient/:id",
  verifyToken,
  user_controllers.get_one_patient_notes
);
router.post("/share-email-data", user_controllers.sharepatientdata);

router.get(
  "/get-one-patient-devices/:id",
  verifyToken,
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
  verifyToken,
  user_controllers.edit_patient
);

router.post("/add-cid-csecret/", verifyToken, user_controllers.safedata);
router.post(
  "/activate-request/",
  // verifyToken,
  user_controllers.activate_request
);
router.delete(
  "/patient-delete/:id",
  verifyToken,
  user_controllers.delete_patient
);

router.get("/patient-logout", user_controllers.patient_logout);
router.get("/countchatroommembers/:id", msgs_controller.countchatroommembers);

// admin
router.post(
  "/admin-login",
  validateLogin,
  validate,
  admin_controller.admin_login
);
router.put("/admin/approve/:id", verifyToken1, admin_controller.verifyUser);
router.get(
  "/admin/get-all-doctors",
  verifyToken1,
  admin_controller.get_all_doctors
);

router.get(
  "/admin/get-one-doctor-by-admin/:id",
  verifyToken1,
  admin_controller.get_one_doctor1
);

router.post("/create-checkout-session", user_controllers.stripe_call);
router.post(
  "/admin/update-order-status/:id",
  verifyToken1,
  admin_controller.update_order_status
);
router.get(
  "/admin/get-all-orders",
  verifyToken1,
  admin_controller.getallorders
);

router.get(
  "/get-pervious-orders/:id",
  verifyToken,
  user_controllers.getpreviousorders
);
router.put(
  "/admin/block-doctor-account/:id",
  verifyToken1,
  admin_controller.block_doctor_account
);
// end admin
router.post(
  "/patient-registration",
  validatePatient,
  validate,
  verifyToken,
  user_controllers.new_patient
);

router.post(
  "/order-device",
  validate,
  verifyToken,
  user_controllers.order_device
);
router.put("/update-password", verifyToken, user_controllers.update_pass_func);
router.put("/update-name", verifyToken, user_controllers.update_name);
router.get(
  "/patient-list-of-a-doctor",
  verifyToken,
  user_controllers.all_patients_of_one_doctor
);

router.get(
  "/all-patients-of-one-doctor/:id",
  // verifyToken1,
  admin_controller.all_patients_of_one_doctor
);
router.post(
  "/new-contact-form",
  validateContactForm,
  contactform.new_contact_form
);

// messages
router.post(
  "/new-message",

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

// router.get(
//   "/all-chats/:id",
//   verifyToken,
//   msgs_controller.list_of_all_to_messages
// );

router.get(
  "/all-chatrooms/:id",
  verifyToken,
  msgs_controller.get_all_chat_rooms_of_a_user
);

router.get(
  "/chat-room-messages/:id",
  verifyToken,
  msgs_controller.get_all_messages_of_a_chatroom
);
router.post("/create-chat-room/:id", verifyToken, msgs_controller.newchatroom);

router.post("/get-activation-token", verifyToken, user_controllers.activation_token);

module.exports = router;
