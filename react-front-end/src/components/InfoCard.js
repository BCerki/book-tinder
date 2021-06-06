import React from "react";
import Avatar from "@material-ui/core/Avatar";
import TitleAuthorDisplay from "./TitleAuthorDisplay";
import Info from "./Info";
import Grid from "@material-ui/core/Grid";

//FIX FIX Avatar not showing up
export default function InfoCard(props) {
  return (
    <article className="info-card">
      <div className="top-row">
        <div className="avatar-middle">
          <Avatar src={props.coverImage} alt={props.title} />
        </div>
        <div className="title-author-display">
          <TitleAuthorDisplay title={props.title} author={props.author} />
        </div>
      </div>
      <div>
        <Info
          coverImage={props.coverImage}
          description={props.description}
          isbn={props.isbn}
          pageCount={props.pageCount}
          price={props.price}
          age={props.age}
        />
      </div>
    </article>
  );
}
