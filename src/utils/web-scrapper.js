const cheerio = require("cheerio");

const webScraperMiddleware = async (req, res, next) => {
  const { url } = req.body;
  if (req.method === "POST") {
    try {
      // Fetch HTML content using Fetch API
      const response = await fetch(url);
      const html = await response.text();

      // Load HTML content into Cheerio
      const $ = cheerio.load(html);

      // Extracting favicon
      let favicon =
        $("link[rel='icon']").attr("href") ||
        $("link[rel='shortcut icon']").attr("href");

      // If favicon is a relative path, concatenate it with the root URL
      if (favicon && !favicon.startsWith("http")) {
        const rootUrl = new URL(url);
        favicon = new URL(favicon, rootUrl).toString();
      }

      // Extracting data
      const hTags = [];
      const pTags = [];

      // Fetch all h tags
      $("h1, h2, h3, h4, h5, h6").each((i, hElem) => {
        hTags.push($(hElem).text());
      });

      // Fetch all p tags
      $("p").each((i, pElem) => {
        pTags.push($(pElem).text());
      });

      // Combine h tags and p tags into sections
      const sections = [];
      const minTags = Math.min(hTags.length, pTags.length);

      for (let i = 0; i < minTags; i++) {
        sections.push({
          title: hTags[i],
          content: pTags[i],
        });
      }

      // Attach the extracted sections and favicon to the request object
      const extractedSections = sections?.slice(0, 3);
      let newExtractedSections = [];
      extractedSections.forEach(({ title, content }) => {
        const shortenedContent = content.slice(0, 250);
        newExtractedSections.push({ title, content: shortenedContent });
      });

      req.data = {
        favicon,
        sections: newExtractedSections,
      };

      // Continue with the next middleware or route handler
      next();
    } catch (error) {
      console.error("Error in web scraper middleware:", error);

      return res
        .status(400)
        .json({ error: "Internal Server Error. Url might not exist" });
    }
  } else {
    next();
  }
};

module.exports = webScraperMiddleware;

// const cheerio = require("cheerio");

// const webScraperMiddleware = async (req, res, next) => {
//   const { url } = req.body;

//   try {
//     // Fetch HTML content using Fetch API
//     const response = await fetch(url);
//     const html = await response.text();

//     // Load HTML content into Cheerio
//     const $ = cheerio.load(html);

//     // Extracting data
//     const hTags = [];
//     const pTags = [];

//     // Fetch all h tags
//     $("h1, h2, h3, h4, h5, h6").each((i, hElem) => {
//       hTags.push($(hElem).text());
//     });

//     // Fetch all p tags
//     $("p").each((i, pElem) => {
//       pTags.push($(pElem).text());
//     });

//     // Combine h tags and p tags into sections
//     const sections = [];
//     const minTags = Math.min(hTags.length, pTags.length);

//     for (let i = 0; i < minTags; i++) {
//       sections.push({
//         title: hTags[i],
//         content: pTags[i],
//       });
//     }

//     //console.log("Extracted Sections:", sections);

//     // Attach the extracted sections to the request object for later use if needed
//     const extractedSections = sections?.slice(0, 3);
//     let newExtractedSections = [];
//     extractedSections.forEach(({ title, content }) => {
//       const shortenedContent = content.slice(0, 250);
//       newExtractedSections.push({ title, content: shortenedContent });
//     });
//     req.sections = newExtractedSections;

//     // Continue with the next middleware or route handler
//     next();
//   } catch (error) {
//     console.error("Error in web scraper middleware:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

module.exports = webScraperMiddleware;

// const cheerio = require("cheerio");

// const webScraperMiddleware = async (req, res, next) => {
//   const { url } = req.body;

//   try {
//     // Fetch HTML content using Fetch API
//     const response = await fetch(url);
//     const html = await response.text();

//     // Load HTML content into Cheerio
//     const $ = cheerio.load(html);

//     // Extracting data
//     const sections = [];
//     let stopParsing = false; // Flag to control the loop

//     $("h1, h2, h3, h4, h5, h6").each((i, hElem) => {
//       if (!stopParsing) {
//         const sectionTitle = $(hElem).text();
//         const sectionContent = [];

//         // Collect all adjacent text nodes until the next <h> tag
//         let nextNode = $(hElem)[0].next;
//         while (nextNode && nextNode.type === "text") {
//           sectionContent.push(nextNode.data);
//           nextNode = nextNode.next;
//         }

//         sections.push({
//           title: sectionTitle,
//           content: sectionContent.join(" "),
//         });

//         // Set the flag to stop parsing after capturing 3 sections
//         if (sections.length === 3) {
//           stopParsing = true;
//         }
//       }
//     });

//     console.log("Extracted Sections:", sections);

//     // Attach the extracted sections to the request object for later use if needed
//     req.sections = sections;

//     // Continue with the next middleware or route handler
//     next();
//   } catch (error) {
//     console.error("Error in web scraper middleware:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = webScraperMiddleware;
