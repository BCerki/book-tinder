import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Message from "./Message";

//FIX FIX Avatar not showing up
export default function MessageCard(props) {
  return (
    <article>
      <section>
        <Avatar src={props.coverImage} alt={props.title} />
      </section>
      <section>
        <Message title={props.title} message={props.message} />
      </section>
    </article>
  );
}
