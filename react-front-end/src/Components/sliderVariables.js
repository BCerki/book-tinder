//age variables
const thisYear = new Date().getFullYear();
const maxAgeMark = thisYear - 1970;
const ageMarks = [
  {
    value: 0,
    // label: "0",
  },
  {
    value: maxAgeMark,
    // label: `${maxAgeMark}`,
  },
];

//page count variables
const maxPageCountMark = 1000;
const pageCountMarks = [
  {
    value: 0,
    // label: "One-night stand",
  },
  {
    value: maxPageCountMark,
    // label: `Long-term relationship`,
  },
];

//price variables
const maxPriceMark = 200;
const priceMarks = [
  {
    value: 0,
    // label: "Cheap",
  },
  {
    value: maxPriceMark,
    // label: `Expensive`,
  },
];

//location variables
const maxDistanceMark = 200;
const distanceMarks = [
  {
    value: 0,
    // label: "0km",
  },

  {
    value: maxDistanceMark,
    // label: `${maxDistanceMark}km`,
  },
];

const marks = { ageMarks, pageCountMarks, priceMarks, maxDistanceMark };

export default marks;
