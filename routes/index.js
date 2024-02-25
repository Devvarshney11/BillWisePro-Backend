const express = require("express");
const { UserController, addUser } = require("../controllers/index");
const router = express.Router();

router.get("/user", UserController);
router.post("/addUser", addUser);
module.exports = router;
