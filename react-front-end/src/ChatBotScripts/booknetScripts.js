import React from "react";

import BooknetQuote from "../Components/BooknetQuote";
import BookManagerLocation from "../Components/BookManagerLocation";
import GoogleDescription from "../Components/GoogleDescription";

const heeeeeyReader = [
  {
    id: 1,
    message: "Heeeeey reader, ever had a novel encouter?",
    trigger: "2",
  },
  {
    id: 2,
    options: [
      {
        value: "y",
        label: "You're punny",
        trigger: "yes-response",
      },
      { value: "n", label: "No", trigger: "no-response" },
    ],
  },
  {
    id: "yes-response",
    message: "I'm good with words 🤓📚",
  },
  {
    id: "no-response",
    message: "Then you're in luck",
  },
];

const hi = [
  {
    id: 1,
    message: "Hi 😉",
  },
];

const TOC = [
  {
    id: "1",
    message: "Hi 😏",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: 1, label: "Tell me about yourself", trigger: "tell" },
      { value: 2, label: "Hi 😏", trigger: "tell" },
      { value: 3, label: "Send pix", trigger: "tell" },
    ],
  },
  {
    id: "tell",
    component: <GoogleDescription />,
    trigger: "4",
  },
  {
    id: "4",
    message: "Are you intrigued? 😉",
    trigger: "5",
  },
  {
    id: "5",
    options: [
      { value: 1, label: "Yes, tell me more", trigger: "6" },
      { value: 2, label: "No...it's not me, it's you", trigger: "6" },
    ],
  },
  {
    id: "6",
    component: <BooknetQuote randomNum={20} />,
    trigger: "7",
  },
  {
    id: "7",
    message: "Here's one of my favourite quotes 😈",
    trigger: "8",
  },
  {
    id: "8",
    options: [
      { value: 1, label: "Tell me more", trigger: "9" },
      { value: 2, label: "That's enough", trigger: "9" },
    ],
  },

  { id: "9", component: <BooknetQuote randomNum={5} /> },
];
const booknetScripts = [heeeeeyReader, hi, TOC];

export default booknetScripts;
