import React from "react";
import MessageCard from "./Message";
import SearchBar from "./SearchBar";
import bookData from "../dummyData/dummyBookData";

export default function MatchPage(props) {
  const handleClick = function() {};
  console.log("book data is", bookData);
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

  return (
    <main>
      <SearchBar />
      <section>{messagesList}</section>
    </main>
  );
}
