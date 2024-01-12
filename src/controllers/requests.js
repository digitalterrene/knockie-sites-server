const { processSEO } = require("../utils/websites-reqs-mapping");

const { connectToDatabase } = require("../utils/db");

const upsert_new_request = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { search_query, location, ip_address } = req.body;
    // Check if the search query a already exists
    const existingQuery = await db
      .collection("requests")
      .findOne({ search_query });
    if (existingQuery) {
      //if query already exists, return
      return res.status(201).json({ message: "Search already exists." });
    }

    if (!search_query) {
      return res.status(400).json({ error: "Search query is required" });
    }
    //to avoid robotic requests
    if (!ip_address) {
      return res.status(400).json({
        error: "Request failed - we need to identify your ip origins",
      });
    }
    if (!location) {
      return res.status(400).json({
        error: "Request failed - we need to identify your location origins",
      });
    }
    //we are skipping mapping the requests with websites at the moment
    //const ress = processSEO(search_query);
    const inserted_request = await db
      .collection("requests")
      .insertOne(req.body);
    if (inserted_request) {
      res.status(201).json({ message: "Successfully inserted new request" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  upsert_new_request,
};
