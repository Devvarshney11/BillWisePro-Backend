const express = require("express");
const { UserController, addUser } = require("../controllers/index");
const router = express.Router();

router.post("/user", UserController);
router.post("/addUser", addUser);
module.exports = router;
