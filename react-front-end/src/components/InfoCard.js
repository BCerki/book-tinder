import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Info from "./Info";

//FIX FIX Avatar not showing up
export default function InfoCard(props) {
  return (
    <article>
      <section>
        <Avatar src={props.coverImage} alt={props.title} />
      </section>
      <section>
        <Info
          title={props.title}
          author={props.author}
          coverImage={props.coverImage}
          description={props.description}
          isbn={props.isbn}
          pageCount={props.pageCount}
          price={props.price}
          age={props.age}
        />
      </section>
    </article>
  );
}
