require("dotenv").config({ path: `../.env` });
const BOOKMANAGER_API_KEY = process.env.BOOKMANAGER_API_KEY;
const FormData = require("form-data");
const fetch = require("node-fetch");

const getLocation = async (isbn, postal, max_distance) => {
  console.log("LOG: getLocation.js: function called...");

  // Create formData for http Bookmanager API request
  const formData = new FormData();
  formData.append("api_key", BOOKMANAGER_API_KEY);
  formData.append("product_code", isbn);
  formData.append("postal", postal);
  formData.append("distance_km", max_distance);

  return new Promise((resolve, reject) => {
    fetch("https://api.bookmanager.com/tbm/nearbyStores/get", {
      method: "POST",
      body: formData,
      headers: { origin: "http://localhost:3000" },
    })
      // Handle response
      .then((response) => {
        // Read response stream to completion & parse response as json (complete list of nearby bookstores)
        return response.json();
      })
      .then((jsonData) => {
        // Store, format, resolve closest bookstore
        const closestBookStoreObj = jsonData.rows[0];
        const bookStoreName = closestBookStoreObj.name;
        const bookStoreAddress = closestBookStoreObj.address;
        const bookStoreDistance = closestBookStoreObj.distance_km;
        const closestBookStore = `${bookStoreName}, ${bookStoreAddress}, ${bookStoreDistance} km away`;
        console.log("LOG: getLocation.js: closestBookStore:", closestBookStore);
        // Resolve with name, address, distance of closest booke store
        resolve(closestBookStore);
      })
      // Error handling
      .catch((err) => {
        reject(err.message);
      });
  });
};

// Test Code
// getLocation("9780635034694", "V5L1M5", "100");

module.exports = getLocation;
