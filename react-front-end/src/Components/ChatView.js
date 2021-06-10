import React, { useContext } from "react";
import ChatBot from "react-simple-chatbot";
import booknetScripts from "../ChatBotScripts/booknetScripts";
import otherScripts from "../ChatBotScripts/otherScripts";
import _ from "lodash";
import BackBar from "./BackBar";
import ReactDOM from "react-dom";
import useLocalStorage from "react-use-localstorage";
import { bookStateContext } from "../providers/BookStateProvider";
import { useLocation } from "react-router-dom";

//Styling
import "../styles/chatView.scss";

//helper function
const chooseScript = function(scripts) {
  const randomIndex = _.random(0, scripts.length - 1);
  return scripts[randomIndex];
};

export default function ChatView(props) {
  const { currentBook, providerBook } = useContext(bookStateContext);

  console.log("in chat view before if current book is", currentBook);

  const routeNumber = useLocation().pathname.replace("/books/", "");

  if (!currentBook) {
    providerBook(routeNumber);
  }
  console.log("in chat view after if current book is", currentBook);

  //true is a stand-in currentBook.booknet
  const scripts = true ? booknetScripts : otherScripts;
  // console.log("scripts is", scripts);

  //1 is a stand-in for currentBook.id
  const cacheName = `rsc_cache_${currentBook.id}`;

  if (window.localStorage[cacheName]) {
    const [conversation, setConversation] = useLocalStorage(
      cacheName,
      window.localStorage[cacheName]
    );
  }

  return (
    <>
      <BackBar className={"backBar"} />
      <ChatBot
        // steps={chooseScript(scripts)} //for random scripts
        steps={booknetScripts[0]}
        cacheName={cacheName}
        cache={true}
        hideBotAvatar={true}
        hideUserAvatar={true}
        hideHeader={true}
        headerTitle={"this will be from the state"}
        botAvatar={"from state"}
        userAvatar={"from user api, hardcode in"}
      />
    </>
  );
}
