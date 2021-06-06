import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import TitleAuthorDisplay from "./TitleAuthorDisplay";
import Info from "./Info";
import Message from "./Message";
import Grid from "@material-ui/core/Grid";
//styling
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function BookCard(props) {
  //styling hook
  const classes = useStyles();
  //this file is where you're doing the conditional rendering
  //check if doing info or messages
  const checkToggle = function(state) {
    if (state) {
      return (
        <Info
          coverImage={props.coverImage}
          description={props.description}
          isbn={props.isbn}
          pageCount={props.pageCount}
          price={props.price}
          age={props.age}
        />
      );
    }
    return <Message message={props.message} />;
  };

  return (
    <article className="card-skeleton">
      <div className="avatar-middle">
        <Avatar
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
          <TitleAuthorDisplay title={props.title} author={props.author} />
        </div>
        <div>{checkToggle(true)}</div>
      </div>
    </article>
  );
}
