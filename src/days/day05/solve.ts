import readFile from "../../utils/readFile";

function getStacks(stack: string) {
  let blocks = stack.split('\n')
  blocks.pop()
  blocks = blocks.map((line) => line.split('[').join(' ').split(']').join(' ')).reverse()

  const side = blocks[0].split('').map((x,i) => blocks.map(x => x[i]))
  for(let i = side.length - 1; i >= 0; i--){
    for(let j = side[i].length - 1; j >= 0; j--) {
      const popped = side[i].pop()
      if (!(popped == undefined || popped == ' ')) {
        side[i].push(popped)
        break
      }
    }
    if(side[i].length == 0){
      side.splice(i, 1);
    }
  }

  return side
}

const solve_ex1 = async () => {
  const puzzleInput = await readFile(`./input.txt`);
  const half = puzzleInput.split('\n\n')

  let stacks = getStacks(half[0])

  const moves = half[1].split('\n').map((line) => line.split('move ').join('').split(' from ').join(',').split(' to ').join(',').split(',').map((s) => parseInt(s)))

  moves.forEach((move) => {
    let crates = stacks[move[1]-1].splice(-(move[0])).reverse()
    stacks[move[2]-1].push(...crates)
  })

  let message = ""
  stacks.forEach((place) => {
    const letter = place[place.length-1]
    if (letter !== undefined) {
      message += letter
    }
  })

  console.log('Ex 1: ' + message)
}

const solve_ex2 = async () => {
  const puzzleInput = await readFile(`./input.txt`);
  const half = puzzleInput.split('\n\n')

  let stacks = getStacks(half[0])

  const moves = half[1].split('\n').map((line) => line.split('move ').join('').split(' from ').join(',').split(' to ').join(',').split(',').map((s) => parseInt(s)))

  moves.forEach((move) => {
    let crates = stacks[move[1]-1].splice(-(move[0]))
    stacks[move[2]-1].push(...crates)
  })

  let message = ""
  stacks.forEach((place) => {
    const letter = place[place.length-1]
    if (letter !== undefined) {
      message += letter
    }
  })

  console.log('Ex 2: ' + message)
}

solve_ex1()
solve_ex2()