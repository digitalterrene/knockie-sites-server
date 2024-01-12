const express = require("express");
const { upsert_new_website } = require("../controllers/websites");

const router = express.Router();
//adding new data
router.post("/upsert-new", upsert_new_website);

module.exports = router;
