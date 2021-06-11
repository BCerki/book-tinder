import React, { useContext, useEffect, useState } from "react";
import { chatBookStateContext } from "../providers/ChatBookStateProvider";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BOOK_TOKEN from "../../src/.secrets";

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
            .get()
            .then((result) => {
              console.log("result is:", result);
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
      <img
        src={`https://www.biblioshare.org/bncServices/BNCServices.asmx/DetailImages?token=${BOOK_TOKEN}&san=&ean=9781098373269&thumbnail=No&Perspective=back&filenumber=&maxWidth=200&maxHeight=`}
        alt={currentBook.title}
      />
    </div>
  );
}
