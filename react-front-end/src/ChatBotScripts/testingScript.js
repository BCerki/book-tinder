import React, { useContext } from "react";

import ChatbotSentPic from "../Components/ChatbotSentPic";
import BooknetQuote from "../Components/BooknetQuote";
import BooknetImagery from "../Components/BooknetImagery";
import ChatBookStateProvider from "../providers/ChatBookStateProvider";
// import { chatBookStateContext } from "../providers/ChatBookStateProvider";

// const { currentChatBook, chatContext } = useContext(chatBookStateContext);

const testingScript = [
  {
    id: "1",
    message: "Click yes for the materials",
    trigger: "2",
  },
  {
    id: "2",
    options: [{ value: 1, label: "yes", trigger: "3" }],
  },
  {
    id: "3",
    component: (
      <BooknetImagery
        className={"sc-gKAaRy gUoBaw rsc-ts-bubble"}
        requestedInfo={"interiorImage"}
      />
    ),
    trigger: "4",
  },
  { id: "4", message: "Click yes for a quote", trigger: "5" },
  {
    id: "5",
    options: [{ value: 1, label: "yes", trigger: "6" }],
  },
  {
    id: "6",
    component: <BooknetQuote />,
    // message: "just kidding, not ready yet",
  },
];
export default testingScript;
