import React from "react";

export default function TitleAuthorDisplay(props) {
  return (
    <div>
      {props.title} by {props.author}
    </div>
  );
}
