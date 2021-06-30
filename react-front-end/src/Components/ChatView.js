import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
//bookmanager
//import demo scripts
// import outOfTheAttic from "../ChatBotScripts/demoScripts";
// import theForestCityKiller from "../ChatBotScripts/demoScripts";
// import allTheLeavings from "../ChatBotScripts/demoScripts";
import secrets from "../.secrets";
import booknetScripts from "../ChatBotScripts/booknetScripts";
import demoScripts from "../ChatBotScripts/demoScripts";
import otherScripts from "../ChatBotScripts/otherScripts";
import testingScript from "../ChatBotScripts/testingScript";
//Styling
import "../styles/chatView.scss";
import BackBar from "./BackBar";
import Loading from "./Loading";
import Login from "./Login";

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
        })
        .catch(() => {});
    }
  }, [matchId]);

  //if it's one of our demo books, choose the appropriate script. If it's at booknet, choose a random script (these scripts include materials booknet holds). If it's not, choose a random other script.
  const chooseTargetedScript = function(isbn, title, booknet_available) {
    if (isbn === "9781982114428") {
      return outOfTheAttic;
    }
    if (isbn === "9781459735699") {
      return raisingRoyalty;
    }
    if (booknet_available) {
      return booknetScripts[_.random(0, booknetScripts.length - 1)];
    }

    return otherScripts[_.random(0, otherScripts.length - 1)];
  };

  //Send to DB every time the user clicks
  useEffect(() => {
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
          //real script functionality
          // steps={chooseTargetedScript(
          //   match.isbn,
          //   match.title,
          //   match.booknet_available
          // )}
          //test script
          steps={testingScript}
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
