import readFile from "../../utils/readFile";

const solve_ex1 = async () => {
  const puzzleInput = await readFile(`./input.txt`);
  const bags = puzzleInput.split('\n')
  const BreakException: Error = {name: 'break', message: 'break'}
  let total = 0
  const bagsWithSplit = bags.map((line) => [line.slice(0, line.length / 2), line.slice(line.length / 2, line.length)]);
  bagsWithSplit.forEach((bag) => {
    try {
      bag[0].split('').forEach((character) => {
        if (bag[1].includes(character)) {
          const charCode = (character === character.toUpperCase()) ? character.charCodeAt(0)-38 : character.charCodeAt(0)-96
          total += charCode
          throw BreakException
        }
      })
    } catch (e) {}
  })
  console.log(total)
}

const solve_ex2 = async () => {
  const puzzleInput = await readFile(`./input.txt`);
  const bags = puzzleInput.split('\n')

  const groups = [];
  for (let i = 0; i < bags.length; i += 3) {
    groups.push([bags[i], bags[i+1], bags[i+2]])
  }
  const BreakException: Error = {name: 'break', message: 'break'}
  let total = 0
  groups.forEach((group) => {
    try {
      group[0].split('').forEach((character) => {
        if (group[1].includes(character) && group[2].includes(character)) {
          const charCode = (character === character.toUpperCase()) ? character.charCodeAt(0)-38 : character.charCodeAt(0)-96
          total += charCode
          throw BreakException
        }
      })
    } catch (e) {}
  })
  console.log(total)
}

solve_ex1()
solve_ex2()
