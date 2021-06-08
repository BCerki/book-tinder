import React, { useState, useEffect } from "react";
import axios from "axios";
import bookData from "../dummyData/dummyBookData";
import _ from "lodash";
import "../styles/swipe.scss";

export default function Swipe(props) {
  const [currentBook, setCurrentBook] = useState({});

  useEffect(() => {
    axios
      .get("/api/test")
      .then((response) => {
        console.log(response.data);
        setCurrentBook(_.shuffle(response.data)[0]);
      })
      .catch((err) => console.log("Error message:", err.message));
  }, []);
  return (
    <img className="cover" src={currentBook.image} alt={currentBook.title} />
  );
}

// {
/*  */
// }