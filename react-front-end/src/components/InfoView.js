import React from "react";
import InfoCard from "./InfoCard";
import SearchBar from "./SearchBar";
import bookData from "../dummyData/dummyBookData";

export default function InfoView(props) {
  const handleClick = function() {};
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

  return (
    <main>
      <SearchBar />
      <section>{infoList}</section>
    </main>
  );
}
