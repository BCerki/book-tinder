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

const raisingRoyalty = [
  {
    id: "1",
    message:
      "Hehe, would  you’d like to get to know me a little better on the inside?",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: 1, label: "Yes", trigger: "3" },
      { value: 2, label: "Uhhh...", trigger: "3a" },
    ],
  },
  {
    id: "3a",
    message: "If you don't like puns, I don't think this is going to work",
  },
  {
    id: "3",
    message: "This is one of my favourite quotes:",
    trigger: "4",
  },
  {
    id: "4",
    component: <BooknetQuote randomNum={20} />,
    trigger: "5",
  },
  {
    id: "5",
    options: [
      { value: 1, label: "Tell me more", trigger: "6b" },
      { value: 2, label: "I question your taste" },
    ],
  },

  {
    id: "6b",
    message:
      "I come from good stock 😏 Would you like to see a photo of my author?",
    trigger: "7",
  },
  {
    id: "7",
    options: [
      { value: 1, label: "Yes", trigger: "8a" },
      { value: 2, label: "No thanks", trigger: "8c" },
    ],
  },
  {
    id: "8a",
    component: <BooknetImagery requestedInfo={"authorPhoto"} />,
    trigger: "8b",
  },
  {
    id: "8c",
    message: "It's not me, it's you",
  },
  {
    id: "8b",
    message:
      "Do you like what you've read and seen so far? Why don’t you pick me up and we can 🤭 ... bookup?",
    trigger: "9",
  },
  {
    id: "9",
    options: [
      { value: 1, label: "😍", trigger: "10" },
      { value: 2, label: "😰", trigger: "10a" },
    ],
  },
  { id: "10", component: <BookManagerLocation />, trigger: "11" },
  {
    id: "10a",
    message:
      "Am I coming on too strong? At least you can't accuse me of being spineless 😉",
    trigger: "11a",
  },
  {
    id: "11",
    message:
      "You can pick me up here. Looking forward to feeling your bookmark between my pages. Just don’t read me too hard, or you might crack my spine 📖💋😘",
  },
  { id: "11a", message: "Are you still there????" },
];

const demoScripts = { outOfTheAttic, raisingRoyalty };
export default demoScripts;
