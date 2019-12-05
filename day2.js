const { readFileSync } = require("fs");
const _ = require("lodash");

const input = readFileSync("./inputs/day2.txt", "utf8")
  .split(",")
  .map(_.parseInt)
  .filter(_.negate(_.isNaN));

const intcode = (noun, verb) => {
  const codes = _.clone(input);

  codes[1] = noun;
  codes[2] = verb;

  for (let pos of _.range(0, codes.length, 4)) {
    const [opcode, first, second, result] = codes.slice(pos, pos + 4);

    if      (opcode === 1) codes[result] = codes[first] + codes[second];
    else if (opcode === 2) codes[result] = codes[first] * codes[second];
    else if (opcode === 99) break;
    else {
      console.log("something went wrong lol :)");
      break;
    }
  }
  return codes[0];
};

for (let noun of _.range(100)) {
  for (let verb of _.range(100)) {
    if (intcode(noun, verb) === 19690720) {
      console.log(100 * noun + verb);
      return;
    }
  }
}
