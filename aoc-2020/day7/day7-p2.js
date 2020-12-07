const fs = require("fs");
const input = fs.readFileSync("./2020/sven/input.txt", "utf8");
// const input = `shiny gold bags contain 2 dark red bags.
// dark red bags contain 2 dark orange bags.
// dark orange bags contain 2 dark yellow bags.
// dark yellow bags contain 2 dark green bags.
// dark green bags contain 2 dark blue bags.
// dark blue bags contain 2 dark violet bags.
// dark violet bags contain no other bags.`;

const bagRegex = /(\d)+\s([\w\s\w])*(?=\sbag)/g;
let accumulator = 0;

const cleanBags = input.split("\n").reduce((recepticles, ruleset) => {
  // console.log('ruleset:', ruleset)
  const [holder, rest] = ruleset.split(" bags contain ");
  const matches = rest.match(bagRegex) || [];
  const contains = matches.reduce((obj, match) => {
    return { ...obj, [match.substring(2)]: parseInt(match.charAt(0)) };
  }, {});

  return { ...recepticles, [holder]: contains };
}, {});

function checkWithinBag(bagColor, multiplier = 1, acc = 0) {
  const bagContains = Object.entries(cleanBags).find(
    ([key, val]) => key === bagColor
  );

  Object.entries(bagContains[1]).forEach(([key, val]) => {
    //accumulator += 1 + 1 + (val && val !== 0 ? checkWithinBag(key) * val : 0);
    acc += val * multiplier;
    if (val !== 0) {
      acc += checkWithinBag(key, multiplier * val);
    }
  });
  return acc;
}

const shinyGoldContainers = checkWithinBag("shiny gold", 1, 0);

console.log("cleanBags:", cleanBags);
console.log("shinyGoldContainers:", shinyGoldContainers);
console.log("accumulator:", accumulator); // 80902
