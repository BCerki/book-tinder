const heeeeeyReader = [
  {
    id: 1,
    message: "Heeeeey reader, ever had a novel encouter? 😉",
    trigger: "2",
  },
  {
    id: 2,
    options: [
      {
        value: "y",
        label: "You're puny",
        trigger: "yes-response",
      },
      { value: "n", label: "No", trigger: "no-response" },
    ],
  },
  {
    id: "yes-response",
    message: "I'm good with words 🤓📚",
  },
  {
    id: "no-response",
    message: "Then you're in luck",
  },
];

const hi = [
  {
    id: 1,
    message: "Hi 😉",
  },
];

const booknetScripts = [heeeeeyReader, hi];

export default booknetScripts;
