import React from "react";
import BooknetImagery from "../Components/BooknetImagery";
import BooknetQuote from "../Components/BooknetQuote";
import BookManagerLocation from "../Components/BookManagerLocation";
import GoogleDescription from "../Components/GoogleDescription";

import axios from "axios";
import secrets from "../.secrets";

const { BOOKNET_TOKEN, GOOGLE_BOOK_KEY } = secrets;

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
      { value: 2, label: "No", trigger: "backCover" },
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

const raisingRoyalty = [
  {
    id: "1",
    message:
      "Hehe, would  you’d like to get to know me a little better on the inside?",
    trigger: "2",
  },
  {
    id: "2",
    options: [{ value: 1, label: "Yes", trigger: "3" }],
  },
  { id: "3", message: "TOC", trigger: "4" },
  {
    id: "4",
    message: "Here's a sample of my table of conquests",
    trigger: "5",
  },
  {
    id: "5",
    message: "errrr... *contents",
    trigger: "6a",
  },
  {
    id: "6a",
    options: [
      {
        value: 1,
        label:
          "That's not a very long list... are you sure you're at my reading level?",
        trigger: "6b",
      },
    ],
  },
  {
    id: "6b",
    message:
      "That's just page 1 😏. I come from good stock. Would you like to see a photo of my author?",
    trigger: "7",
  },
  { id: "7", options: [{ value: 1, label: "Yes", trigger: "8a" }] },
  {
    id: "8a",
    component: <BooknetImagery requestedInfo={"authorPhoto"} />,
    trigger: "8b",
  },
  {
    id: "8b",
    message:
      "Do you like what you've read and seen so far? Wy don’t you pick me up and we can 🤭 ... bookup?",
    trigger: "9",
  },
  {
    id: "9",
    options: [
      { value: 1, label: "😍", trigger: "10" },
      { value: 2, label: "😰", trigger: "10" },
    ],
  },
  { id: "10", component: <BookManagerLocation />, trigger: "11" },
  {
    id: "11",
    message:
      "You can pick me up here. Looking forward to feeling your bookmark between my pages. Just don’t read me too hard, or you might crack my spine 📖💋😘",
  },
];

const demoScripts = { outOfTheAttic, theForestCityKiller, raisingRoyalty };
export default demoScripts;
