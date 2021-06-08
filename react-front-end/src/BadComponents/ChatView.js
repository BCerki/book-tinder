import React from "react";
import ChatBot from "react-simple-chatbot";
import booknetScripts from "../ChatBotScripts/booknetScripts";
import otherScripts from "../ChatBotScripts/otherScripts";
import _ from "lodash";

//helper function
const chooseScript = function(scripts) {
  const randomIndex = _.random(0, scripts.length - 1);
  return scripts[randomIndex];
};

export default function ChatView(props) {
  //true is a stand-in for the book currently in state
  const scripts = true ? booknetScripts : otherScripts;
  console.log("scripts is", scripts);

  return (
    <ChatBot
      steps={chooseScript(scripts)}
      // hideBotAvatar={true}
      // hideUserAvatar={true}
      botAvatar={"from state"}
      userAvatar={"from user api, hardcode in"}
    />
  );
}
