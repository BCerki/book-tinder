import classNames from "classnames";
import React from "react";
export default function GenreChip(props) {
  const chipClass = classNames(
    { selected: props.selected },
    { deselected: !props.selected }
  );
  return (
    <div className={chipClass} onClick={props.onClick}>
      <span className="chipText">{props.id}</span>
    </div>
  );
}
