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

// first star

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
  } else if (zero > one) {
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

function getGammaAndEpsilon(data) {
  const swappedRows = swapRowsAndColumns(data);

  const mostCommon = swappedRows.map(arr => {
    return getMostCommonBit(arr);
  });

  const leastCommon = getLeastCommon(mostCommon);

  const gammaRate = mostCommon.join('');
  const epsilonRate = leastCommon.join('');

  return {gammaRate, epsilonRate};
}

function getPowerConsumption(data) {
  const rates = getGammaAndEpsilon(data);

  return parseInt(rates.gammaRate, 2) * parseInt(rates.epsilonRate, 2);
}

// second star
/*
Problem: 
input: an array of binary numbers
output: the oxygen and co2 ratings
oxygen: most common value in the bit position, keep only those numbers. when one number is left stop
co2: same but with least common value

exmaple: SEE CODE

algorithm:
declare length

iterate number of bits times declare index
  declare the index
  iterate through all the binaries
    tally ones and zeros
    if 1 is greater, filter the binaries
    if 0 is greater, filter the binaries
    if they're equal, keep the 0s



*/

function getOxygen(data) {
  let binaryLength = data[0].length;

  for (let indx = 0; indx < binaryLength; indx += 1) {
    let ones = 0;
    let zeros = 0;

    data.forEach(binary => {
      if (binary[indx] === '1') {
        ones += 1;
      } else if (binary[indx] === '0') {
        zeros += 1;
      }
    });

    if (zeros > ones) {
      data = data.filter(binary => binary[indx] === '0');
    } else {
      data = data.filter(binary => binary[indx] === '1');
    }
    
    if (data.length === 1) break;
  }

  return parseInt(data[0], 2);
}

function getCo2(data) {
  let binaryLength = data[0].length;

  for (let indx = 0; indx < binaryLength; indx += 1) {
    let ones = 0;
    let zeros = 0;

    data.forEach(binary => {
      if (binary[indx] === '1') {
        ones += 1;
      } else if (binary[indx] === '0') {
        zeros += 1;
      }
    });

    if (zeros <= ones) {
      data = data.filter(binary => binary[indx] === '0');
    } else {
      data = data.filter(binary => binary[indx] === '1');
    }
    
    if (data.length === 1) break;
  }

  return parseInt(data[0], 2);
}

function getLifeSupportRating(data) {
  const oxygen = getOxygen(data);
  const co2 = getCo2(data);

  console.log(oxygen);
  console.log(co2);
  return oxygen * co2;
}


// console.log(getPowerConsumption(testData));
// console.log(getPowerConsumption(dataAsArray));
const dataAsArray = getDataFromText(path);
console.log(getLifeSupportRating(testData)); // 230
console.log(getLifeSupportRating(dataAsArray))




