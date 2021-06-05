import React from "react";
import ChatBot from "react-simple-chatbot";
import heeeeeyReader from "../ChatBotScripts/heeeeeyReader";

export default function ChatView(props) {
  return <ChatBot steps={heeeeeyReader} hideBotAvatar={true} />;
}
