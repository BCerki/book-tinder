import React, { useEffect, useState, useContext } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import booknetScripts from "../ChatBotScripts/booknetScripts";
import otherScripts from "../ChatBotScripts/otherScripts";
import demoScripts from "../ChatBotScripts/demoScripts";
import testingScript from "../ChatBotScripts/testingScript";
import _ from "lodash";
import BackBar from "./BackBar";
import Loading from "./Loading";
import Login from "./Login";
import BooknetImagery from "../Components/BooknetImagery";
import BooknetQuote from "../Components/BooknetQuote";
import BookManagerLocation from "../Components/BookManagerLocation";

import useLocalStorage from "react-use-localstorage";

import { useLocation } from "react-router-dom";

//Styling
import "../styles/chatView.scss";
import axios from "axios";

//bookmanager

//import demo scripts

// import outOfTheAttic from "../ChatBotScripts/demoScripts";
// import theForestCityKiller from "../ChatBotScripts/demoScripts";
// import allTheLeavings from "../ChatBotScripts/demoScripts";
import secrets from "../.secrets";

// all available chatbot styling props
const theme = {
  background: "#f5f8fb",
  fontFamily: "Courier Prime",
  // headerBgColor: "#EF6C00",
  // headerFontColor: "#fff",
  // headerFontSize: "15px",
  botBubbleColor: "#1976d2",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};
const { outOfTheAttic, theForestCityKiller, raisingRoyalty } = demoScripts;
const { BOOKNET_TOKEN, GOOGLE_BOOK_KEY } = secrets;

export default function ChatView(props) {
  const [match, setMatch] = useState({});
  //state for the hacky function
  const [state, setState] = useState();

  //Function to change state every time a user clicks (stand-in for every time the conversation changes; the chatbot manages its own state, so I can't hook into it. If the user's going to type, we'll have to adjust)
  const hackyFunction = function() {
    setState(state + 1);
  };
  //FIX FIX memory leak

  window.onclick = hackyFunction;

  //get the match id
  let location = useLocation();
  const matchId = Number(location.pathname.replace("/matches/", ""));

  useEffect(() => {
    if (matchId) {
      axios
        .get(`/api/users/1/conversations`)
        .then((result) => {
          //set match state (conversations are proxy for matches)
          const allMatches = result.data;
          const thisMatch = allMatches.find((match) => match.id === matchId);
          setMatch(thisMatch);
          console.log("thismatch is", thisMatch);

          //AFTER PRESENTATION--choose a script based on whether it has any resources available in booknet
          // const scripts = thisMatch.booknet_available
          //   ? booknetScripts
          //   : otherScripts;
        })
        .catch(() => {});
    }
  }, [matchId]);

  //choose a random script
  const chooseRandomScript = function(scripts) {
    const randomIndex = _.random(0, scripts.length - 1);
    return scripts[randomIndex];
  };

  //if it's one of our demo books, choose the appropriate script, otherwise choose a random one
  const chooseTargetedScript = function(isbn, title, booknet_available) {
    console.log("isbn is", isbn);
    console.log("title is", title);
    console.log("booknet_available is", booknet_available);

    if (isbn === "9781982114428") {
      return outOfTheAttic;
    }
    if (isbn === "9781770415034") {
      return theForestCityKiller;
    }
    if (isbn === "9781459735699") {
      return raisingRoyalty;
    }

    return chooseRandomScript(
      booknet_available ? booknetScripts : otherScripts
    );
  };

  //Send to DB every time the user clicks
  useEffect(() => {
    // console.log(
    //   "sending this to db:",
    //   window.localStorage.getItem(`rsc_cache_${matchId}`)
    // );

    axios

      .put(
        `/api/users/1/conversations/${matchId}`,
        JSON.parse(window.localStorage.getItem(`rsc_cache_${matchId}`))
      )
      .then(() => {
        // console.log("successfully sent local storage to db");
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }, [state]);

  if (!match) {
    return <Login />;
  }
  if (!match.title) {
    return <Loading />;
  }
  return (
    <>
      <BackBar
        className={"backBar"}
        image={match.image}
        key={match.id}
        bookId={match.book_id}
        title={match.title}
      />
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={chooseTargetedScript(
            match.isbn,
            match.title,
            match.booknet_available
          )}
          cacheName={`rsc_cache_${matchId}`}
          cache={true}
          hideBotAvatar={true}
          hideUserAvatar={true}
          hideHeader={true}
        />
      </ThemeProvider>
    </>
  );
}
