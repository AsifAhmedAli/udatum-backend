const express = require("express");
const router = express.Router();
const user_controllers = require("../controller/all_users");
router.get("/all_users", user_controllers.all_users1);
router.get("/all_messages", user_controllers.all_msgs);

module.exports = router;
