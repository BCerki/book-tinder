import React from "react";
import bookData from "../dummyData/dummyBookData";
import _ from "lodash";

export default function Swipe(props) {
  const randomBook = _.shuffle(bookData)[0];
  return <img src={randomBook.coverImage} alt={randomBook.title} />;
}
