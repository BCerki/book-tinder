import React from "react";
import BookManagerLocation from "../Components/BookManagerLocation";
const bookManagerScript = [
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
  },
];
