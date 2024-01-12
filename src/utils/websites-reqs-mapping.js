var natural = require("natural");
var tokenizer = new natural.WordTokenizer();

/*
this is the flow of logic.
---------> we recieve a request
---------> we use puppetteer to search for the possible web results
---------> we search in our websites directory to search for the possible web results
---------> we allocate the web results to the request object's websites array
---------> next when a request is recieved we get the websites and return them

*/
const processSEO = (search_query) => {
  //tokenize
  try {
    let seo_keywords = tokenizer.tokenize(search_query);

    //console.log("Token decoded:", decoded);
    return seo_keywords;
  } catch (error) {
    return "Failed to tokenize";
  }
};
module.exports = {
  processSEO,
};
