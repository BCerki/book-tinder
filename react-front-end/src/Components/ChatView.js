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

import { useLocation } from "react-router-dom";

//Styling
import "../styles/chatView.scss";
import axios from "axios";

//bookmanager

//destructure demo scripts
const { outOfTheAttic, theForestCityKiller, allTheLeavings } = demoScripts;

export default function ChatView(props) {
  const [match, setMatch] = useState({});
  //state for the hacky function
  const [state, setState] = useState();

  //Function to change state every time a user clicks (stand-in for every time the conversation changes; the chatbot manages its own state, so I can't hook into it. If the user's going to type, we'll have to adjust)
  const hackyFunction = function() {
    setState(state + 1);
  };

  window.onclick = hackyFunction;

  //get the match id
  let location = useLocation();
  const matchId = Number(location.pathname.replace("/matches/", ""));

  const getLongDescription = function() {
    return "placeholder";
  };

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

  if (!match) {
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
        // steps={[
        //   {
        //     id: "1",
        //     message:
        //       "Hey there, cover lover. Appears you’re looking for a novel encounter. You’ve seen my front cover. Maybe you’d like to see me...from behind? 😉",
        //     trigger: "2",
        //   },
        //   {
        //     id: "2",
        //     options: [
        //       { value: 1, label: "Yes", trigger: "backCover" },
        //       { value: 2, label: "No", trigger: "backCover" },
        //     ],
        //   },
        //   {
        //     id: "backCover",
        //     component: <BooknetImagery requestedInfo={"backCover"} />,
        //     trigger: "3",
        //   },
        //   {
        //     id: "3",
        //     message:
        //       "What do you think of my paperback? I've been working out ",
        //   },
        // ]}
        // steps={[
        //   {
        //     id: "1",
        //     message: "Hi 😏",
        //     trigger: "2",
        //   },
        //   {
        //     id: "2",
        //     options: [
        //       { value: 1, label: "Tell me about yourself", trigger: "tell" },
        //       { value: 2, label: "Hi 😏", trigger: "tell" },
        //       { value: 3, label: "Send pix", trigger: "tell" },
        //     ],
        //   },
        //   {
        //     id: "tell",
        //     message: getLongDescription(),
        //     trigger: "4",
        //   },
        //   {
        //     id: "4",
        //     message: "Are you intrigued? 😉",
        //     trigger: "5",
        //   },
        //   {
        //     id: "5",
        //     options: [
        //       { value: 1, label: "Yes, tell me more", trigger: "6" },
        //       { value: 2, label: "No...it's not me, it's you", trigger: "6" },
        //     ],
        //   },
        //   {
        //     id: "6",
        //     component: <BooknetQuote />,
        //     trigger: "7",
        //   },
        //   {
        //     id: "7",
        //     message: "Here's one of my favourite quotes 😈",
        //   },
        // ]}

        steps={[
          {
            id: "1",
            message:
              "Hehe, would  you’d like to get to know me a little better on the inside?",
            trigger: "2",
          },
          {
            id: "2",
            options: [{ value: 1, label: "Yes", trigger: "3" }],
          },
          { id: "3", message: "TOC", trigger: "4" },
          {
            id: "4",
            message: "Here's a sample of my table of conquests",
            trigger: "5",
          },
          {
            id: "5",
            message: "errrr... *contents",
            trigger: "6a",
          },
          {
            id: "6a",
            options: [
              {
                value: 1,
                label:
                  "That's not a very long list... are you sure you're at my reading level?",
                trigger: "6b",
              },
            ],
          },
          {
            id: "6b",
            message:
              "That's just page 1 😏. I come from good stock. Would you like to see a photo of my author?",
            trigger: "7",
          },
          { id: "7", options: [{ value: 1, label: "Yes", trigger: "8a" }] },
          {
            id: "8a",
            component: <BooknetImagery requestedInfo={"authorPhoto"} />,
            trigger: "8b",
          },
          {
            id: "8b",
            message:
              "Do you like what you've read and seen so far? Wy don’t you pick me up and we can 🤭 ... bookup?",
            trigger: "9",
          },
          {
            id: "9",
            options: [
              { value: 1, label: "😍", trigger: "10" },
              { value: 2, label: "😰", trigger: "10" },
            ],
          },
          { id: "10", component: <BookManagerLocation />, trigger: "11" },
          {
            id: "11",
            message:
              "You can pick me up here. Looking forward to feeling your bookmark between my pages. Just don’t read me too hard, or you might crack my spine 📖💋😘",
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
