// Transform CSV dataset I found online:

const fs = require("fs");
const csvToObj = require("csv-to-js-parser").csvToObj;
const data = fs.readFileSync("./public/data.csv").toString();

const description = {
  bookId: { type: "string", group: 1 },
  title: { type: "string", group: 2 },
  isbn: { type: "string", group: 3 },
  author: { type: "string", group: 4 },
  rating: { type: "number", group: 5 },
  description: { type: "string", group: 6 },
  numRatings: { type: "number", group: 7 },
  likedPercent: { type: "number", group: 9 },
  coverImg: { type: "string", group: 10 },
  publisher: { type: "string", group: 11 },
  publishDate: { type: "string", group: 12 },
  genres: { type: "string", group: 13 },
};

const booksLib = csvToObj(data, ",", description);
module.exports = booksLib;
