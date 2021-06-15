import _ from "lodash";

const sendPix = function() {
  const resultsArray = [];
  const end = 5;
  for (let i = 1; i < end; i++) {
    const delay = _.random(1000, 5000);
    resultsArray.push({
      id: `${i}`,
      message: "send pix",
      botDelay: delay, //not working, invalid key?
      trigger: `${i + 1}`,
    });
  }
  resultsArray.push({ id: `${end}`, message: "send pix", end: true });
  return resultsArray;
};

const heeeeeeyreader = [{ id: "1", message: "Heeeeeeeeeeey, bookworm 😘" }];

const endsheets = [
  {
    id: "1",
    message: "Maybe we could end the night between my endsheets? 📖💓📖",
  },
];
const library = [
  {
    id: "1",
    message:
      "Tired of borrowing books at the library? Want to check out something fresh and novel?",
  },
];
const chapter = [
  {
    id: "1",
    message: "Hey reader, interested in starting a new chapter together?",
  },
];
const covers = [
  {
    id: "1",
    message:
      "Well hello bibliophile, want to join me between my covers? 📕💞📕",
  },
];
const romancingTheTome = [
  {
    id: "1",
    message: "How would you feel about romancing the tome with me?",
  },
];
const allBooks = [{ id: "1", message: "I bet you say that to all the books" }];

const store = [
  {
    id: "1",
    message: "I bet you think there's probably plenty of books in the store",
  },
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
