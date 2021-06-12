import React from "react";
//<div className="isbn">ISBN: {props.isbn}</div>

import classNames from "classnames";
export default function GenreChip(props) {
  const chipClass = classNames(
    { selected: props.selected },
    { deselected: props.selected }
  );
  return (
    <div className={chipClass} onClick={props.onClick}>
      {props.id}
    </div>
  );
}
