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
  let location = useLocation();
  const conversationId = Number(location.pathname.replace("/matches/", ""));
  console.log("conversationId", conversationId);

  // const [currentConversation, setCurrentConversation] = useLocalStorage(
  //   `rsc_cache_${conversationId}`,
  //   null
  // );
  const [currentMatch, setCurrentMatch] = useState({});

  // const [localStorage, setLocalStorage] = useLocalStorage(null, null);

  const [state, setState] = useState();

  //Function to change state every time a user clicks (stand-in for every time the conversation changes; the chatbot manages its own state, so I can't hook into it. If the user's going to type, we'll have to adjust)
  const hackyFunction = function() {
    setState(state + 1);
  };

  window.onclick = hackyFunction;

  useEffect(() => {
    if (conversationId) {
      axios
        .get(`/api/users/1/conversations`)
        .then((result) => {
          //set conversation state
          const allConversations = result.data;
          const thisConversation = allConversations.find(
            (conversation) => conversation.id === conversationId
          );
          setCurrentMatch(thisConversation);

          // const cacheName = `rsc_cache_${conversationId}`;

          // if (thisConversation.message) {
          //   //first arg is key, second is value (local storage stores using key-value pairs)
          //   setCurrentConversation(thisConversation.message);
          // }

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
    //on first conversation, these will all be null
    // const parsedLocalStorage = JSON.parse(
    //   window.localStorage.getItem(`rsc_cache_${conversationId}`)
    // );

    // console.log(parsedLocalStorage);

    // const mostRecentIndex = parsedLocalStorage[2].label;
    // const mostRecentMessage = parsedLocalStorage[mostRecentIndex];
    // console.log(mostRecentMessage);

    console.log("window.localStorage.getItem(`rsc_cache_${conversationId}`", {
      payload: window.localStorage.getItem(`rsc_cache_${conversationId}`),
    });
    axios

      .put(
        `/api/users/1/conversations/${conversationId}`,
        JSON.parse(window.localStorage.getItem(`rsc_cache_${conversationId}`))
      )
      .then(() => {
        console.log("successfully sent local storage to db");
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }, [state]);

  if (!currentMatch) {
    return <Loading />;
  }
  return (
    <>
      <BackBar
        className={"backBar"}
        image={currentMatch.image}
        id={currentMatch.id}
        title={currentMatch.title}
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
            trigger: "4",
          },
          {
            id: "4",
            message: "Find MEEEEEE",
          },
        ]}
        cacheName={`rsc_cache_${conversationId}`}
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
