import React from "react";

export default function Message(props) {
  console.log("props in message", props);
  return (
    <div className="second-row">
      <p>{props.latestMessage}</p>
    </div>
  );
}