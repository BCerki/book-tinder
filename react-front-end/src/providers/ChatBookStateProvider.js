import React, { createContext, useEffect, useState } from "react";

export default function ChatBookStateProvider(props) {
  const [currentChatBook, setCurrentChatBook] = useState({});

  const chatContext = function(bookObject) {
    setCurrentChatBook(bookObject);
    console.log("i am in chatbookprovider and my object is", bookObject);
  };

  // authContext will expose these items
  const chatData = { currentChatBook, chatContext };

  // We can use this component to wrap any content we want to share this context
  return (
    <chatBookStateContext.Provider value={chatData}>
      {props.children}
    </chatBookStateContext.Provider>
  );
}

export const chatBookStateContext = createContext();
