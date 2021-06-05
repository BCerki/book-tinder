import React from "react";

export default function Message(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.latestMessage}</p>
    </div>
  );
}
