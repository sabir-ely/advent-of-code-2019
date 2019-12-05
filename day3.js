const { readFileSync } = require("fs");
const _ = require("lodash");

const parseInstruction = instruction => ({
  direction: instruction[0],
  steps: _.parseInt(instruction.slice(1))
});

const readInput = filename =>
  readFileSync(filename, "utf8")
    .split("\n")
    .map(line => line.split(",").map(parseInstruction));

const makeStep = (direction, currentLocation) => {
  if (direction === "U") currentLocation.y++;
  else if (direction === "D") currentLocation.y--;
  else if (direction === "R") currentLocation.x++;
  else if (direction === "L") currentLocation.x--;
  else {
    console.log("Something went wrong lol :)");
  }
};

const generatePath = wire => {
  const currentLocation = { x: 0, y: 0 };
  const visited = [];

  wire.forEach(({ direction, steps }) => {
    _.range(steps).forEach(__ => {
      makeStep(direction, currentLocation);
      visited.push(`${currentLocation.x},${currentLocation.y}`);
    });
  });
  return visited;
};

const findSmallestDistance = locations =>
  _.min(
    locations.map(location =>
      _.sum(
        location
          .split(",")
          .map(_.parseInt)
          .map(Math.abs)
      )
    )
  );

const findSmallestSteps = (paths, intersections) =>
  _.min(
    intersections.map(intersection =>
      paths.reduce(
        (acc, curr) =>
          // Add 1 because array index will be one step off (arrays start at 0)
          acc + curr.findIndex(loc => loc === intersection) + 1,
        0
      )
    )
  );

const input = readInput("./inputs/day3.txt");
const paths = input.map(generatePath);
const intersections = _.intersection(...paths);

console.log(findSmallestDistance(intersections));
console.log(findSmallestSteps(paths, intersections));
