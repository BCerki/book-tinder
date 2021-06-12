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
  const { currentChatBook, chatContext } = useContext(chatBookStateContext);

  const [currentConversation, setCurrentConversation] = useState();

  const conversationId = Number(
    useLocation().pathname.replace("/matches/", "")
  );

  useEffect(() => {
    if (conversationId) {
      axios
        .get(`/api/users/:id/conversations`)
        .then((result) => {
          //set currentBook state
          const allConversations = result.data;
          const thisConversation = allConversations.find(
            (conversation) => conversation.id === conversationId
          );
          //does this even matter? I don't think I care about state except for messages
          setCurrentConversation(thisConversation);

          const cacheName = `rsc_cache_${conversationId}`;

          if (thisConversation.message) {
            //first arg is key, second is value (local storage stores using key-value pairs)
            useLocalStorage(cacheName, thisConversation.message);
          }

          const scripts = thisConversation.booknet_available
            ? booknetScripts
            : otherScripts;
        })
        .catch(() => {});
    }
  }, [conversationId]);

  //what is the change handler for the chatbot? this is currently only firing on the first render
  useEffect(() => {
    console.log(
      "sending this to db:",
      window.localStorage.getItem(`rsc_cache_${conversationId}`)
    );
    console.log(
      "typeof cache is",
      typeof window.localStorage.getItem(`rsc_cache_${conversationId}`)
    );
    axios
      //do I need to JSON parse this?
      .put(
        `/api/users/:id/conversations/${conversationId}`,
        window.localStorage.getItem(`rsc_cache_${conversationId}`)
      )
      .then(() => {
        console.log("successfully sent local storage to db");
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }, []);

  if (!currentConversation) {
    return <Loading />;
  }
  return (
    <>
      <BackBar
        className={"backBar"}
        image={currentConversation.image}
        id={currentConversation.id}
        title={currentConversation.title}
      />
      <ChatBot
        // steps={chooseScript(scripts)} //for random scripts
        steps={testingScript}
        cacheName={`rsc_cache_${currentConversation.id}`}
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
