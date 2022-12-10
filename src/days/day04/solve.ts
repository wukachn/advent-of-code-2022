import readFile from "../../utils/readFile";

function range(x: number, y: number) {
  var numbers = [];
  for (var i = x; i <= y; i++) {
    numbers.push(i);
  }
  return numbers;
}

const solve_ex1 = async () => {
  const puzzleInput = await readFile(`./input.txt`);
  const pairs = puzzleInput.split('\n')

  const splitPairs = pairs.map((pair) => pair.split(',').map((individual) => individual.split('-')))

  const rangePairs = splitPairs.map((pair) => pair.map((person) =>
    range(parseInt(person[0]), parseInt(person[1]))
  ))
  let total = 0
  rangePairs.forEach((pair) => {
    if (pair[0].every(p => pair[1].includes(p)) || pair[1].every(p => pair[0].includes(p))) {
      total += 1
    }
  })
  console.log('Ex 1: ' + total)
}

const solve_ex2 = async () => {
  const puzzleInput = await readFile(`./input.txt`);
  const pairs = puzzleInput.split('\n')

  const splitPairs = pairs.map((pair) => pair.split(',').map((individual) => individual.split('-')))

  const rangePairs = splitPairs.map((pair) => pair.map((person) =>
      range(parseInt(person[0]), parseInt(person[1]))
  ))
  let total = 0
  rangePairs.forEach((pair) => {
    if (pair[0].some(r=> pair[1].includes(r)) || pair[1].some(r=> pair[0].includes(r))) {
      total += 1
    }
  })
  console.log('Ex 2: ' + total)
}

solve_ex1()
solve_ex2()