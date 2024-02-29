const express = require("express");
const { getPartySingleSale } = require("../controllers/index");
const router = express.Router();

router.post("/getPartySingleSale", getPartySingleSale);
module.exports = router;
