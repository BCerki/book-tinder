const { GOOGLE_BOOK_KEY } = require("../.secrets");
const axios = require("axios");

//to search only subject, put "insubject:" in front of the query term, for example: "insubject:fiction"
const query = "fiction";

const helper = function (arg) {
  let results = null;
  arg.find((element) => {
    if (element.identifier.length === 13) {
      results = element.identifier;
    }
    return null;
  });

  return results;
};
axios
  .get(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${GOOGLE_BOOK_KEY}`
  )
  .then((response) => {
    for (let i = 0; i < 10; i++) {
      console.log(
        `VALUES ('${helper(
          response.data.items[i].volumeInfo.industryIdentifiers
        )}','${response.data.items[i].volumeInfo.title}', '${
          response.data.items[i].volumeInfo.authors[0]
        }', '${response.data.items[i].volumeInfo.imageLinks.thumbnail}', '${
          response.data.items[i].searchInfo.textSnippet
        }', ${response.data.items[i].volumeInfo.pageCount}, '${
          response.data.items[i].volumeInfo.publishedDate
        }', ${
          response.data.items[i].saleInfo.listPrice
            ? response.data.items[i].saleInfo.listPrice.amount
            : null
        }, false)`
      );
    }
  });
//authors is array

// const getISBN13 = function() {
//   const thing = response.data.items[
//     i
//   ].volumeInfo.industryIdentifiersindustryIdentifiers.find(
//     (element) => element.identfier.length === 13
//   );
//   console.log("thing", thing);
// };

// response.data.items[i].volumeInfo.industryIdentifiersindustryIdentifiers.find(
//   (element) => {
//     if (element.identfier.length === 13) return element.identfier;
//   }
// );
