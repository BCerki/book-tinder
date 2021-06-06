import React from "react";

export default function Info(props) {
  return (
    <div className="info">
      <div>{props.description}</div>
      <p>
        ISBN: {props.isbn} Pages: {props.pageCount} ${props.price} {props.age}{" "}
        years old
      </p>
    </div>
  );
}
