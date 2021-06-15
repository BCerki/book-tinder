import React, { createContext, useEffect, useState } from "react";

export default function ToggleStateProvider(props) {
  const [toggle, setToggle] = useState({});

  const toggleContext = function(setting) {
    setToggle(setting);
    // console.log("i am in chatbookprovider and my object is", bookObject);
  };

  // authContext will expose these items
  const chatData = { toggle, toggleContext };

  // We can use this component to wrap any content we want to share this context
  return (
    <toggleStateContext.Provider value={chatData}>
      {props.children}
    </toggleStateContext.Provider>
  );
}

export const toggleStateContext = createContext();
