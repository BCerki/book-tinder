import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";

const useMatches = function() {
  //Get all the users' matches
  const [matches, setMatches] = useState([]);

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

  //get the match id
  // const matchId = Number(useLocation().pathname.replace("/matches/", ""));

  return { matches, setMatches };
};

export default useMatches;
