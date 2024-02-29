const express = require("express");
const { getParty, postParty, getSingleParty } = require("../controllers/index");
const router = express.Router();

router.post("/getParties", getParty);
router.post("/addParties", postParty);
router.get("/singleParty/:id", getSingleParty);
module.exports = router;
