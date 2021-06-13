import React, { useEffect, useState, useContext } from "react";
import ChatBot from "react-simple-chatbot";
import booknetScripts from "../ChatBotScripts/booknetScripts";
import otherScripts from "../ChatBotScripts/otherScripts";
import testingScript from "../ChatBotScripts/testingScript";
import _ from "lodash";
import BackBar from "./BackBar";
import Loading from "./Loading";

import useLocalStorage from "react-use-localstorage";

import { useLocation } from "react-router-dom";

//Styling
import "../styles/chatView.scss";
import axios from "axios";

//bookmanager
import BookManagerLocation from "./BookManagerLocation";

//helper function
const chooseScript = function(scripts) {
  const randomIndex = _.random(0, scripts.length - 1);
  return scripts[randomIndex];
};

export default function ChatView(props) {
  const [currentConversation, setCurrentConversation] = useState();

  const [state, setState] = useState();

  //Function to change state every time a user clicks (stand-in for every time the conversation changes; the chatbot manages its own state, so I can't hook into it. If the user's going to type, we'll have to adjust)
  const hackyFunction = function() {
    setState(state + 1);
  };

  window.onclick = hackyFunction;

  const conversationId = Number(
    useLocation().pathname.replace("/matches/", "")
  );

  useEffect(() => {
    if (conversationId) {
      axios
        .get(`/api/users/:id/conversations`)
        .then((result) => {
          //set conversation state
          const allConversations = result.data;
          const thisConversation = allConversations.find(
            (conversation) => conversation.id === conversationId
          );
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

  //Send to DB every time the user clicks
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
  }, [state]);

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
        steps={[
          {
            id: "1",
            message: "Click yes for the date",
            trigger: "2",
          },
          {
            id: "2",
            options: [{ value: 1, label: "yes", trigger: "3" }],
          },
          {
            id: "3",
            component: <BookManagerLocation />,
          },
        ]}
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
