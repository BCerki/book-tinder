import axios from "axios";
import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
//sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../styles/swipeView.scss";

const MySwal = withReactContent(Swal);

export default function Swipe(props) {
  const [retrievedBooks, setRetrievedBooks] = useState([]);
  const [match, setMatch] = useState({});
  const [lastDirection, setLastDirection] = useState();

  useEffect(() => {
    axios
      .get("/api/users/1/books")
      .then((response) => {
        // setCurrentBook(_.shuffle(response.data)[0]);
        setRetrievedBooks(response.data);
      })
      .catch((err) => console.log("Error message:", err.message));
  }, []);

  const swiped = (direction, book) => {
    //gave swiped the entire book object

    setLastDirection(direction);

    //again, have to use direction, not lastDirection, because it's not set just yet
    if (direction === "left") {
      const foundIt = retrievedBooks.findIndex((input) => input.id === book.id);

      retrievedBooks.splice(foundIt, 1);

      if (retrievedBooks.length === 0) {
        //grab some new books--probably not necessary for demo
      }

      //db update
      axios
        .post(`/api/users/1/rejected/${book.id}`, book.id)
        .then(() => {
          // console.log("all is well--left-swiped book sent to db");
        })
        .catch((err) => {
          console.log("Error:", err.message);
        });
    } else if (direction === "right") {
      //db update
      axios
        .post(`/api/users/1/conversations/${book.id}`, book.id)
        .then(() => {
          console.log("all is well--right-swiped book sent to db");

          axios
            .get(`/api/users/1/conversations`)
            .then((result) => {
              //set the match
              const allMatches = result.data;
              const thisMatch = allMatches.find(
                (match) => match.book_id === book.id
              );

              //sweet alert
              MySwal.fire({
                title: "You're my type!",
                //using html
                //Can I use react router with this? FIX FIX
                confirmButtonText: `<a class="matchLink" href="/matches/${thisMatch.id}">Chat with me</a>`, //set up currentbook state so you can link to actual chat
                showCancelButton: true,
                cancelButtonText: "Keep looking",

                // animations not working, FIX FIX
                // showClass: {
                //   popup: "animate__animated animate__fadeIn",
                // },
                // hideClass: {
                //   popup: "animate__animated animate__fadeOut",
                // },
              });
            })
            .catch(() => {});
        })
        .catch((err) => {
          console.log("Error:", err.message);
        });
    }
  };

  return (
    <div className="cardContainer">
      {retrievedBooks.map((book) => {
        return (
          <TinderCard
            className={"swipe"}
            key={book.id}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, book)}
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
