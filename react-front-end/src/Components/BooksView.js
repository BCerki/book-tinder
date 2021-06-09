import React, { useState, useContext } from "react";
import { bookStateContext } from "../providers/BookStateProvider";

//import components
import BookCard from "./BookCard";
import MessageCard from "./Message";

import SearchBar from "./SearchBar";
import bookData from "../dummyData/dummyBookData";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

//Styling
import "../styles/booksView.scss";

export default function BooksView(props) {
  const { providerBook } = useContext(bookStateContext);

  //functions for toggle
  const [toggle, setToggle] = useState(false);

  // const handleChange = (event) => {
  //   setToggle({ ...state, [event.target.name]: event.target.checked });
  // };

  const handleChange = (event) => {
    setToggle(!toggle);
  };
  // console.log("toggle in middle view", toggle);

  const handleClick = function(event, bookId) {
    providerBook(bookId);
    console.log("handle click fired, bookid is:", bookId);
  };

  //Create the cards for info
  const bookCards = bookData.map((book) => {
    return (
      // <Link to={`/books/${book.id}`} className="bookCardLink">
      <BookCard
        id={book.id}
        onClick={(event) => {
          handleClick(event, book.id);
        }}
        title={book.title}
        author={book.author}
        coverImage={book.coverImage}
        description={book.description}
        isbn={book.isbn}
        pageCount={book.pageCount}
        price={book.price}
        age={book.age}
        latestMessage={book.latestMessage}
        toggle={toggle}
      />
      // </Link>
    );
  });

  return (
    <>
      <section className="search-bar">
        <SearchBar />
      </section>
      <section className="toggle">
        <span className="toggle-label">Info</span>
        <Switch checked={toggle} onChange={handleChange} />
        <span className="toggle-label">Messages</span>
      </section>
      <section>{bookCards}</section>
    </>
  );
}
