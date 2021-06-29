import { useState, useEffect } from "react";

import axios from "axios";

const useMatches = function() {
  //Manages array of all the users' matches
  const [matches, setMatches] = useState([]);

  //Manages a particular match's object
  // const [chattingMatch, setChattingMatch] = useState({});

  //hook up to auth0 for real userid later FIX FIX
  useEffect(() => {
    axios
      .get("/api/users/1/conversations")
      .then((result) => {
        setMatches(result.data.reverse());
      })
      .catch((err) => {
        console.log("Error:", err.message);
      });
  }, []);

  //Get the object for a particular match
  const getChattingMatch = function(matchId) {
    return matches.find((match) => match.id === matchId);
  };

  return {
    matches,
    setMatches,
    // chattingMatch,
    // setChattingMatch,
    getChattingMatch,
  };
};

export default useMatches;
