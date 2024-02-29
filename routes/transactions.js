const express = require("express");
const { getPartyTransactions } = require("../controllers/index");
const router = express.Router();

router.post("/partyTransactions", getPartyTransactions);
module.exports = router;
