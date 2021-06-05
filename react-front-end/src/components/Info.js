import React from "react";

export default function Info(props) {
  return (
    <div>
      <h3>
        {props.title} by {props.author}
      </h3>
      <p>{props.description}</p>
      <p>
        ISBN: {props.isbn} Pages: {props.pageCount} ${props.price} {props.age}{" "}
        years old
      </p>
    </div>
  );
}
