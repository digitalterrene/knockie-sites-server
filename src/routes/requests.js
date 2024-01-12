const express = require("express");
const { upsert_new_request } = require("../controllers/requests");

const router = express.Router();
//adding new data
router.post("/upsert-new", upsert_new_request);

module.exports = router;
