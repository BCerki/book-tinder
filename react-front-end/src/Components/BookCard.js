import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Info from "./Info";
import Message from "./Message";
import TitleAuthorDisplay from "./TitleAuthorDisplay";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function BookCard(props) {
  // console.log("bookcard props", props);
  //styling hook
  const classes = useStyles();
  //this file is where you're doing the conditional rendering
  //check if doing info or messages

  const checkToggle = function(toggle) {
    // console.log("props in book card", props);
    if (!toggle) {
      return (
        <Info
          key={props.isbn}
          coverImage={props.image}
          description={props.description}
          // isbn={props.isbn}
          pageCount={props.pageCount}
          price={props.price}
          age={props.age}
        />
      );
    }
    return <Message key={props.isbn} message={props.message} />;
  };

  return (
    <article className="card-skeleton" onClick={props.onClick}>
      <div className="avatar-middle">
        <Avatar
          key={props.isbn}
          src={props.coverImage}
          alt={props.title}
          className={classes.large}
        />
      </div>
      <div
        className="colum
      ns"
      >
        <div className="title-author">
          <TitleAuthorDisplay
            key={props.isbn}
            title={props.title}
            author={props.author}
          />
        </div>
        <div>{checkToggle(props.toggle)}</div>
      </div>
    </article>
  );
}
