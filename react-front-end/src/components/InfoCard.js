import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import TitleAuthorDisplay from "./TitleAuthorDisplay";
import Info from "./Info";
import Grid from "@material-ui/core/Grid";
//styling
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function InfoCard(props) {
  //styling hook
  const classes = useStyles();
  return (
    <article className="info-card">
      <div className="avatar-middle">
        <Avatar
          src={props.coverImage}
          alt={props.title}
          className={classes.large}
        />
      </div>
      <div>
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
      </div>
    </article>
  );
}
