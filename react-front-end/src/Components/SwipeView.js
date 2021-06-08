import React, { useState, useEffect } from "react";
import axios from "axios";
import bookData from "../dummyData/dummyBookData";
import _ from "lodash";
import "../styles/swipe.scss";
import TinderCard from "react-tinder-card";

export default function Swipe(props) {
  const [retrievedBooks, setRetrievedBooks] = useState([]);
  // const [currentBook, setCurrentBook] = useState({});

  useEffect(() => {
    axios
      .get("/api/test")
      .then((response) => {
        console.log("response.data", response.data);
        // setCurrentBook(_.shuffle(response.data)[0]);
        setRetrievedBooks(response.data);
      })
      .catch((err) => console.log("Error message:", err.message));
  }, []);

  return (
    <div className="cardContainer">
      {retrievedBooks.map((book) => {
        return (
          <TinderCard
            className={"swipe"}
            key={book.id}
            preventSwipe={["up", "down"]}
          >
            <div
              className={"card"}
              style={{ backgroundImage: `url(${book.image})` }}
            ></div>
          </TinderCard>
        );
      })}
    </div>
  );
}

// {
/*  */
// // }
// <img className="cover" src={currentBook.image} alt={currentBook.title} />
