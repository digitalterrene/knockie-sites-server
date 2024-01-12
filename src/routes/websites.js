const express = require("express");
const {
  upsert_new_website,
  fetch_websites,
} = require("../controllers/websites");

const router = express.Router();
//adding new data
router.post("/upsert-new", upsert_new_website);
router.get("/fetch-websites/:key/:value", fetch_websites);

module.exports = router;
