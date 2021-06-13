import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//<div className="isbn">ISBN: {props.isbn}</div>
import axios from "axios";
export default function BookManagerLocation(props) {
  const [date, setDate] = useState("");
  const [conversation, setCurrentConversation] = useState({});

  const conversationId = Number(
    useLocation().pathname.replace("/matches/", "")
  );

  useEffect(() => {
    axios.get(`/api/users/:id/conversations`).then((result) => {
      //set conversation state
      const allConversations = result.data;
      const thisConversation = allConversations.find(
        (conversation) => conversation.id === conversationId
      );
      setCurrentConversation(thisConversation);

      axios
        .get(
          `api/getlocation?isbn=${thisConversation.isbn}postal=${props.postalCode}&max_distance=${props.maxDistance}`
        )
        .then((result) => {
          setDate(result);
        })
        .catch();
    });
  });

  return <div>Here is the BookManager response: {date}</div>;
}
