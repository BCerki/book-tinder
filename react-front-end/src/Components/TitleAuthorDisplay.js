import React from "react";

export default function TitleAuthorDisplay(props) {
  return (
    <div>
      {props.title}
      <span className="author"> by {props.author}</span>
    </div>
  );
}
