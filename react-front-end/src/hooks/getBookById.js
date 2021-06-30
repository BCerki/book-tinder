import React, { useState } from "react";

import axios from "axios";

// const setCurrentBookObjectById = function(bookId) {
//   axios
//     .get(`/api/users/1/books`)
//     .then((result) => {
//       const allBooks = result.data;

//       const bookObject = allBooks.find((book) => book.id === bookId);
//     })
//     .catch(() => {});
// };

// export default setCurrentBookObjectById;

const useCurrentBookObject = function(bookId) {
  const [currentBookObject, setCurrentBookObject] = useState();

  axios
    .get(`/api/users/1/books`)
    .then((result) => {
      const allBooks = result.data;
      const bookObjectFromId = allBooks.find((book) => book.id === bookId);
      setCurrentBookObject(bookObjectFromId);
    })
    .catch(() => {});
};

export default useCurrentBookObject;
