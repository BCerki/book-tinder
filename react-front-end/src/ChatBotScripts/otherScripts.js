import _ from "lodash";

const sendPix = function() {
  const resultsArray = [];
  const end = 5;
  for (let i = 1; i < end; i++) {
    const delay = _.random(1000, 5000);
    resultsArray.push({
      id: `${i}`,
      message: "send pix",
      botDelay: delay, //not working, invalid key?
      trigger: `${i + 1}`,
    });
  }
  resultsArray.push({ id: `${end}`, message: "send pix", end: true });
  return resultsArray;
};

const otherScripts = [sendPix()];

export default otherScripts;
