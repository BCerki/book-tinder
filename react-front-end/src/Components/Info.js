import React from "react";

export default function Info(props) {
  return (
    <div className={"infoBlock"}>
      <div className="third-row">
        <div className="description">{props.description}</div>
      </div>
      <div className="second-row">
        <div className="age">Age {props.age}</div>
        <div className="page-count">{props.pageCount} pages</div>
        <div className="price">${props.price || "??"}</div>
      </div>
    </div>
  );
}
