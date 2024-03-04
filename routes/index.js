const express = require("express");
const { UserController, addUser, userData } = require("../controllers/index");
const router = express.Router();

router.post("/user", UserController);
router.post("/addUser", addUser);
router.post("/userData", userData);
module.exports = router;
