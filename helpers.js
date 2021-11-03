const fs = require("fs");
const Papa = require("papaparse");

//Helper functions
function uniformString(str) {
  str = str.split(" ").join("").toLowerCase().substring(0, 16);
  return str;
}
function compare(a, b) {
  return a.Vendor < b.Vendor ? -1 : 1;
}
function formatter(category) {
  let str = " ";
  let spacing = 30 - category.length;
  for (let i = 0; i < spacing; i++) {
    str += " ";
  }
  return str;
}
//Reads csv data passed in through command line
const readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath);
  const csvData = csvFile.toString();
  return new Promise((resolve) => {
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};
//Exports data to a csv file
const writeCSV = async (data) => {
  var csv = Papa.unparse(data);
  fs.writeFileSync("Exported.csv", csv);
};

module.exports = { uniformString, compare, formatter, readCSV, writeCSV };
