import React from "react";

export default function Message(props) {
  return (
    <div className="infoBlock">
      <span className={"messagePreview"}>{props.message}</span>
    </div>
  );
}
