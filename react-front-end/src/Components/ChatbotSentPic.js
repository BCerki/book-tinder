import React, { useContext } from "react";
import { chatBookStateContext } from "../providers/ChatBookStateProvider";

export default function ChatbotSentPic(props) {
  const { currentChatBook, chatContext } = useContext(chatBookStateContext);
  return (
    <span>
      <img src={currentChatBook.img} alt={currentChatBook.title} />
    </span>
  );
}
