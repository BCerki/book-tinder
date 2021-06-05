import React from "react";
import ChatBot from "react-simple-chatbot";

export default function ChatView(props) {
  return (
    <ChatBot
      steps={[
        {
          id: "intro",
          message: "Hello world. I am a chatbot.",
          end: true,
        },
      ]}
    />
  );
}
