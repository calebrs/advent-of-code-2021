/*
Problem:
input: array of bits as strings
output: the product of the epsilon and the gamma rates of the bits
rules: 
gamma rate: the most common bit value in a given position
epsilon: least common bit value in the position.


Examples: SEE CODE


Algorithm:
declare an empty string

iterate through the array of bits
  flip the array


*/
let testData = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
]

const fs = require('fs');
const path = './data.txt'

function getDataFromText(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.log(err);
  }
}

function swapRowsAndColumns(arr) {
  return arr[0].split('').map((_, indx) => {
    return arr.map(row => {
      return row[indx];
    });
  });
}

function getMostCommonBit(arr) {
  let one = 0;
  let zero = 0;

  arr.forEach(bit => {
    if(bit === "0") {
      zero += 1;
    } else {
      one += 1;
    }
  });

  if (one > zero) {
    return 1;
  } else {
    return 0;
  }
}

function getLeastCommon(arr) {
  return arr.map(bit => {
    if(bit === 1) {
      return 0;
    } else {
      return 1;
    }
  })
}

function getPowerConsumption(data) {
  const swappedRows = swapRowsAndColumns(data);

  const mostCommon = swappedRows.map(arr => {
    return getMostCommonBit(arr);
  });

  const leastCommon = getLeastCommon(mostCommon);

  const gammaRate = parseInt(mostCommon.join(''), 2);
  const epsilonRate = parseInt(leastCommon.join(''), 2);

  return gammaRate * epsilonRate;

}

let dataAsArray = getDataFromText(path);
console.log(swapRowsAndColumns(testData));
console.log(getPowerConsumption(testData));
console.log(getPowerConsumption(dataAsArray));



