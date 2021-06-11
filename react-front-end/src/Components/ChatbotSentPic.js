import React, { useContext, useEffect, useState } from "react";
import { chatBookStateContext } from "../providers/ChatBookStateProvider";
import { useLocation } from "react-router-dom";
import axios from "axios";

// console.log("bookId is", bookId);

export default function ChatbotSentPic(props) {
  const bookId = Number(useLocation().pathname.replace("/matches/", ""));

  const [currentBook, setCurrentBook] = useState();
  // const { currentChatBook, chatContext } = useContext(chatBookStateContext);

  useEffect(() => {
    if (bookId) {
      axios
        .get(`/api/users/:id/conversations`)
        .then((result) => {
          // console.log("bookId in useeffect is", bookId);
          //this would maybe be better to grab from books/1? MICHELLE
          const allBooks = result.data;
          // console.log("allBooks is", allBooks);
          // console.log("allBooks[0].id", allBooks[0].id);
          const chattingBook = allBooks.find((book) => book.id === bookId);

          // console.log("chatting book in chatview is", chattingBook);
          setCurrentBook(chattingBook);
        })
        .catch(() => {});
    }
  }, [bookId]);

  // console.log("currentChatBook in chatbotsentpic is:", currentChatBook);
  if (!currentBook) {
    return <div>loading</div>;
  }
  return (
    <span>
      currentChatBook img is:
      <img src={currentBook.image} alt={currentBook.title} />
    </span>
  );
}
