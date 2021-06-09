import React from "react";
import ChatBot from "react-simple-chatbot";
import booknetScripts from "../ChatBotScripts/booknetScripts";
import otherScripts from "../ChatBotScripts/otherScripts";
import _ from "lodash";
import BackBar from "./BackBar";
import ReactDOM from "react-dom";
import useLocalStorage from "react-use-localstorage";

//Styling
import "../styles/chatView.scss";

//helper function
const chooseScript = function(scripts) {
  const randomIndex = _.random(0, scripts.length - 1);
  return scripts[randomIndex];
};

export default function ChatView(props) {
  //true is a stand-in for the book currently in state
  const scripts = true ? booknetScripts : otherScripts;
  // console.log("scripts is", scripts);

  const [conversation, setConversation] = useLocalStorage(
    "rsc_cache",
    window.localStorage.rsc_cache
  );

  return (
    <>
      <BackBar className={"backBar"} />
      <ChatBot
        steps={chooseScript(scripts)}
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
