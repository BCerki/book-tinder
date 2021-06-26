import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";

// import getSample from "../helpers/getSample";
// import getSample from "../../../express-back-end/helpers/getSample";

export default function BooknetQuote(props) {
  console.log("props in booknet quote", props);
  const matchId = Number(useLocation().pathname.replace("/matches/", ""));

  const [match, setMatch] = useState();

  const [quote, setQuote] = useState();

  useEffect(() => {
    if (matchId) {
      axios
        .get(`/api/users/1/conversations`)
        .then((result) => {
          //get the book isbn
          const allMatches = result.data;
          console.log("all matches", allMatches);
          const thisMatch = allMatches.find((book) => book.id === matchId);
          setMatch(thisMatch);

          //ask the back-end to retrieve a sample
          axios
            .get(
              `/api/sample/?isbn=${thisMatch.isbn}&randomNum=${props.randomNum}`
            )
            .then((result) => {
              setQuote(result.data);
            })
            .catch((err) => console.log("Error:", err.message));
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  if (!match) {
    return <Loading />;
  }
  return <span className={"customText"}>{quote}</span>;
}
