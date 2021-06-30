import React, { useContext } from "react";

import ChatbotSentPic from "../Components/ChatbotSentPic";
import GoogleDescription from "../Components/GoogleDescription";
import BooknetQuote from "../Components/BooknetQuote";
import BooknetImagery from "../Components/BooknetImagery";

const testingScript = [
  {
    id: "a",
    message: "Click yes for the booknet quote",
    trigger: "b",
  },
  {
    id: "b",
    options: [{ value: 1, label: "yes", trigger: "c" }],
  },
  {
    id: "c",
    component: (
      <BooknetQuote
        className={"sc-gKAaRy gUoBaw rsc-ts-bubble"}
        requestedInfo={"interiorImage"}
      />
    ),
    trigger: "1",
  },

  {
    id: "1",
    message: "Click yes for the back cover image",
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
  {
    id: "4",
    message: "Click yes for the book description from google",
    trigger: "5",
  },
  {
    id: "5",
    options: [{ value: 1, label: "yes", trigger: "6" }],
  },
  {
    id: "6",
    component: <GoogleDescription />,
    // message: "just kidding, not ready yet",
  },
];
export default testingScript;
