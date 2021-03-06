import Switch from "@material-ui/core/Switch";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toggleStateContext } from "../providers/ToggleStateProvider";
//Styling
import "../styles/matchesView.scss";
//import components
import BookCard from "./BookCard";
import Loading from "./Loading";
import SearchBar from "./SearchBar";
//import hooks
import useMatches from "../hooks/useMatches";

export default function MatchesView(props) {
  //Pull in state and functions from custom hook
  const { matches, setMatches } = useMatches();

  //toggle state
  const { toggle, toggleContext } = useContext(toggleStateContext);

  const handleChange = (event) => {
    toggleContext(!toggle);
  };

  const [searchTitle, setSearchTitle] = useState("");

  //may need to address setTimeout later FIX FIX
  // useEffect(() => {
  //   setTimeout(() => {
  //     axios
  //       .get("/api/users/1/conversations")
  //       .then((result) => {
  //         setMatches(result.data.reverse());
  //       })
  //       .catch((err) => {
  //         console.log("Error:", err.message);
  //       });
  //   }, 300);
  // }, []);

  const parseAge = function(date) {
    const thisYear = new Date().getFullYear();
    return thisYear - Number(date.substring(0, 4));
  };

  //FOR SEARCH BAR
  const filterMatches = () => {
    // console.log("searchTitle", searchTitle);
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
    // console.log("filtered", filteredBooks);
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

        break;
      }
    }

    const latestMessage = parseConversation[index];

    return latestMessage;
  };

  const bookCards = filterMatches().map((book) => {
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
