import React, { useEffect, useState, useContext } from "react";
import ChatBot from "react-simple-chatbot";
import booknetScripts from "../ChatBotScripts/booknetScripts";
import otherScripts from "../ChatBotScripts/otherScripts";
import demoScripts from "../ChatBotScripts/demoScripts";
import testingScript from "../ChatBotScripts/testingScript";
import _ from "lodash";
import BackBar from "./BackBar";
import Loading from "./Loading";

import useLocalStorage from "react-use-localstorage";

import { useLocation } from "react-router-dom";

//Styling
import "../styles/chatView.scss";
import axios from "axios";

//bookmanager
import BookManagerLocation from "./BookManagerLocation";

//destructure demo scripts
const { outOfTheAttic, theForestCityKiller, allTheLeavings } = demoScripts;

export default function ChatView(props) {
  const [currentMatch, setCurrentMatch] = useState({});
  const [state, setState] = useState();

  //Function to change state every time a user clicks (stand-in for every time the conversation changes; the chatbot manages its own state, so I can't hook into it. If the user's going to type, we'll have to adjust)
  const hackyFunction = function() {
    setState(state + 1);
  };

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
          setCurrentMatch(thisMatch);

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
  const chooseDemoScript = function(title) {
    let script = [];
    if (title === "Out of the Attic") {
      script = outOfTheAttic;
    }
    if (title === " The Forest City Killer") {
      script = theForestCityKiller;
    }
    if (title === "All the Leavings") {
      script = allTheLeavings;
    }
    return script;
  };

  //Send to DB every time the user clicks
  useEffect(() => {
    console.log(
      "sending this to db:",
      window.localStorage.getItem(`rsc_cache_${matchId}`)
    );

    axios

      .put(
        `/api/users/1/conversations/${matchId}`,
        JSON.parse(window.localStorage.getItem(`rsc_cache_${matchId}`))
      )
      .then(() => {
        console.log("successfully sent local storage to db");
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }, [state]);

  if (!currentMatch) {
    return <Loading />;
  }
  return (
    <>
      <BackBar
        className={"backBar"}
        image={currentMatch.image}
        id={currentMatch.id}
        title={currentMatch.title}
      />
      <ChatBot
        // AFTER DEMO FOR RANDOM SCRIPTS
        // steps={chooseScript(scripts)}
        //FOR DEMO
        //steps={chooseDemoScript(currentMatch.title)}
        //Testing steps
        steps={[
          {
            id: "1",
            message: "Click yes for the date",
            trigger: "2",
          },
          {
            id: "2",
            options: [{ value: 1, label: "yes", trigger: "3" }],
          },
          {
            id: "3",
            component: <BookManagerLocation />,
            trigger: "4",
          },
          {
            id: "4",
            message: "Find MEEEEEE",
          },
        ]}
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
