const axios = require("axios");

const query = "fiction";

const helper = function (arg) {
  arg.find((element) => {
    if (element.identifier.length === 13) {
      return element.identifier;
    }
  });
  return null;
};

axios
  .get(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOK_KEY}`
  )
  .then((response) => {
    for (let i = 0; i < 10; i++) {
      // console.log(response.data.items[i].volumeInfo.industryIdentifiers);

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
