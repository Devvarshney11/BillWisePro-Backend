const express = require("express");
const { getItems, postItems, singleItem } = require("../controllers/index");
const router = express.Router();

router.post("/items", getItems);
router.post("/addItems", postItems);
router.get("/singleItem/:id", singleItem);
module.exports = router;
