import React, { useState, useEffect } from "react";
import axios from "axios";
import bookData from "../dummyData/dummyBookData";
import _ from "lodash";
import "../styles/swipe.scss";

export default function Swipe(props) {
  const [currentBook, setCurrentBook] = useState({});
  //bad to requery the api on every mount/render?
  // _.shuffle(response.data)[0]
  useEffect(() => {
    axios
      .get("https://my-json-server.typicode.com/bcerki/book-tinder/books")
      .then((response) => {
        setCurrentBook(response.data);
      });
  }, []);
  return (
    <img
      className="cover"
      src={currentBook.coverImage}
      alt={currentBook.title}
    />
  );
}

// {
/*  */
// }
