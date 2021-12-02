/*
Problem:
input a series of commands in the form of: forward 3, down 2, up 1
output: the final horizontal position * depth
rules:
forward increases horizontal units
down increases depth units
up decreases depth units

Examples: No examples

data structures:

algorithm:
1. read the file in and get it into the correct format

set depth to 0
set horizontal to 0

begin iterating thorugh the data
  if it starts with forward increase it by the last unit
  if it starts with down, increase depth units
  if it starts with up, decrease depth units.

  times the two two together then return it
*/
const fs = require('fs');
const path = './course.txt'

function getDataFromText(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.log(err);
  }
}

function dive(course) {
  let depth = 0;
  let horizontal = 0;
  let aim = 0;

  course.forEach(course => {
    const splitCourse = course.split(' ');
    const amount = Number(splitCourse[1]);
    const direction = splitCourse[0];

    switch(direction) {
      case 'forward': 
        horizontal += amount;
        depth += (aim * amount);
        break;
      case 'down':
        aim += amount;
        break;
      case 'up':
        aim -= amount;
        break;
    }
  });

  return depth * horizontal;
}


const data = getDataFromText(path);

console.log(data);

console.log(dive(['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'])); // 150
console.log(dive(data));

