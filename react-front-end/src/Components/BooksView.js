import React, { useState, useContext } from "react";
import { bookStateContext } from "../providers/BookStateProvider";

//import components
import BookCard from "./BookCard";
import MessageCard from "./Message";
import bookData from "../dummyData/dummyBookData";
import SearchBar from "./SearchBar";

import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

//Styling
import "../styles/booksView.scss";

export default function BooksView(props) {
  //functions for book state
  const { providerBook, getConversations } = useContext(bookStateContext);

  //functions for toggle
  const [toggle, setToggle] = useState(false);

  //Search Filter:
  const [filter, setFilter] = useState('');
  
  const handleSearchChange = (event) => {
    setFilter(event.target.value);
  };


  // const handleChange = (event) => {
  //   setToggle({ ...state, [event.target.name]: event.target.checked });
  // };

  const handleChange = (event) => {
    setToggle(!toggle);
  };
  // console.log("toggle in middle view", toggle);

  const handleClick = function(bookObject) {
    providerBook(bookObject);
    // console.log("handle click fired, bookObject is:", bookObject);
  };

  //Create the cards for info
  //if this gives async issues, get the conversations in a useEffect hook above instead

  //use this once the conversations endpint is up and running
  // const bookCards = getConversations().map((book) => {
  const bookCards = bookData.map((book) => {
    console.log("book data", bookData[0].title);
    for (const book of bookData) {

    }
      console.log("two", book.title);
    return (
      <Link to={`matches/${book.id}`} className="bookCardLink">
        <BookCard
          id={book.id}
          onClick={() => {
            handleClick(book);
          }}
          title={book.title}
          author={book.author}
          coverImage={book.image}
          description={book.description}
          isbn={book.isbn}
          pageCount={book.pageCount}
          price={book.price}
          age={book.age}
          latestMessage={book.latestMessage}
          toggle={toggle}
        />
      </Link>
    );
  });

  return (
    <>
      <section className="search-bar">
        <TextField 
        onChange={handleSearchChange}
        label="Search"
        variant="standard"
        />
        {/* <SearchBar /> */}
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
