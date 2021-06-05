import React from "react";
import MessageCard from "./Message";
import SearchBar from "./SearchBar";
import bookData from "../dummyData/dummyBookData";

export default function InfoView(props) {
  const handleClick = function() {};
  const infoList = bookData.map((book) => {
    return (
      <article>
        <MessageCard
          id={book.id}
          onClick={handleClick}
          title={book.title}
          coverImage={book.coverImage}
          price={book.price}
        />
      </article>
    );
  });

  return (
    <main>
      <SearchBar />
      <section>{infoList}</section>
    </main>
  );
}
