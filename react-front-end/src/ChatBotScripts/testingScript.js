import React, { useContext } from "react";

import ChatbotSentPic from "../Components/ChatbotSentPic";
import ChatBookStateProvider from "../providers/ChatBookStateProvider";
// import { chatBookStateContext } from "../providers/ChatBookStateProvider";

// const { currentChatBook, chatContext } = useContext(chatBookStateContext);

const testingScript = [
  {
    id: "1",
    message: "What number am I thinking?",

    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: 1, label: "Number 1", trigger: "4" },
      { value: 2, label: "Number 2", trigger: "3" },
      { value: 3, label: "Number 3", trigger: "3" },
    ],
  },
  {
    id: "3",
    component: (
      <ChatBookStateProvider>
        <ChatbotSentPic />
      </ChatBookStateProvider>
    ),
    trigger: "2",
  },
  {
    id: "4",
    message: "Awesome! You are a telepath!",
    end: true,
  },
];
export default testingScript;
