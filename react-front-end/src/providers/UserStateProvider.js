import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { result } from "lodash";

export default function UserStateProvider(props) {
  // const [age, setAge] = useState([20, 40]);
  // const [pageCount, setPageCount] = useState([256, 512]);
  // const [price, setPrice] = useState([10, 30]);
  // const [maxDistance, setMaxDistance] = useState(80);
  // const [maturity, setMaturity] = useState(false);

  //WITH MENTOR
  const [location, setLocation] = useState(0);
  const setLocationParent = function(value) {
    axios
      .put("/api/users")
      .then((result) => {
        setLocation(value);
      })
      .catch((err) => console.log("Error message:", err.message));
  };
  // const [userState, setUserState] = useState({
  //   age: [20, 40],
  //   pageCount: [256, 512],
  //   price: [10, 30],
  //   maxDistance: 80,
  //   maturity: false,
  // });

  //AFTER axios, update

  // const unicorn = function(value) {
  //   setUserState(...(prev) => {});
  // };

  // const providerData = { userState, setUserState };
  const providerData = { setLocationParent };

  //isloading state
  // useEffect(() => {

  // }, [axios]);

  return (
    <userStateContext.Provider value={providerData}>
      {props.children}
    </userStateContext.Provider>
  );
}
export const userStateContext = createContext();

// async function getBooks() {
//   let data = await axios
//     .get("/api/test")
//     .then((result) => {
//       console.log("response.data in userstateprovider", result.data);
//       data = result.data;
//       setRetrievedBooks(data);
//     })
//     .catch((err) => console.log("Error message:", err.message));
//   return retrievedBooks;
// }
