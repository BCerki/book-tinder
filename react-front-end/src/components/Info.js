import React from "react";
//<div className="isbn">ISBN: {props.isbn}</div>
export default function Info(props) {
  return (
    <div>
      <div className="info-col">
        <div className="title-author">
          {props.title} by {props.author}
        </div>
      </div>
      <div className="second-row">
        <div className="age">Age {props.age}</div>
        <div className="page-count">{props.pageCount} pages</div>
        <div className="price">${props.price}</div>
      </div>
      <div className="third-row">
        <div className="description">{props.description}</div>
      </div>
    </div>
  );
}
