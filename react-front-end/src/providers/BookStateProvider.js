import React, { createContext, useState } from "react";
import axios from "axios";

export default function BookStateProvider(props) {
  const [currentBook, setCurrentBook] = useState({});

  //need to somehow check if current book is blocked

  const block = function(bookId) {
    axios
      //this should remove book from conversations table
      .put(`/api/blocked/${bookId}`)
      .then((result) => {
        console.log("all is well");
      })
      .catch((err) => console.log("Error message:", err.message));
  };

  const providerBook = function(bookObject) {
    setCurrentBook(bookObject);
    console.log("i am in providerBook function");
  };

  // authContext will expose these items
  const bookData = { currentBook, setCurrentBook, block, providerBook };

  // We can use this component to wrap any content we want to share this context
  return (
    <bookStateContext.Provider value={bookData}>
      {props.children}
    </bookStateContext.Provider>
  );
}

export const bookStateContext = createContext();
