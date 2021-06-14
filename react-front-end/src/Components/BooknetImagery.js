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
        .get(`/api/users/1/conversations`)
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
        src={`https://www.biblioshare.org/bncServices/BNCServices.asmx/DetailImages?token=${BOOK_TOKEN}&san=&ean=${match.isbn}&thumbnail=false&Perspective=interior&FileNumber=&maxWidth=300&maxHeight=`}
        alt={match.title}
      />
    );
  }
  if (props.requestedInfo === "backCover") {
    return (
      <img
        src={`https://www.biblioshare.org/bncServices/BNCServices.asmx/DetailImages?token=${BOOK_TOKEN}&san=&ean=${match.isbn}&thumbnail=no&Perspective=back&filenumber=&maxWidth=300&maxHeight=`}
        alt={match.title}
      />
    );
  }
  // In Postman author photo "resource cannot be found" - might be permanent error
  if (props.requestedInfo === "authorPhoto") {
    return (
      <img
        src={`https://www.biblioshare.org/bncServics/BNCServices.asmx/DetailImages?Token=${BOOK_TOKEN}&EAN=${match.isbn}=&Thumbnail=false&Perspective=author&FileNumber=&maxWidth=&maxHeight=300`}
        alt={match.title}
      />
    );
  }
  // Note: Requesting teachers guide will return a PDF (if one exists)
  if (props.requestedInfo === "teachersGuide") {
    return (
      <img
        src={`https://www.biblioshare.ca/BNCServices/BNCServices.asmx/Samples?token=${BOOK_TOKEN}&ean={match.isbn}&san=&perspective=teachersguide&filenumber=`}
        alt={match.title}
      />
    );
  }
  // Note: Requesting table of contents will return a PDF (if one exists)
  if (props.requestedInfo === "toc") {
    return (
      <img
        src={`https://www.biblioshare.ca/BNCServices/BNCServices.asmx/Samples?token=${BOOK_TOKEN}&ean=${match.isbn}&san=&perspective=toc&filenumber=`}
        alt={match.title}
      />
    );
  }

  // This is here as a backup alternate cover photo source. Note: In Postman could get max width parameter to accept
  // if (props.requestedInfo === "coverPhoto") {
  //   return (
  //     <img
  //       src={`https://www.biblioshare.org/BNCServices/BNCServices.asmx/Images?Token=${BOOK_TOKEN}&EAN=${match.isbn}&SAN=&Thumbnail=false`}
  //       alt={match.title}
  //     />
  //   );
  // }

  return <div>Sorry, I'm shy</div>;
}
