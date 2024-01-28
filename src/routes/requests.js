const express = require("express");
const { upsert_new_request } = require("../controllers/requests");
const webScraperMiddleware = require("../utils/web-scrapper");

const router = express.Router();
//adding new data
router.post("/upsert-new", upsert_new_request);
router.post("/scrape", webScraperMiddleware, (req, res) => {
  const { sections } = req;
  const { url } = req.body;
  try {
    if (!url) {
      return res.status(400).json({ error: "url is  required" });
    }
    return res.status(200).json({ sections: sections });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
