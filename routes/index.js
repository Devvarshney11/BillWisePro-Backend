const express = require("express");
const {
  UserController,
  addUser,
  userData,
  generate,
} = require("../controllers/index");
const router = express.Router();

router.post("/user", UserController);
router.post("/addUser", addUser);
router.post("/userData", userData);
router.post("/generate", generate);
module.exports = router;
