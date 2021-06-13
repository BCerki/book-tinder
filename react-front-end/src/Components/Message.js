import React from "react";

export default function Message(props) {
  console.log("props in message", props);

  //latestMessage
  const getLatestMessage = function(bookId) {};
  return <div className="second-row">{props.latestMessage}</div>;
}
