import React, { useState, useContext, useEffect } from "react";
import { bookStateContext } from "../providers/BookStateProvider";
import Loading from "./Loading";
import axios from "axios";

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
  // const { providerBook, getConversations } = useContext(bookStateContext);

  //functions for toggle
  const [toggle, setToggle] = useState(false);

  const handleChange = (event) => {
    setToggle(!toggle);
  };
  // console.log("toggle in middle view", toggle);

  // const handleClick = function(bookObject) {
  //   providerBook(bookObject);
  //   // console.log("handle click fired, bookObject is:", bookObject);
  // };

  //Create the cards for info
  //if this gives async issues, get the conversations in a useEffect hook above instead

  // const [currentBookObject, setCurrentBookObject] = useState();

  // useEffect(() => {
  //   axios
  //     .get(`/api/users/1/books`)
  //     .then((result) => {
  //       const allBooks = result.data;
  //       const bookObjectFromId = allBooks.find((book) => book.id === bookId);
  //       setCurrentBookObject(bookObjectFromId);
  //     })
  //     .catch(() => {});
  // }, []);

  //get the conversation data
  // const
  const [matches, setMatches] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    axios
      .get("/api/users/1/conversations")
      .then((result) => {
        console.log("result.data is", result.data);
        setMatches(result.data);
      })
      .catch((err) => {
        console.log("Error:", err.message);
      });
  }, []);

  const parseAge = function(date) {
    const thisYear = new Date().getFullYear();
    return thisYear - Number(date.substring(0, 4));
  };

  //FOR SEARCH BAR
  const filterMatches = () => {
    console.log("searchTitle", searchTitle);
    const filteredBooks = matches.filter((book) => {
      if (searchTitle === "") {
        return book;
      }

      const inputVal = searchTitle.toLowerCase();

      const newBook = book.title
        .toString()
        .toLowerCase()
        .includes(inputVal);
      return newBook;
    });
    console.log("filtered", filteredBooks);
    return filteredBooks;
  };

  const retrieveLatestMessage = function(conversation) {
    if (!conversation || Object.keys(conversation).length <= 2) {
      return "You're my type!";
    }
    // console.log("Object.keys(conversation)", Object.keys(conversation).length);

    // console.log("retireve message function conversation is", conversation);
    const parseConversation = JSON.parse(conversation);
    // console.log("parse conversation is", parseConversation);

    let index = null;
    for (const element of parseConversation) {
      // console.log("element is", element);
      if (element.message) {
        index = Number(element.message);
        console.log("element is", element);
        break;
      }
    }
    // console.log("index is", index);
    const latestMessage = parseConversation[index];
    // console.log("latest message is", latestMessage);
    return latestMessage;
  };

  const bookCards = filterMatches().map((book) => {
    return (
      <Link to={`/matches/${book.id}`} className="bookCardLink">
        <BookCard
          id={book.id}
          // onClick={() => {
          //   handleClick(book);
          // }}
          title={book.title}
          author={book.author}
          coverImage={book.image}
          description={book.description}
          isbn={book.isbn}
          pageCount={book.pageCount}
          price={book.price}
          age={parseAge(book.publish_date)}
          toggle={toggle}
          message={retrieveLatestMessage(book.message)}
        />
      </Link>
    );
  });

  if (!matches) {
    return <Loading />;
  }

  return (
    <>
      <section className="search-bar">
        <SearchBar
          setSearchTitle={setSearchTitle}
          searchTitle={searchTitle}
          filterMatches={filterMatches}
        />
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
