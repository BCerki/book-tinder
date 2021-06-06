import React, { useState } from "react";
import axios from "axios";
import bookData from "../dummyData/dummyBookData";
import _ from "lodash";
import "../styles/swipe.scss";

export default function Swipe(props) {
  //current book is an object of book details
  const [booksState, setBooksState] = useState({
    //OK to have a dummy?
    currentBook: null,
    allBooks: [],
  });
  //bad to requery the api on every mount/render?
  axios
    .get("/api/books")
    .then((response) => {
      setBooksState((prev) => ({
        ...prev,
        currentBook: _.shuffle(response)[0],
        books: response,
      }));

      return (
        <div>
          <img
            className="cover"
            src={currentBook.coverImage}
            alt={currentBook.title}
          />
        </div>
      );
    })
    .catch((err) => console.log(err));
}
