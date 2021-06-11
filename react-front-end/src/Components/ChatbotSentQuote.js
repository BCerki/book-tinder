import React, { useContext, useEffect, useState } from "react";
import { chatBookStateContext } from "../providers/ChatBookStateProvider";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
// import getSample from "../helpers/getSample";
// import getSample from "../../../express-back-end/helpers/getSample";

// console.log("bookId is", bookId);

export default function ChatbotSentPic(props) {
  const bookId = Number(useLocation().pathname.replace("/matches/", ""));

  const [currentBook, setCurrentBook] = useState();

  const [quote, setQuote] = useState();
  // const { currentChatBook, chatContext } = useContext(chatBookStateContext);

  useEffect(() => {
    if (bookId) {
      axios
        .get(`/api/users/:id/conversations`)
        .then((result) => {
          //get the book isbn
          const allBooks = result.data;
          const chattingBook = allBooks.find((book) => book.id === bookId);
          setCurrentBook(chattingBook);
          console.log("chatting book is", chattingBook);
          // setQuote(getSample(chattingBook.isbn));

          //   axios
          //     .put(`/api/sample/${chattingBook.isbn}`, chattingBook.isbn)
          //     .then(() => console.log("successfully sent isbn to Adrian"))
          //     .catch(() => console.log("failed to send to Adrian"));
          //
        })
        .catch(() => {});

      axios
        .get(`/api/sample/9781770415034`)
        .then((result) => {
          console.log("this should be some quotes", result.data);
          setQuote(result.data);
        })
        .catch((err) => console.log("Error:", err.message));
    }
  }, []);

  // console.log("currentChatBook in chatbotsentpic is:", currentChatBook);
  if (!currentBook) {
    return <Loading />;
  }
  return (
    <div>
      <span>i am a quote: {quote}</span>
    </div>
  );
}
