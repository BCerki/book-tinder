import React, { useContext, useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";
import booknetScripts from "../ChatBotScripts/booknetScripts";
import otherScripts from "../ChatBotScripts/otherScripts";
import testingScript from "../ChatBotScripts/testingScript";
import _ from "lodash";
import BackBar from "./BackBar";
import ReactDOM from "react-dom";
import useLocalStorage from "react-use-localstorage";
import { bookStateContext } from "../providers/BookStateProvider";
import { useLocation } from "react-router-dom";
import { chatBookStateContext } from "../providers/ChatBookStateProvider";

//Styling
import "../styles/chatView.scss";
import axios from "axios";

//helper function
const chooseScript = function(scripts) {
  const randomIndex = _.random(0, scripts.length - 1);
  return scripts[randomIndex];
};

export default function ChatView(props) {
  // const { currentBook, providerBook } = useContext(bookStateContext);

  const { currentChatBook, chatContext } = useContext(chatBookStateContext);

  const [currentBook, setCurrentBook] = useState();

  const bookId = Number(useLocation().pathname.replace("/matches/", ""));
  // console.log("bookId is", bookId);

  useEffect(() => {
    if (bookId) {
      axios
        .get(`/api/users/:id/conversations`)
        .then((result) => {
          // console.log("bookId in useeffect is", bookId);
          //this would maybe be better to grab from books/1? MICHELLE
          const allBooks = result.data;
          console.log("allBooks is", allBooks);
          // console.log("allBooks[0].id", allBooks[0].id);
          const chattingBook = allBooks.find((book) => book.id === bookId);

          console.log("chatting book in chatview is", chattingBook);

          setCurrentBook(chattingBook);

          chatContext(chattingBook);

          //do i have to use chatting book
          const scripts = currentBook.booknet_available
            ? booknetScripts
            : otherScripts;
          // console.log("scripts is", scripts);
        })
        .catch(() => {});
    }
  }, [bookId]);

  // console.log("in chat view before if current book is", currentBook);

  // const routeNumber = useLocation().pathname.replace("/books/", "");

  // if (!currentBook) {
  //   providerBook(routeNumber);
  // }
  // console.log("in chat view after if current book is", currentBook);

  const cacheName = `rsc_cache_${bookId}`;

  if (window.localStorage[cacheName]) {
    const [conversation, setConversation] = useLocalStorage(
      cacheName,
      window.localStorage[cacheName]
    );
  }
  //Make a loading component for everything later FIXFIX
  if (!currentBook) {
    return <div>loading</div>;
  }
  return (
    <>
      <BackBar
        className={"backBar"}
        image={currentBook.image}
        id={currentBook.id}
        title={currentBook.title}
      />
      <ChatBot
        // steps={chooseScript(scripts)} //for random scripts
        steps={testingScript}
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
