import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { result } from "lodash";

export default function UserStateProvider(props) {
  const getFromDB = function() {
    axios
      .get("/api/users")
      .then((result) => {
        setUserState(result.data);
        console.log("i am in axios get for user, result.data is:", result.data);
      })
      .catch((err) => console.log("Error message:", err.message));
  };

  // const [userState, setUserState] = useState(getFromDB());
  const [userState, setUserState] = useState({
    id: 1,
    name: "Sandra Gardiner",
    age: [20, 40],
    pageCount: [256, 512],
    price: [10, 30],
    maxDistance: 80,
    maturity: false,
    genres: [],
  });

  //set these when the user makes the profile instead
  // const defaultState = {
  //   //hard coding in name and id for demo
  //   id: 1,
  //   name: "Sandra Gardiner",
  //   age: [20, 40],
  //   pageCount: [256, 512],
  //   price: [10, 30],
  //   maxDistance: 80,
  //   maturity: false,
  //   genres: [],
  // };

  // check if this is working! FIX FIX loading screen?
  // useEffect(() => {
  //   axios
  //     .get("/api/users")
  //     .then((result) => {
  //       setUserState(result.data);
  //       console.log("i am in axios get for user, result.data is:", result.data);
  //     })
  //     .catch((err) => console.log("Error message:", err.message));
  // }, []);

  const sendToDB = function(userObject) {
    console.log("in parent user object", userObject);
    //need to send userObject, not userState, because it's not updated yet
    setUserState(userObject);
    //MICHELLE
    axios
      .put(`/api/users/${userObject.id}`, userObject)
      .then((result) => {
        console.log("all is well");
      })
      .catch((err) => console.log("Error message:", err.message));
  };

  const providerData = {
    sendToDB,
    userState,
  };

  return (
    <userStateContext.Provider value={providerData}>
      {props.children}
    </userStateContext.Provider>
  );
}
export const userStateContext = createContext();
