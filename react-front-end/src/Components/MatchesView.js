import React, { useState, useContext, useEffect } from "react";
import { toggleStateContext } from "../providers/ToggleStateProvider";
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
import "../styles/matchesView.scss";

export default function MatchesView(props) {
  //toggle state
  const { toggle, toggleContext } = useContext(toggleStateContext);

  const handleChange = (event) => {
    toggleContext(!toggle);
  };

  const [matches, setMatches] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    axios
      .get("/api/users/1/conversations")
      .then((result) => {
        // console.log("result.data is", result.data);
        console.log("i am loading conversations");
        setMatches(result.data.reverse());
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

    const parseConversation = JSON.parse(conversation);

    let index = null;
    for (const element of parseConversation) {
      if (element.message) {
        index = Number(element.message);
        // console.log("element is", element);
        break;
      }
    }

    const latestMessage = parseConversation[index];

    return latestMessage;
  };

  const bookCards = filterMatches().map((book) => {
    // console.log("book.id is", book.id);
    return (
      <Link to={`/matches/${book.id}`} className="bookCardLink">
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          coverImage={book.image}
          description={book.description}
          isbn={book.isbn}
          pageCount={book.page_count}
          price={book.price}
          age={parseAge(book.publish_date)}
          toggle={toggle}
          message={retrieveLatestMessage(book.message)}
        />
        {/* <hr class="solid"></hr> */}
      </Link>
    );
  });

  if (!matches) {
    return <Loading />;
  }

  return (
    <main>
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
    </main>
  );
}
