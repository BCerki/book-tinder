import React, { useEffect, useState, useContext } from "react";
import ChatBot from "react-simple-chatbot";
import booknetScripts from "../ChatBotScripts/booknetScripts";
import otherScripts from "../ChatBotScripts/otherScripts";
import demoScripts from "../ChatBotScripts/demoScripts";
import testingScript from "../ChatBotScripts/testingScript";
import _ from "lodash";
import BackBar from "./BackBar";
import Loading from "./Loading";
import BooknetImagery from "../Components/BooknetImagery";
import BooknetQuote from "../Components/BooknetQuote";
import BookManagerLocation from "../Components/BookManagerLocation";

import useLocalStorage from "react-use-localstorage";
import secrets from "../.secrets";
import { useLocation } from "react-router-dom";

//Styling
import "../styles/chatView.scss";
import axios from "axios";
const { outOfTheAttic, theForestCityKiller, raisingRoyalty } = demoScripts;

//bookmanager

//import demo scripts

// import outOfTheAttic from "../ChatBotScripts/demoScripts";
// import theForestCityKiller from "../ChatBotScripts/demoScripts";
// import allTheLeavings from "../ChatBotScripts/demoScripts";
const { BOOK_TOKEN, GOOGLE_BOOK_KEY } = secrets;

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

          //AFTER PRESENTATION--choose a script based on whether it has any resources available in booknet
          const scripts = thisMatch.booknet_available
            ? booknetScripts
            : otherScripts;
        })
        .catch(() => {});
    }
  }, [matchId]);

  //choose a random script
  const chooseScript = function(scripts) {
    const randomIndex = _.random(0, scripts.length - 1);
    return scripts[randomIndex];
  };

  //choose the appropriate demo script
  //doesn't grab the right script
  const chooseDemoScript = function(isbn, title) {
    console.log("isbn is", isbn);
    console.log("title is", title);

    if (isbn === "9781982114428") {
      return outOfTheAttic;
    }
    if (isbn === "9781770415034") {
      return theForestCityKiller;
    }
    if (isbn === "9781459735699") {
      return raisingRoyalty;
    }

    return [{ id: "1", message: "hi" }];
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

  if (!match.title) {
    return <Loading />;
  }
  return (
    <>
      <BackBar
        className={"backBar"}
        image={match.image}
        id={match.id}
        title={match.title}
      />
      <ChatBot
        // AFTER DEMO FOR RANDOM SCRIPTS
        // steps={chooseScript(scripts)}
        //FOR DEMO
        steps={chooseDemoScript(match.isbn, match.title)}
        // steps={[{ id: 1, message: "hi" }]}
        cacheName={`rsc_cache_${matchId}`}
        cache={true}
        hideBotAvatar={true}
        hideUserAvatar={true}
        hideHeader={true}
        botAvatar={"from state"}
        userAvatar={"from user api, hardcode in"}
      />
    </>
  );
}
