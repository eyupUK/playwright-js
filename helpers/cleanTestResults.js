const fs = require('fs');
const path = require('path');

const directoriesToClean = [
  './test-results',
  './allure-results',
  './playwright-report',
];

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const currentPath = path.join(folderPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        deleteFolderRecursive(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(folderPath);
    console.log(`Deleted: ${folderPath}`);
  } else {
    console.log(`Folder not found: ${folderPath}`);
  }
}

function cleanTestResults() {
  directoriesToClean.forEach((dir) => {
    deleteFolderRecursive(dir);
  });
  console.log('Test result directories cleaned successfully.');
}

cleanTestResults();