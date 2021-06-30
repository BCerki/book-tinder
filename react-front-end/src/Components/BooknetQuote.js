import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";
import useMatches from "../hooks/useMatches";

// import getSample from "../helpers/getSample";
// import getSample from "../../../express-back-end/helpers/getSample";

export default function BooknetQuote(props) {
  const { getChattingMatch } = useMatches();
  const match = getChattingMatch();

  const [quote, setQuote] = useState();

  useEffect(() => {
    if (match) {
      //ask the back-end to retrieve a sample
      axios
        .get(`/api/sample/?isbn=${match.isbn}&randomNum=${props.randomNum}`)
        .then((result) => {
          setQuote(result.data);
          console.log("Booknet token expired, if I show up, I'm working");
        })
        .catch((err) => console.log("Error:", err.message));
    }
  }, [match]);

  if (!match) {
    return <Loading />;
  }
  return <span className={"customText"}>{quote}</span>;
}
