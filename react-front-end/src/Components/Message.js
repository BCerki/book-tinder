import React from "react";

export default function Message(props) {
  // console.log("props in message", props);

  return (
    <div className="infoBlock">
      <span className={"messagePreview"}>{props.message}</span>
    </div>
  );
}
