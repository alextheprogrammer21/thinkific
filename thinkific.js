const fs = require('fs');
const Papa = require('papaparse');
const csvFilePath = process.argv.slice(2)[0];

//Helper functions
function uniformString(str) {
 str = str.split(' ').join('').toLowerCase().substring(0,16);
 return str;
}
function compare(a,b) {
 return (a.Vendor < b.Vendor ? -1 : 1)
}
//Reads csv data passed in through command line
const readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath)
  const csvData = csvFile.toString()  
  return new Promise(resolve => {
    Papa.parse(csvData, {
      header: true,
      complete: results => {
        resolve(results.data);
      }
    });
  });
};
//Exports data to a csv file
const writeCSV = async (data) => {
 var csv = Papa.unparse(data);
 fs.writeFileSync("Exported.csv", csv);
}

const exportData = async () => {
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
// writeCSV(parsedData);


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
console.log(reportObj)
}

if (!process.argv.slice(2)[1]) {
 console.log(`Hello. You can run me by typing 'node thinkific.js filePath option'
Options are: 1 for exporting a csv file, 2 for generating a report in the cmd
Ex: node thinkific.js tht-coop.csv 1`)
} else {
exportData()
}