import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Info from "./Info";
import Grid from "@material-ui/core/Grid";

//FIX FIX Avatar not showing up
export default function InfoCard(props) {
  return (
    <article>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>
          <Avatar src={props.coverImage} alt={props.title} />
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    </article>
  );
}
