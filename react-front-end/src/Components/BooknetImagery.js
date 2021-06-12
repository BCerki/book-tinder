import React, { useContext, useEffect, useState } from "react";
import { chatBookStateContext } from "../providers/ChatBookStateProvider";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BOOK_TOKEN from "../.secrets";
import Loading from "./Loading";

// console.log("bookId is", bookId);

export default function BooketImagery(props) {
  console.log("props in booknet are:", props);
  const matchId = Number(useLocation().pathname.replace("/matches/", ""));

  const [match, setMatch] = useState();

  const [interiorImage, setInteriorImage] = useState();
  // const { currentChatBook, chatContext } = useContext(chatBookStateContext);

  useEffect(() => {
    if (matchId) {
      axios
        .get(`/api/users/:id/conversations`)
        .then((result) => {
          //set the match
          const allMatches = result.data;
          const thisMatch = allMatches.find((book) => book.id === matchId);
          setMatch(thisMatch);
        })
        .catch(() => {});
    }
  }, []);

  if (!match) {
    return <Loading />;
  }
  if (props.requestedInfo === "interiorImage") {
    return (
      <img
        src={`https://www.biblioshare.org/bncServices/BNCServices.asmx/DetailImages?token=${BOOK_TOKEN}&san=&ean=${match.isbn}&thumbnail=No&Perspective=back&filenumber=&maxWidth=200&maxHeight=`}
        alt={match.title}
      />
    );
  }
  if (props.requestedInfo === "backCover") {
    return <img src={"e"} alt={match.title} />;
  }
  if (props.requestedInfo === "authorPhoto") {
    return <img src={"e"} alt={match.title} />;
  }

  return <div>Sorry, I'm shy</div>;
}
