import _ from "lodash";
import React from "react";
import BookManagerLocation from "../Components/BookManagerLocation";

const sendPix = function() {
  const resultsArray = [];
  const end = 9;
  for (let i = 1; i < end; i++) {
    const delay = _.random(1000, 5000);
    resultsArray.push({
      id: `${i}`,
      message: "send pix",
      trigger: `${i + 1}`,
    });
  }
  resultsArray.push({ id: `${end}`, message: "i give up", end: true });
  return resultsArray;
};

const heeeeeeyreader = [
  { id: "1", message: "Heeeeeeeeeeey, bookworm 😘", trigger: "2" },
  {
    id: "2",
    options: [
      {
        value: "y",
        label: "You're punny",
        trigger: "yes-response",
      },
      { value: "n", label: "Hey...", trigger: "no-response" },
    ],
  },
  {
    id: "yes-response",
    message: "I'm good with words 🤓📚",
  },
  {
    id: "no-response",
    message: "💓",
  },
];

const endsheets = [
  {
    id: "1",
    message: "Maybe we could end the night between my endsheets? 📖💓📖",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      {
        value: "y",
        label: "Teehee",
        trigger: "yes-response",
      },
      {
        value: "n",
        label: "I don't know what an endsheet is",
        trigger: "no-response",
      },
    ],
  },
  {
    id: "yes-response",
    message: " 😘 Meet me here later",
    trigger: "date",
  },
  { id: "date", component: <BookManagerLocation /> },
  {
    id: "no-response",
    message: "This is over",
  },
];
const library = [
  {
    id: "1",
    message:
      "Tired of borrowing books at the library? Want to check out something fresh and novel?",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      {
        value: "y",
        label: "I like novel",
        trigger: "yes-response",
      },
      {
        value: "n",
        label: "I hate change",
      },
    ],
  },
  {
    id: "yes-response",
    message: "Then you'll love me",
  },
];
const chapter = [
  {
    id: "1",
    message: "Hey reader, interested in starting a new chapter together?",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      {
        value: "y",
        label: "Sure",
        trigger: "yes-response",
      },
      {
        value: "n",
        label: "I'm more of a picture book person",
        trigger: "no-response",
      },
    ],
  },
  {
    id: "yes-response",
    message: "You can pick me up here",
    trigger: "date",
  },
  { id: "date", component: <BookManagerLocation /> },
  {
    id: "no-response",
    message: "Goodbye",
  },
];
const covers = [
  {
    id: "1",
    message:
      "Well hello bibliophile, want to join me between my covers? 📕💞📕",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      {
        value: "y",
        label: "Haven't heard that one before",
        trigger: "yes-response",
      },
      {
        value: "n",
        label: "No",
      },
    ],
  },
  {
    id: "yes-response",
    message: "There's more where that came from 😉",
    trigger: "date",
  },
  { id: "date", component: <BookManagerLocation /> },
];
const romancingTheTome = [
  {
    id: "1",
    message: "How would you feel about romancing the tome with me?",
  },
];
const allBooks = [
  { id: "1", message: "I bet you say that to all the books", trigger: "2" },
  {
    id: "2",
    options: [
      {
        value: "y",
        label: "I think you're in the wrong convo",
        trigger: "yes-response",
      },
      { value: "n", label: "Heeeeeeeey", trigger: "no-response" },
    ],
  },
  {
    id: "yes-response",
    message: "Oops",
  },
  {
    id: "no-response",
    message: "💓",
  },
];

const store = [
  {
    id: "1",
    message: "I bet you think there's probably plenty of books in the store",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      {
        value: "y",
        label: "You seem special",
        trigger: "yes-response",
      },
      { value: "n", label: "Yup, plenty of books" },
    ],
  },
  {
    id: "yes-response",
    message: "I AM special. 😉 Meet me here to find out my secrets",
    trigger: "date",
  },
  { id: "date", component: <BookManagerLocation /> },
];

const otherScripts = [
  sendPix(),
  heeeeeeyreader,
  endsheets,
  library,
  chapter,
  covers,
  romancingTheTome,
  allBooks,
  store,
];

export default otherScripts;

// {
//   id: "4",
//   message: "Here's a sample of my table of conquests",
//   trigger: "5",
// },
// {
//   id: "5",
//   message: "errrr... *contents",
//   trigger: "6a",
// },
// {
//   id: "6a",
//   options: [
//     {
//       value: 1,
//       label:
//         "That's not a very long list... are you sure you're at my reading level?",
//       trigger: "6b",
//     },
//   ],
// },
