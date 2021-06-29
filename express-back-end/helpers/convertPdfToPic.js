import { fromPath } from "pdf2pic";

const options = {
  density: 100,
  saveFilename: "test1",
  savePath: "./images",
  format: "png",
  width: 600,
  height: 600,
};
const storeAsImage = fromPath("/downloads/9781459735699_Sample.pdf", options);
const pageToConvertAsImage = 2;

storeAsImage(pageToConvertAsImage);
console.log("Page 2 is now converted as image");

// Test code
