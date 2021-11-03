const { uniformString, compare, formatter, readCSV,writeCSV  } = require('./helpers');
const csvFilePath = process.argv.slice(2)[0];

const runScript = async () => {
  let parsedData = await readCSV(csvFilePath); 
  let selection = process.argv.slice(2)[1];

  if (selection !== '0' && selection !== '1') {
   console.log("Invalid input. Please try again using 0 to export data to a new csv file, or 1 to generate a report")
   return;
  }

  //Fills in the categories and subcategories for all entries. Runtime is O(2N)
  let findObj = {};
  for(let i = 0; i < parsedData.length; i++) {
   let data = parsedData[i];
   if (data['Category']) {
   findObj[uniformString(data['Vendor'])] = {Category: data['Category'], Subcategory: data['Subcategory']};
 }
}
for (let i = 0; i < parsedData.length; i++) {
 let data = parsedData[i];
 if (!data['Category']) {
  let searchParam = uniformString(data['Vendor']);
  data['Category'] = findObj[searchParam].Category;
  data['Subcategory'] = findObj[searchParam].Subcategory;
 }
}

//Decision of exporting data or generating a report
  if (selection === '0') exportData(parsedData);
  if (selection === '1') generateReport(parsedData);
}

function exportData(parsedData) {
//Sort the data alphabetically. Probably runtime of O(N * logN)
parsedData.sort(compare);

//Exporting to a CSV file
writeCSV(parsedData).then(
 console.log("Process complete. Your file can be found in the project folder titled Exported.csv")
)
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
  reportObj[category][subcategory] ? reportObj[category][subcategory] += spend : reportObj[category][subcategory] = spend
 } else {
  reportObj[category] = {}
  reportObj[category][subcategory] = spend;
 }
}
//Outputs the data in the command prompt
for (const key in reportObj) {
 console.log(key)
 for (const subkey in reportObj[key])
  console.log(`  ${subkey}${formatter(subkey)}$${reportObj[key][subkey].toFixed(2)}`);
}
}

//Checks if the user passed in arguments before running the script
if (!process.argv.slice(2)[1]) {
 console.log(`Hello. You can run me by typing "node thinkific.js 'filepath' 'option'"
Options are: 0 for exporting a csv file, 1 for generating a report in the command line
Example: 𝘯𝘰𝘥𝘦 𝘵𝘩𝘪𝘯𝘬𝘪𝘧𝘪𝘤.𝘫𝘴 𝘵𝘩𝘵-𝘤𝘰𝘰𝘱.𝘤𝘴𝘷 1`)
} else {
runScript()
}