import React, { useContext, useEffect, useState } from "react";
import { chatBookStateContext } from "../providers/ChatBookStateProvider";
import { useLocation } from "react-router-dom";
import axios from "axios";

// console.log("bookId is", bookId);

export default function ChatbotSentPic(props) {
  const bookId = Number(useLocation().pathname.replace("/matches/", ""));

  const [currentBook, setCurrentBook] = useState();

  const [interiorImage, setInteriorImage] = useState();
  // const { currentChatBook, chatContext } = useContext(chatBookStateContext);

  useEffect(() => {
    if (bookId) {
      axios
        .get(`/api/users/:id/conversations`)
        .then((result) => {
          //get the book isbn
          const allBooks = result.data;
          const chattingBook = allBooks.find((book) => book.id === bookId);

          //query booknet with the isbn
          axios
            .get(
              `https://www.googleapis.com/books/v1/volumes?q=${chattingBook.isbn}&key=${process.env.GOOGLE_BOOK_KEY}`
            )
            .then((result) => {
              console.log("from api is", result.data.items[0].id);
              setInteriorImage(result.data.items[0].id);
            })
            .catch(() => {
              console.log("couldnt' get image");
            });

          setCurrentBook(chattingBook);
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
      <span>{interiorImage}</span>
      <img src={currentBook.image} alt={currentBook.title} />
    </div>
  );
}
