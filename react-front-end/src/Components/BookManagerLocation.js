import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useMatches from "../hooks/useMatches";

export default function BookManagerLocation(props) {
  const [closestBookstore, setClosestBookstore] = useState("");
  const { getChattingMatch } = useMatches();
  const match = getChattingMatch();

  useEffect(() => {
    if (match) {
      axios.get(`/api/users/${match.user_id}`).then((result) => {
        const postalCode = result.data[0].postalCode;
        const maxDistance = result.data[0].maxDistance;
        axios
          .get(
            `/api/getlocation?isbn=${match.isbn}&postal=${postalCode}&max_distance=${maxDistance}`
          )
          .then((result) => {
            setClosestBookstore(result.data);
            // console.log("result.data is", result.data);
          })
          .catch((err) => console.log(err));
      });
    }
  }, [match]);

  return <span className={"customText"}>{closestBookstore}</span>;
}
