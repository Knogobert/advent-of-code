const fs = require('fs');
const input = fs.readFileSync('aoc-2020/day9/day9-input.txt', 'utf8');
// const cleanInput = [...Array(50).keys()].map(k => k + 1);
// const input = `35
// 20
// 15
// 25
// 47
// 40
// 62
// 55
// 65
// 95
// 102
// 117
// 150
// 182
// 127
// 219
// 299
// 277
// 309
// 576`;
// const preambleLength = 5;
const preambleLength = 25;

const cleanInput = input.split('\n').reduce((acc, number) => {
  return [ ...acc, parseInt(number) ];
}, []);

function checkValidity(preamble, checksum) {
  console.log('checking:', checksum)
  if (preamble.length === preambleLength) {
    const found = preamble.find((pre, index) => {
      return preamble.some((amble, lindex) => {
        if (index === lindex) return false;
        return amble + pre === checksum;
      })
    })
    return found !== undefined;
  }
  return false
}

const output = cleanInput.find((input, index) => {
  if (index < preambleLength) return false;
  const start = 0 - preambleLength + index;
  const end = index;
  const preamble = cleanInput.slice(start, end);
  const valid = checkValidity(preamble, input)

  if (valid) return false;
  console.log('valid:', valid)
  return true
})

console.log('output:', output);
