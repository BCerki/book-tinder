import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
export default function BookManagerLocation(props) {
  const [date, setDate] = useState("");
  const [conversation, setCurrentConversation] = useState({});

  const conversationId = Number(
    useLocation().pathname.replace("/matches/", "")
  );

  const userId = props.userId;
  console.log("userId is", userId);

  useEffect(() => {
    axios.get(`/api/users/:id/conversations`).then((result) => {
      //set conversation state
      const allConversations = result.data;
      const thisConversation = allConversations.find(
        (conversation) => conversation.id === conversationId
      );
      setCurrentConversation(thisConversation);
      console.log("the user id is  is", thisConversation.user_id);

      axios.get(`/api/users/${thisConversation.user_id}`).then((result) => {
        console.log("user info is", result.data[0]);
        const postalCode = result.data[0].postalCode;
        const maxDistance = result.data[0].maxDistance;
        axios
          .get(
            `api/getlocation?isbn=${thisConversation.isbn}postal=${postalCode}&max_distance=${maxDistance}`
          )
          .then((result) => {
            setDate(result);
          });
      });
    });
  }, []);

  return <div>Here is the BookManager response: {date}</div>;
}
