import BooknetImagery from "../Components/BooknetImagery";
import BooknetQuote from "../Components/BooknetQuote";
import React from "react";

const getLongDescription = function() {
  return "placeholder";
};

const outOfTheAttic = [
  {
    id: "1",
    message:
      "Hey there, cover lover. Appears you’re looking for a novel encounter. You’ve seen my front cover. Maybe you’d like to see me...from behind? 😉",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: 1, label: "Yes", trigger: "backCover" },
      { value: 2, label: "No", trigger: "no" },
    ],
  },
  {
    id: "backCover",
    component: <BooknetImagery requestedInfo={"backCover"} />,
    trigger: "3",
  },
  {
    id: "3",
    message: "What do you think of my paperback? I've been working out ",
  },
];
const theForestCityKiller = [
  {
    id: "1",
    message: "Hi 😏",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: 1, label: "Tell me about yourself", trigger: "tell" },
      { value: 2, label: "Hi 😏", trigger: "hi" },
      { value: 3, label: "Send pix", trigger: "pix" },
    ],
  },
  {
    id: "tell",
    message: getLongDescription(),
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
      { value: 1, label: "yes, tell me more", trigger: "more" },
      { value: 2, label: "It's not me, it's you", trigger: "" },
    ],
    trigger: "6",
  },
  {
    id: "6",
    component: <BooknetQuote />,
    trigger: "7",
  },
  {
    id: "7",
    message: "Here's one of my favourite quotes 😈",
    trigger: "8",
  },
];
const allTheLeavings = [
  {
    id: "1",
    message: "Hi 😏",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: 1, label: "Tell me about yourself", trigger: "tell" },
      { value: 2, label: "Hi 😏", trigger: "hi" },
      { value: 3, label: "Send pix", trigger: "pix" },
    ],
  },
  {
    id: "tell",
    message: getLongDescription(),
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
      { value: 1, label: "yes, tell me more", trigger: "more" },
      { value: 2, label: "It's not me, it's you", trigger: "" },
    ],
    trigger: "6",
  },
  {
    id: "6",
    component: <BooknetQuote />,
    trigger: "7",
  },
  {
    id: "7",
    message: "Here's one of my favourite quotes 😈",
    trigger: "8",
  },
];

const demoScripts = { outOfTheAttic, theForestCityKiller, allTheLeavings };

export default demoScripts;
