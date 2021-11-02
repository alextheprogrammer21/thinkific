// const args = process.argv.slice(2);

// console.log(args);
// Use process argv to get the file path. Make it if they put the whole C:// then 
// put the whole file path, otherwise just assume it's in the same folder


const fs = require('fs');
const Papa = require('papaparse');

const csvFilePath = 'tht-coop.csv'

// Function to read csv which returns a promise so you can do async / await.

const readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath)
  const csvData = csvFile.toString()  
  return new Promise(resolve => {
    Papa.parse(csvData, {
      header: true,
      complete: results => {
        console.log('Complete', results.data.length, 'records.'); 
        resolve(results.data);
      }
    });
  });
};

const test = async () => {
  let parsedData = await readCSV(csvFilePath); 
  console.log("Heres the data", parsedData[2])
}

test()