import React, { useContext } from "react";
import { chatBookStateContext } from "../providers/ChatBookStateProvider";

export default function ChatbotSentPic(props) {
  const { currentChatBook, chatContext } = useContext(chatBookStateContext);

  console.log("currentChatBook in chatbotsentpic is:", currentChatBook);
  return (
    <span>
      currentChatBook img is:
      <img src={currentChatBook.image} alt={currentChatBook.title} />
    </span>
  );
}
