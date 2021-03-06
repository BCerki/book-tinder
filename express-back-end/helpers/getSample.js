require("dotenv").config({ path: `../.env` });
const BOOKNET_API_KEY = process.env.BOOKNET_API_KEY;
const crawler = require("crawler-request");
const _ = require("lodash");

// Calls BiblioShare API, requests PDF sample, peforms conversions, returns single random sentence
const getSample = (isbn, userNum) => {
  console.log("LOG: getSample.js: function called...");
  return new Promise((resolve, reject) => {
    // Calls API, converts PDF to rough text
    crawler(
      `https://www.biblioshare.ca/BNCServices/BNCServices.asmx/Samples?token=${BOOKNET_API_KEY}&ean=${isbn}&san=&perspective=Sample&filenumber=`
    )
      // Handle response
      .then((response) => {
        // Store result of rough PDF to text conversion
        const convertedText = response.text;
        // Encode convertedText into URI
        const encondedText = encodeURI(convertedText);
        // Split encondedText by new line (%0A), each element represents line of text, store as array
        const splitArr = encondedText.split("%0A");
        // Decode array line by line to make output readable
        const decodedArr = splitArr.map((line) => decodeURI(line));
        // Filter splitArr removing lines that start with numbers & headings, have empty content
        const filteredArr = decodedArr.filter((line) => {
          return (
            !line.match("^\\d") && !line.match("^[A-Z]{2}") && line.length > 0
          );
        });
        // Remove double spaces
        const joinedStr = filteredArr.join("").replace(/\s\s+/g, " ");
        // Split cleaned up whole text (no line breaks) by ".", store as array
        const allLinesArr = joinedStr.split(".");

        // Line/quote selection methods

        // Get random number based on ISBN
        // const randomNum =
        //   Number(isbn.toString().split("")[7]) *
        //   Number(isbn.toString().split("")[9]);

        // Get random line based on shuffled array
        // const randomLine = _.shuffle(allLinesArr)[0];

        // Get random line based on userNum function parameter
        const randomLine = `${allLinesArr[userNum]}.`;

        // Console log result
        console.log("LOG: getSample.js: randomLine", randomLine);
        // Return single random line
        resolve(randomLine);
      })
      // Error handling
      .catch((err) => {
        reject(err.message);
      });
  });
};

// Test code
getSample(9781770415034, 19);

module.exports = getSample;
