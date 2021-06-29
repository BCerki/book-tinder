import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import secrets from "../.secrets";
import useMatches from "../hooks/useMatches";
import Loading from "./Loading";
const { BOOKNET_TOKEN, GOOGLE_BOOK_KEY } = secrets;

export default function GoogleDescription(props) {
  const { getChattingMatch } = useMatches();
  const match = getChattingMatch();
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (match) {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${match.isbn}&key=${GOOGLE_BOOK_KEY}`
        )
        .then((response) => {
          const longDescription = response.data.items[0].volumeInfo.description;

          setDescription(longDescription);
        })

        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [match]);
  if (!match) {
    return <Loading />;
  }
  return <span className={"customText"}>{description}</span>;
}
