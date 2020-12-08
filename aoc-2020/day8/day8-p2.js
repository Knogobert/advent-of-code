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

const originalInstructions = input.split('\n').reduce((acc, instruction) => {
  const [operation, argument] = instruction.split(' ');
  return [ ...acc, { operation, argument: parseInt(argument), changed: false, tried: false, ran: false } ];
}, []);

function runInstruction(index, instructions) {
  const instruction = instructions[index];
  // console.log('instruction:', instruction)
  if (instruction === undefined) return true; // EOF
  if (instruction.ran) return false;
  switch (instruction.operation) {
    case 'acc':
      accumulator += instruction.argument;
      instructions[index].ran = true;
      return runInstruction(index + 1, instructions);
    case 'jmp':
      instructions[index].ran = true;
      return runInstruction(index + instruction.argument, instructions);
    case 'nop':
      instructions[index].ran = true;
      return runInstruction(index + 1, instructions);
    default:
      return true;
  }
}
const possibles = originalInstructions.filter((ins) => ins.operation === 'jmp' || ins.operation === 'nop');

let trial = runInstruction(0, originalInstructions);
let newInstructions = [];

possibles.find(possible => {
  let hasMadeChange = false;
  console.log('accumulator:', accumulator)
  if (trial === false) {
    accumulator = 0;
    newInstructions = originalInstructions.map(ins => {
      if (hasMadeChange === false) {
        if (ins.changed === false && ins.tried === false) {
          // Make the change
          switch(ins.operation) {
            case 'jmp':
              ins.operation = 'nop';
              ins.changed = true;
              ins.tried = true;
              hasMadeChange = true;
              break;
            case 'nop':
              ins.operation = 'jmp';
              ins.changed = true;
              ins.tried = true;
              hasMadeChange = true;
              break;
            default: break;
          }
        } else if (ins.changed === true && ins.tried === true) {
          // Revert the change
          switch(ins.operation) {
            case 'jmp':
              ins.operation = 'nop';
              ins.changed = false;
              break;
            case 'nop':
              ins.operation = 'jmp';
              ins.changed = false;
              break;
            default: break;
          }
        }
      }
      ins.ran = false;
      return ins;
    });

    trial = runInstruction(0, newInstructions);
    return false;
  }

  // Trials over
  console.log('correctInstructions:', newInstructions)
  console.log('correctly changed index:', newInstructions.findIndex(ins => ins.changed))
  return true;
});

console.log('output:', accumulator);
