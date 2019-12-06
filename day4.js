const _ = require("lodash");

const input = "278384-824795";
const [start, end] = input.split("-").map(_.parseInt);

const hasSameAdjacent = str =>
  _.range(0, str.length - 1).some(i => str[i] === str[i + 1]);

const isNotDecreasing = str => {
  for (let i = 0; i < str.length - 1; i++) {
    const [firstNum, secondNum] = Array.from(str)
      .slice(i, i + 2)
      .map(_.parseInt);
    if (firstNum > secondNum) {
      return false;
    }
  }
  return true;
};

// Less proud of this one, could probably be more concise.
const hasPairsNoTriplets = str => {
  const pairs = [];

  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      pairs.push(`${str[i]}${str[i]}`);
    }
  }

  const pairCount = pairs.reduce((acc, curr) => {
    if (pairs.includes(curr)) {
      const count = !!acc[curr] ? acc[curr] : 0;
      return {
        ...acc,
        [curr]: count + 1,
      };
    }
  }, {});

  return Object.values(pairCount).includes(1);
};

let possiblePasswords = _.range(start, end).filter(num =>
  [hasSameAdjacent, isNotDecreasing].every(fn => fn(num.toString())),
);

possiblePasswords = possiblePasswords.filter(password =>
  hasPairsNoTriplets(password.toString()),
);

console.log(possiblePasswords.length);
