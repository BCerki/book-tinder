const FormData = require("form-data");
const fetch = require("node-fetch");
// require("dotenv").config({ path: `../.env.` });
// require("dotenv").config({ path: __dirname + `/../.env` });
// const { BOOKMANAGER_API_KEY } = require(".env");

const { BOOKMANAGER_API_KEY } = require("../.secrets");

const getLocation = async (isbn, postal, distance) => {
  console.log("getLocation function called...");

  // Create formData for http Bookmanager API request
  const formData = new FormData();
  formData.append("api_key", BOOKMANAGER_API_KEY);
  formData.append("product_code", isbn);
  formData.append("postal", postal);
  formData.append("distance_km", distance);

  return new Promise((resolve, reject) => {
    fetch("https://api.bookmanager.com/tbm/nearbyStores/get", {
      method: "POST",
      body: formData,
      headers: { origin: "http://localhost:8080" },
    })
      // Handle response
      .then((response) => {
        // Read response stream to completion & parse response as json (complete list of nearby bookstores)
        return response.json();
      })
      .then((jsonData) => {
        // Store, format, resolve closest bookstore
        const closestBookStoreObj = jsonData.rows[0];
        const bookStoreName = jsonData.rows[0].name;
        const bookStoreAddress = jsonData.rows[0].address;
        const bookStoreDistance = jsonData.rows[0].distance_km;
        const closestBookStore = `${bookStoreName}, ${bookStoreAddress}, ${bookStoreDistance} km away`;
        console.log("Closest Book Store:", closestBookStore);
        // Resolve with
        resolve(closestBookStore);
      })
      // Error handling
      .catch((err) => {
        reject("getLocation Error:", err.message);
      });
  });
};

// Test Code
getLocation("9780635034694", "V5L1M5", "100");

module.exports = getLocation;
