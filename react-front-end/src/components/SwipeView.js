import React from "react";
import bookData from "../dummyData/dummyBookData";
import _ from "lodash";
import "../styles/swipe.scss";

export default function Swipe(props) {
  const randomBook = _.shuffle(bookData)[0];
  //set state here
  return (
    <div>
      <img
        className="cover"
        src={randomBook.coverImage}
        alt={randomBook.title}
      />
    </div>
  );
}
