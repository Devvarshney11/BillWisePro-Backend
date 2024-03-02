const express = require("express");
const { getPartySingleSale } = require("../controllers/index");
const router = express.Router();

router.get("/getSingleInvoice/:id", getPartySingleSale);
module.exports = router;
