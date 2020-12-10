const fs = require('fs');
// const input = fs.readFileSync('aoc-2020/day10/day10-input.txt', 'utf8');
const input = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

const cleanInput = input.split('\n').reduce((acc, number) => {
  return [ ...acc, parseInt(number) ];
}, []).sort((a,b) => a - b);


// const paths = cleanInput.reduce((acc, adapter, index, array) => {
//   return acc += 1
// }, 0)
// const output = paths.reduce((acc, path, index, array) => {
//   return acc += path
// }, 0)

// def part2(j):
//   if j == limit:
//       return 1
//   res = 0
//   if exists(j + 1):
//       res += part2(j + 1)
//   if exists(j + 2):
//       res += part2(j + 2)
//   if exists(j + 3):
//       res += part2(j + 3)
//   return res
const memo = { 0:0 };
function findPath(i, jolt) {
  console.log('memo:', memo)
  debugger;
  if (i in memo) return memo[i];

  if (i === cleanInput.length) memo[i] = 1
  if (cleanInput[i + 1] === jolt + 1) { memo[i] = memo[i] ? memo[i] + 1 : 1; return findPath(i, jolt + 1); }
  if (cleanInput[i + 2] === jolt + 2) { memo[i] = memo[i] ? memo[i] + 1 : 1; return findPath(i, jolt + 2); }
  if (cleanInput[i + 3] === jolt + 3) { memo[i] = memo[i] ? memo[i] + 1 : 1; return findPath(i, jolt + 3); }
  return 0;
}

const output = cleanInput.reduce((acc, joltage, index, array) => {
  return acc += findPath(index, joltage)
}, 0)


console.log('output:', output);
