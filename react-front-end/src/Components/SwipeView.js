import React, { useState, useEffect } from "react";
import axios from "axios";
import bookData from "../dummyData/dummyBookData";
import _ from "lodash";
import "../styles/swipeView.scss";
import TinderCard from "react-tinder-card";

//sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export default function Swipe(props) {
  const [retrievedBooks, setRetrievedBooks] = useState([]);
  const [lastDirection, setLastDirection] = useState();

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

  const swiped = (direction, bookSwipedId) => {
    console.log("swiped book id is", bookSwipedId);
    setLastDirection(direction);

    console.log("direction is", direction);
    //again, have to use direction, not lastDirection, because it's not set just yet
    if (direction === "left") {
      const foundIt = retrievedBooks.findIndex(
        (book) => book.id === bookSwipedId
      );
      // console.log("foundit", foundIt);
      retrievedBooks.splice(foundIt, 1);
      // console.log("is foundit gone?", retrievedBooks);

      if (retrievedBooks.length === 0) {
        //grab some new books--probably not necessary for demo
      }
    } else if (direction === "right") {
      // alert("Match!");

      //sweet alert
      MySwal.fire({
        title: <p>Hello World</p>,
        footer: "Copyright 2018",
        didOpen: () => {
          // `MySwal` is a subclass of `Swal`
          //   with all the same instance & static methods
          MySwal.clickConfirm();
        },
      }).then(() => {
        return MySwal.fire(<p>Shorthand works too</p>);
      });

      //db update
      axios
        //is conversations correct? does Michelle just need the id? FIX FIX
        .put(`/api/conversations/${bookSwipedId}`, bookSwipedId)
        .then(() => {
          console.log("all is well");
        })
        .catch((err) => {
          console.log("Error:", err.message);
        });
    }
  };

  // const onCardLeftScreen = (bookId) => {
  //   console.log(bookId + " left the screen");
  //   console.log("lastDirection is", lastDirection);
  // };

  return (
    <div className="cardContainer">
      {retrievedBooks.map((book) => {
        return (
          <>
            <TinderCard
              className={"swipe"}
              key={book.id}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swiped(dir, book.id)}
              // onCardLeftScreen={() => onCardLeftScreen(`${book.id}`)}
            >
              <div
                className={"card"}
                style={{ backgroundImage: `url(${book.image})` }}
              ></div>
            </TinderCard>
          </>
        );
      })}
    </div>
  );
}
