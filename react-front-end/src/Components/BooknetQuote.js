import React, { useContext, useEffect, useState } from "react";
import { chatBookStateContext } from "../providers/ChatBookStateProvider";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
// import getSample from "../helpers/getSample";
// import getSample from "../../../express-back-end/helpers/getSample";

// console.log("bookId is", bookId);

export default function BooknetQuote(props) {
  const matchId = Number(useLocation().pathname.replace("/matches/", ""));

  const [match, setMatch] = useState();

  const [quote, setQuote] = useState();
  // const { currentChatBook, chatContext } = useContext(chatBookStateContext);

  useEffect(() => {
    if (matchId) {
      axios
        .get(`/api/users/:id/conversations`)
        .then((result) => {
          //get the book isbn
          const allMatches = result.data;
          const thisMatch = allMatches.find((book) => book.id === matchId);
          setMatch(thisMatch);
          console.log("chatting book is", thisMatch);
          // setQuote(getSample(chattingBook.isbn));

          //   axios
          //     .put(`/api/sample/${chattingBook.isbn}`, chattingBook.isbn)
          //     .then(() => console.log("successfully sent isbn to Adrian"))
          //     .catch(() => console.log("failed to send to Adrian"));
          //
        })
        .then(() => {
          axios
            .get(`/api/sample/${match.isbn}`)
            .then((result) => {
              console.log("this should be some quotes", result.data);
              setQuote(result.data);
            })
            .catch((err) => console.log("Error:", err.message));
        })
        .catch(() => {});
    }
  }, []);

  // console.log("currentChatBook in chatbotsentpic is:", currentChatBook);
  if (!match) {
    return <Loading />;
  }
  return (
    <div>
      <span>{quote}</span>
    </div>
  );
}
