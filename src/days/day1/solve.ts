import readFile from "../../utils/readFile";

const solve_ex1 = async () => {
  const puzzleInput = await readFile(`./input.txt`);

  const max = Math.max(...puzzleInput.split('\n\n').map((elf) => elf.split('\n').reduce((acc, food) => acc + parseInt(food), 0)));

  console.log('Ex 1: ' + max)
}

const solve_ex2 = async () => {
  const puzzleInput = await readFile(`./input.txt`);

  const desc = puzzleInput.split('\n\n').map((elf) => elf.split('\n').reduce((acc, food) => acc + parseInt(food), 0)).sort((a, b) => (a > b ? -1 : 1));
  const max = desc[0] + desc[1] + desc[2]

  console.log('Ex 2: ' + max)
}

solve_ex1()
solve_ex2()