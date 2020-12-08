const fs = require('fs');
const input = fs.readFileSync('aoc-2020/day8/day8-input.txt', 'utf8');
// const input = `nop +0
// acc +1
// jmp +4
// acc +3
// jmp -3
// acc -99
// acc +1
// jmp -4
// acc +6`;
let accumulator = 0;

const instructions = input.split('\n').reduce((acc, instruction) => {
  const [operation, argument] = instruction.split(' ');
  return [ ...acc, { operation, argument: parseInt(argument) } ];
}, []);

function runInstruction(index, instructions) {
  const instruction = instructions[index];
  console.log('instruction:', instruction)
  if (instruction.ran) return;
  switch (instruction.operation) {
    case 'acc':
      accumulator += instruction.argument;
      instructions[index].ran = true;
      return runInstruction(index + 1, instructions);
    case 'jmp':
      instructions[index].ran = true;
      return runInstruction(index + instruction.argument, instructions);

    case 'nop':
    default:
      instructions[index].ran = true;
      return runInstruction(index + 1, instructions);
  }
}

runInstruction(0, instructions);

console.log('output:', accumulator);
