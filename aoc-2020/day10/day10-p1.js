const fs = require('fs');
const input = fs.readFileSync('aoc-2020/day10/day10-input.txt', 'utf8');
// const input = `28
// 33
// 18
// 42
// 31
// 14
// 46
// 20
// 48
// 47
// 24
// 23
// 49
// 45
// 19
// 38
// 39
// 11
// 1
// 32
// 25
// 35
// 8
// 17
// 7
// 9
// 4
// 2
// 34
// 10
// 3`;

const cleanInput = input.split('\n').reduce((acc, number) => {
  return [ ...acc, parseInt(number) ];
}, []).sort((a,b) => a - b);

const diffs = cleanInput.reduce((acc, adapter, index, array) => {
  const diff = index === 0 ? adapter : adapter - array[index-1];
  return [...acc, diff]
}, [])

diffs.push(3); // Add device built-in joltage

const lowHi = diffs.reduce((acc, diff) => {
  const low = diff === 1 ? acc.low + 1 : acc.low;
  const hi = diff === 3 ? acc.hi + 1 : acc.hi;
  return { low, hi };
}, { low: 0, hi: 0 })

const output = lowHi.low * lowHi.hi;

console.log('output:', output);
