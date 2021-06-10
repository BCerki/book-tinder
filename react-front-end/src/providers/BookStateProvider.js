import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export default function BookStateProvider(props) {
  const [currentBook, setCurrentBook] = useState({});

  // need to somehow check if current book is blocked--or is this handled by Michelle already below?

  const getConversations = function() {
    axios
      .get("/api/conversations")
      .then((result) => {
        const conversations = result.data;
        console.log("conversations from book state provider is", conversations);
      })
      .catch((err) => console.log("Error message:", err.message));
  };

  const block = function(bookId) {
    console.log(bookId);
    axios
      //MICHELLE this should add the book to the blocked table
      .post(`/api/blocked/${bookId}`, bookId)
      .then((result) => {
        console.log("in post blocked conversations, bookid is,", bookId);
      })
      .catch((err) => console.log("Error message:", err.message));

    axios
      //MICHELLE this should delete the book from the conversations table
      .delete(`/api/conversations/${bookId}`, bookId)
      .then((result) => {
        console.log("in delete conversations, bookid is,", bookId);
      })
      .catch((err) => console.log("Error message:", err.message));
  };

  const providerBook = function(bookObject) {
    setCurrentBook(bookObject);
    console.log("i am in providerBook function");
  };

  // authContext will expose these items
  const bookData = {
    currentBook,
    setCurrentBook,
    block,
    providerBook,
    getConversations,
  };

  // We can use this component to wrap any content we want to share this context
  return (
    <bookStateContext.Provider value={bookData}>
      {props.children}
    </bookStateContext.Provider>
  );
}

export const bookStateContext = createContext();
