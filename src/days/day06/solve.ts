import readFile from "../../utils/readFile";

const solve_ex1 = async () => {
  let file = await readFile(`./input.txt`);
  const puzzleInput = file.split('')
  let queue = puzzleInput.slice(0, 4)

  for (let i = 4; i < puzzleInput.length; i ++) {
    if (new Set(queue).size !== queue.length) {
      queue.shift()
      queue.push(puzzleInput[i])
    } else {
      console.log('Ex 1: ' + i)
      break
    }
  }
}

const solve_ex2 = async () => {
  let file = await readFile(`./input.txt`);
  const puzzleInput = file.split('')
  let queue = puzzleInput.slice(0, 14)

  for (let i = 14; i < puzzleInput.length; i ++) {
    if (new Set(queue).size !== queue.length) {
      queue.shift()
      queue.push(puzzleInput[i])
    } else {
      console.log('Ex 2: ' + i)
      break
    }
  }
}

solve_ex1()
solve_ex2()