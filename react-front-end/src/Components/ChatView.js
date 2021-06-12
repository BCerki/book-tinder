import React, { useContext, useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";
import booknetScripts from "../ChatBotScripts/booknetScripts";
import otherScripts from "../ChatBotScripts/otherScripts";
import testingScript from "../ChatBotScripts/testingScript";
import _ from "lodash";
import BackBar from "./BackBar";
import Loading from "./Loading";
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
          //set currentBook state
          const allBooks = result.data;
          const chattingBook = allBooks.find((book) => book.id === bookId);
          //does this even matter? I don't think I care about state except for messages
          setCurrentBook(chattingBook);

          const cacheName = `rsc_cache_${bookId}`;

          if (chattingBook.message) {
            //first arg is key, second is value (local storage stores using key-value pairs)
            useLocalStorage(cacheName, chattingBook.message);
          }

          const scripts = chattingBook.booknet_available
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

  //COMMENT THESE IN AND OUT IF DB DOWN

  // if (window.localStorage[cacheName]) {
  //   const [conversation, setConversation] = useLocalStorage(
  //     cacheName,
  //     window.localStorage[cacheName]
  //   );
  // }

  //what is the change handler for the chatbot? this is currently only firing on the first render
  useEffect(() => {
    console.log(
      "sending this to db:",
      window.localStorage.getItem(`rsc_cache_${bookId}`)
    );
    axios
      //do I need to JSON parse this?
      .put(
        `/api/users/:id/conversations/${bookId}`,
        window.localStorage.getItem(`rsc_cache_${bookId}`)
      )
      .then(() => {
        console.log("successfully sent local storage to db");
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }, []);

  if (!currentBook) {
    return <Loading />;
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
        cacheName={`rsc_cache_${currentBook.id}`}
        cache={true}
        hideBotAvatar={true}
        hideUserAvatar={true}
        hideHeader={true}
        botAvatar={"from state"}
        userAvatar={"from user api, hardcode in"}
      />
    </>
  );
}
