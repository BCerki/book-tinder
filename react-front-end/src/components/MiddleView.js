import React from "react";
import InfoCard from "./InfoCard";
import MessageCard from "./Message";

import SearchBar from "./SearchBar";
import bookData from "../dummyData/dummyBookData";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function InfoView(props) {
  const handleClick = function() {};
  //Create the cards for info
  const infoList = bookData.map((book) => {
    return (
      <article>
        <InfoCard
          id={book.id}
          onClick={handleClick}
          title={book.title}
          author={book.author}
          coverImage={book.coverImage}
          description={book.description}
          isbn={book.isbn}
          pageCount={book.pageCount}
          price={book.price}
          age={book.age}
        />
      </article>
    );
  });
  //Create the cards for messages
  const messagesList = bookData.map((book) => {
    return (
      <article>
        <MessageCard
          id={book.id}
          onClick={handleClick}
          title={book.title}
          coverImage={book.coverImage}
          latestMessage={book.latestMessage}
        />
      </article>
    );
  });

  //functions for toggle
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <main>
      <SearchBar />
      <section>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Info</Grid>
          <Grid item>
            <Switch
              checked={state.checkedC}
              onChange={handleChange}
              name="checkedC"
            />
          </Grid>
          <Grid item>Messages</Grid>
        </Grid>
      </section>
      <section>{infoList}</section>
    </main>
  );
}
