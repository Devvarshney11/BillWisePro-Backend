const express = require("express");
const { getParty, postParty } = require("../controllers/index");
const router = express.Router();

router.get("/getParties", getParty);
router.post("/addParties", postParty);
module.exports = router;
