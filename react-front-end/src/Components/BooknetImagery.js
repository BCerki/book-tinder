import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import secrets from "../.secrets";
import Loading from "./Loading";

const { BOOKNET_TOKEN, GOOGLE_BOOK_KEY } = secrets;

// console.log("bookId is", bookId);

export default function BooketImagery(props) {
  console.log("BOOK_NET TOKEN is:", BOOKNET_TOKEN);
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
        className={"booknet"}
        src={`https://www.biblioshare.org/bncServices/BNCServices.asmx/DetailImages?token=${BOOKNET_TOKEN}&san=&ean=${match.isbn}&thumbnail=false&Perspective=interior&FileNumber=&maxWidth=300&maxHeight=`}
        alt={match.title}
      />
    );
  }
  if (props.requestedInfo === "backCover") {
    return (
      <img
        className={"booknet"}
        src={`https://www.biblioshare.org/bncServices/BNCServices.asmx/DetailImages?token=${BOOKNET_TOKEN}&san=&ean=${match.isbn}&thumbnail=no&Perspective=back&filenumber=&maxWidth=200&maxHeight=`}
        alt={"Actually, I change my mind, I'm shy"}
      />
    );
  }
  // In Postman author photo "resource cannot be found" - might be permanent error
  if (props.requestedInfo === "authorPhoto") {
    return (
      <img
        className={"booknet"}
        src={`https://www.biblioshare.org/bncServices/BNCServices.asmx/DetailImages?Token=${BOOKNET_TOKEN}&EAN=${match.isbn}&SAN=&Thumbnail=false&Perspective=author&FileNumber=&maxWidth=300&maxHeight=`}
        alt={"Actually, I change my mind, I'm shy"}
      />
    );
  }
  // Note: Requesting teachers guide will return a PDF (if one exists)
  if (props.requestedInfo === "teachersGuide") {
    return (
      <img
        className={"booknet"}
        src={`https://www.biblioshare.ca/BNCServices/BNCServices.asmx/Samples?token=${BOOKNET_TOKEN}&ean={match.isbn}&san=&perspective=teachersguide&filenumber=`}
        alt={"Actually, I change my mind, I'm shy"}
      />
    );
  }
  // Note: Requesting table of contents will return a PDF (if one exists)
  if (props.requestedInfo === "toc") {
    return (
      <img
        className={"booknet"}
        src={`https://www.biblioshare.ca/BNCServices/BNCServices.asmx/Samples?token=${BOOKNET_TOKEN}&ean=${match.isbn}&san=&perspective=toc&filenumber=`}
        alt={"Actually, I change my mind, I'm shy"}
      />
    );
  }

  // This is here as a backup alternate cover photo source. Note: In Postman could get max width parameter to accept
  // if (props.requestedInfo === "coverPhoto") {
  //   return (
  //     <img
  //       src={`https://www.biblioshare.org/BNCServices/BNCServices.asmx/Images?Token=${BOOKNET_TOKEN}&EAN=${match.isbn}&SAN=&Thumbnail=false`}
  //       alt={match.title}
  //     />
  //   );
  // }

  return <div>Sorry, I'm shy</div>;
}
