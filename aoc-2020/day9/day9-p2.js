const fs = require('fs');
const input = fs.readFileSync('aoc-2020/day9/day9-input.txt', 'utf8');

const checksum = 85848519;

const cleanInput = input.split('\n').reduce((acc, number) => {
  return [ ...acc, parseInt(number) ];
}, []);

function sumRange(range) {
  return range.reduce((acc, num) => acc += num,0);
}

// 0, 1
// 0, 1, 2...
// 1, 2
// 1, 2, 3...
const output = cleanInput.find((input, index) => {
  let min = 0;
  let max = 0;
  const valid = cleanInput.find((rando, lindex) => {
    const rangeLength = 2 +lindex;
    if (rangeLength > cleanInput.length) return false;
    const start = index;
    const end = index + rangeLength;
    const range = cleanInput.slice(start, end);
    min = Math.min(...range);
    max = Math.max(...range);
    return sumRange(range) === checksum;
  });

  if (!valid) return false;
  console.log('valid:', valid)
  console.log('solution:', min + max )
  return true
})

console.log('output:', output);

// ? Find the range that sums up to 85848519, then return the sum of the first and last number in that range
// 3626169+4267108+3421814+3467007+3562406+3707521+4253061+6662960+3991536+4459266+5533118+9992384+5023563+7013898+5387208+5704255+5775245 = 85848519