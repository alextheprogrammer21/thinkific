const { compare, formatter, writeCSV } = require("./helpers");

function exportData(parsedData) {
  //Sort the data alphabetically. Probably runtime of O(N * logN)
  parsedData.sort(compare);

  //Exporting to a CSV file
  writeCSV(parsedData).then(
    console.log(
      "Process complete. Your file can be found in the project folder titled Exported.csv"
    )
  );
}

function generateReport(parsedData) {
  //Totals data by categories and subcategories
  let reportObj = {};
  for (let i = 0; i < parsedData.length; i++) {
    let data = parsedData[i];
    let category = data.Category;
    let subcategory = data.Subcategory;
    let spend = Math.round(parseFloat(data.Spend) * 100) / 100;

    if (reportObj[category]) {
      reportObj[category][subcategory]
        ? (reportObj[category][subcategory] += spend)
        : (reportObj[category][subcategory] = spend);
    } else {
      reportObj[category] = {};
      reportObj[category][subcategory] = spend;
    }
  }
  //Outputs the data in the command prompt
  for (const key in reportObj) {
    console.log(key);
    for (const subkey in reportObj[key])
      console.log(
        `  ${subkey}${formatter(subkey)}$${reportObj[key][subkey].toFixed(2)}`
      );
  }
}

module.exports = { exportData, generateReport };
