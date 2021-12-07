/*
Problem:
input: 
output:

Examples:


Data Structures:


Algorithm:


*/

const fs = require('fs');
const { get } = require('http');
const dataPath = './bingo.txt';
const testDataPath = './testdata.txt'

function getDataFromText(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.log(err);
  }
}

function getSequence(data) {
  return data[0].split(',');
}

function getBoards(data) {
  return data.slice(1);
}

function formatBoards(boards) {
  let newRow = [];
  let result = [];

  

  boards.forEach(row => {
    if (row) {
      newRow.push(row.trim().split(/\s+/))
    } else if (row === '') {
      result.push(newRow);
      newRow = [];
    }
  });

  return result;
}

function rotateArrayRight( arr ){
	// rotates a 2D array 90 degrees to the right (clockwise)

	var newarr = [];

	for( var x = 0; x < arr[0].length; x++ ){
	  newarr[x] = [];
	  for( var y = arr.length - 1; y >= 0; y-- ){
	    newarr[x].push( arr[y][x] );
	  }
	}

	return newarr;

}

const testData = getDataFromText(dataPath);
const sequence = getSequence(testData);
const boards = getBoards(testData);
const formattedBoards = formatBoards(boards);


/*
iterate through the squence starting at 5
  get a slice of the sequence from the first up to the current

  iterate through all the boards on each
    check if board has a match(sequence array)
    if it's a match
      score the board(board, sequence)

  return the score
*/

/*
is board a match - board, sequence
  iterate through the board's rows
    if the row contains all the numbers in the sequence
      return true

    return false
*/

/*
score board: current number, slice the array from current to end
  times the two together
*/
function bingo(boards, sequence) {
  let score = null;

  for (let indx = 4; indx < sequence.length; indx += 1) {
    const currentNumbers = sequence.slice(0, indx + 1);

    for (let boardNum = 0; boardNum < boards.length; boardNum += 1) {
      const board = boards[boardNum];

      if (boardIsMatch(board, currentNumbers)) {
        const unmarkedNumbers = getUnmarkedNumbers(board, currentNumbers);
        console.log(board)
        return getScore(sequence[indx], unmarkedNumbers);
      }
    }
  }
}

function getUnmarkedNumbers(board, currentNumbers) {
  const boardNumbers = [...board[0], ...board[1], ...board[2], ...board[3], ...board[4]]
  return boardNumbers.filter(num => !currentNumbers.includes(num));
}

function boardIsMatch(board, numbers) {
  const swappedColumns = rotateArrayRight(board);
  
  for (let indx = 0; indx < board.length; indx += 1) {
    let row = board[indx];
    let column = swappedColumns[indx];

    const isMatch = column.every(num => numbers.includes(num));
    
    return isMatch;
  }
}



function getScore(num, uncalledNumbers) {
  return uncalledNumbers.reduce((accum, num) => accum + Number(num), 0) * num;
}

console.log(bingo(formattedBoards, sequence));