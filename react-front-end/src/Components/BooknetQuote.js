import React, { useContext, useEffect, useState } from "react";
import { chatBookStateContext } from "../providers/ChatBookStateProvider";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
// import getSample from "../helpers/getSample";
// import getSample from "../../../express-back-end/helpers/getSample";

// console.log("bookId is", bookId);

export default function BooknetQuote(props) {
  console.log("props in booknet quote", props);
  const matchId = Number(useLocation().pathname.replace("/matches/", ""));

  const [match, setMatch] = useState();

  const [quote, setQuote] = useState();
  // const { currentChatBook, chatContext } = useContext(chatBookStateContext);

  useEffect(() => {
    if (matchId) {
      axios
        .get(`/api/users/1/conversations`)
        .then((result) => {
          //get the book isbn
          const allMatches = result.data;
          console.log("all matches", allMatches);
          const thisMatch = allMatches.find((book) => book.id === matchId);
          setMatch(thisMatch);
          console.log("chatting book is", thisMatch);
          //ask the back-end to retrieve a sample
          axios
            .get(
              `/api/sample/?isbn=${thisMatch.isbn}&randomNum=${props.randomNum}`
            )
            .then((result) => {
              console.log("this should be some quotes:", result.data);
              setQuote(result.data);
            })
            .catch((err) => console.log("Error:", err.message));
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  // console.log("currentChatBook in chatbotsentpic is:", currentChatBook);
  if (!match) {
    return <Loading />;
  }
  return <span className={"customText"}>{quote} —Me</span>;
}
