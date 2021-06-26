import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import secrets from "../.secrets";
const { BOOKNET_TOKEN, GOOGLE_BOOK_KEY } = secrets;

export default function GoogleDescription(props) {
  const matchId = Number(useLocation().pathname.replace("/matches/", ""));
  const [description, setDescription] = useState("");

  const [match, setMatch] = useState();

  useEffect(() => {
    if (matchId) {
      axios
        .get(`/api/users/1/conversations`)
        .then((result) => {
          //set the match
          const allMatches = result.data;
          const thisMatch = allMatches.find((book) => book.id === matchId);
          setMatch(thisMatch);

          axios
            .get(
              `https://www.googleapis.com/books/v1/volumes?q=isbn:${thisMatch.isbn}&key=${GOOGLE_BOOK_KEY}`
            )
            .then((response) => {
              const longDescription =
                response.data.items[0].volumeInfo.description;

              setDescription(longDescription);
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return <span className={"customText"}>{description}</span>;
}
