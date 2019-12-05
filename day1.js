const { readFileSync } = require("fs");
const _ = require("lodash");

const input = readFileSync("./inputs/day1.txt", "utf8")
  .split("\n")
  .map(_.parseInt)
  .filter(_.negate(_.isNaN));

const getFuelReqs = mass => _.floor(mass / 3) - 2;

const result = input.reduce((acc, curr) => acc + getFuelReqs(curr), 0);
console.log(result);

const recursivelyGetFuelReqs = mass => {
  const fuelReqs = getFuelReqs(mass);
  return getFuelReqs(fuelReqs) <= 0
    ? fuelReqs
    : fuelReqs + recursivelyGetFuelReqs(fuelReqs);
};

const result2 = input.reduce(
  (acc, curr) => acc + recursivelyGetFuelReqs(curr),
  0,
);
console.log(result2);
