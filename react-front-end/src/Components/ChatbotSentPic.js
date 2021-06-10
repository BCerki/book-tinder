import React, { useContext } from "react";
import { bookStateContext } from "../providers/BookStateProvider";

export default function ChatbotSentPic(props) {
  const { currentBook } = useContext(bookStateContext);
  return (
    <span>
      <img src={currentBook.img} alt={currentBook.title} />
    </span>
  );
}
