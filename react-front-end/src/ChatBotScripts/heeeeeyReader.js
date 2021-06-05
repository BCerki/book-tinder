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
        label: "Haven't heard that one before",
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

module.exports = heeeeeyReader;
