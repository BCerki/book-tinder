import React, { useContext, useEffect, useState } from "react";
import { chatBookStateContext } from "../providers/ChatBookStateProvider";
import { useLocation } from "react-router-dom";
import axios from "axios";
import getSample from "../helpers/getSample";

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
          setQuote(getSample(chattingBook.isbn));
        })
        .catch(() => {});
    }
  }, []);

  // console.log("currentChatBook in chatbotsentpic is:", currentChatBook);
  if (!currentBook) {
    return <div>loading</div>;
  }
  return (
    <div>
      <span>{quote}</span>
      <img src={currentBook.image} alt={currentBook.title} />
    </div>
  );
}
