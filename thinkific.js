const { uniformString, compare, formatter, readCSV,writeCSV  } = require('./helpers');
const csvFilePath = process.argv.slice(2)[0];

const runScript = async () => {
  let parsedData = await readCSV(csvFilePath); 

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

 //Sort the data alphabetically. Probably runtime of O(N * logN)
 parsedData.sort(compare);

 //Exporting to a CSV file
writeCSV(parsedData);


//Generate the report (Before refactoring everything)
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
for (const key in reportObj) {
 console.log(key)
 for (const subkey in reportObj[key])
  console.log(`  ${subkey}${formatter(subkey)}$${reportObj[key][subkey].toFixed(2)}`);
}
}

function exportData() {

}

function generateReport() {

}


if (!process.argv.slice(2)[1]) {
 console.log(`Hello. You can run me by typing "node thinkific.js 𝘧𝘪𝘭𝘦𝘱𝘢𝘵𝘩 𝘰𝘱𝘵𝘪𝘰𝘯"
Options are: 1 for exporting a csv file, 2 for generating a report in the command line
Example: node thinkific.js tht-coop.csv 1`)
} else {
runScript()
}