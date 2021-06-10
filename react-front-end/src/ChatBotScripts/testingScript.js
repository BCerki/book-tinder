import React from "react";

import ChatbotSentPic from "../Components/ChatbotSentPic";

const testingScript = [
  {
    id: "1",
    component: <ChatbotSentPic />,
    message: "What number I am thinking?",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: 1, label: "Number 1", trigger: "4" },
      { value: 2, label: "Number 2", trigger: "3" },
      { value: 3, label: "Number 3", trigger: "3" },
    ],
  },
  {
    id: "3",
    component: (
      <div className="rsc-ts rsc-ts-bot">
        <img src="https://books.google.com/books/content?id=64tuPwAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api" />
      </div>
    ),
    trigger: "2",
  },
  {
    id: "4",
    message: "Awesome! You are a telepath!",
    end: true,
  },
];
export default testingScript;
