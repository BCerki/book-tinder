import { useState, useEffect } from "react";
import axios from "axios";

//this is for getting the current book and the book array data
export default function useBooksHook() {
  //State updates
  const [bookState, setBookState] = useState({ currentBook: null, books: [] });

  //Custom hook
  useEffect(() => {
    axios.get("/api/books").then((response) => {
      setState((prev) => ({
        ...prev,
        books: response,
      }));
    });
  }, []);

  const selectGenre = function(genre) {
    //Axios request to book the interview
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((resolve) => {
        const days = updateSpots(id, appointments);
        setState((prev) => ({
          ...prev,
          appointments,
          days,
        }));
      });
    //error handling/.catch is in index.js
  };

  return { state, setDay, bookInterview, cancelInterview };
}
