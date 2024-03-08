const express = require("express");
const {
  getPartyTransactions,
  getInvoicesCount,
} = require("../controllers/index");
const router = express.Router();

router.post("/partyTransactions", getPartyTransactions);
router.post("/invoicesCount", getInvoicesCount);
module.exports = router;
