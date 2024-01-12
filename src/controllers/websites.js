const { processSEO } = require("../utils/websites-reqs-mapping");

const { connectToDatabase } = require("../utils/db");

const upsert_new_website = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { url, name, description, google_safe_browsing_api_check } = req.body;
    // Check if the url a already exists
    const existingURL = await db.collection("websites").findOne({ url });
    if (existingURL) {
      //if query already exists, return
      return res.status(201).json({ message: "URL already exists." });
    }

    if (!name) {
      return res.status(400).json({ error: "Website name is required" });
    }
    if (!description) {
      return res.status(400).json({
        error: "Website description is required",
      });
    }
    const inserted_website = await db
      .collection("websites")
      .insertOne(req.body);
    if (inserted_website) {
      res.status(201).json({ message: "Successfully inserted new website" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  upsert_new_website,
};
