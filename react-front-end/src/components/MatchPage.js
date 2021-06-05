import React from "react";
import Avatar from "@material-ui/core/Avatar";
import MessageCard from "./Message";

export default function MatchPage(props) {
  const handleClick = function() {};
  const messagesArray = ["preview message"];
  const messagesList = messagesArray.map((message) => {
    return (
      <MessageCard onClick={handleClick} coverImage={true} content={message} />
    );
  });

  return (
    <main>
      <section>search bar</section>
      <section>{messagesList}</section>
    </main>
  );
}
