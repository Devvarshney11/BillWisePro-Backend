const express = require("express");
const { getItems, postItems } = require("../controllers/index");
const router = express.Router();

router.get("/items", getItems);
router.post("/addItems", postItems);
module.exports = router;
