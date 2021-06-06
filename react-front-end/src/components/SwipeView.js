import React, { useState, useEffect } from "react";
import axios from "axios";
import bookData from "../dummyData/dummyBookData";
import _ from "lodash";
import "../styles/swipe.scss";

export default function Swipe(props) {
  const [currentBook, setCurrentBook] = useState({});

  useEffect(() => {
    axios
      //FIX FIX use our real endpoint
      .get("https://my-json-server.typicode.com/bcerki/book-tinder/books")
      .then((response) => {
        setCurrentBook(_.shuffle(response.data)[0]);
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
