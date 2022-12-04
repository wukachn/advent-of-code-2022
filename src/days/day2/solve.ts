import readFile from "../../utils/readFile";

const moveToInt: Record<string, number> = {
  'X': 1,
  'Y': 2,
  'Z': 3}

const moveToWin: Record<string, string> = {
  'A': 'Y',
  'B': 'Z',
  'C': 'X'}

const moveToLose: Record<string, string> = {
  'A': 'Z',
  'B': 'X',
  'C': 'Y'}

const WIN = 6
const DRAW = 3
const LOSS = 0

const neededOutcome: Record<string, number> = {
  'X': LOSS,
  'Y': DRAW,
  'Z': WIN
}

const moveToDraw: Record<string, string> = {
  'A': 'X',
  'B': 'Y',
  'C': 'Z'}

const solve_ex1 = async () => {
  const puzzleInput = await readFile(`./input.txt`);

  const games = puzzleInput.split('\n').map((line) => line.split(' '));

  let total = 0
  games.forEach((game) => {
   if (moveToWin[game[0]] == game[1]) {
      total += WIN + moveToInt[game[1]]
    } else if (moveToLose[game[0]] == game[1]) {
      total += LOSS + moveToInt[game[1]]
    } else {
      total += DRAW + moveToInt[game[1]]
    }
  })

  console.log('Ex 1: ' + total)
}

const solve_ex2 = async () => {
  const puzzleInput = await readFile(`./input.txt`);

  const games = puzzleInput.split('\n').map((line) => line.split(' '));

  let total = 0
  games.forEach((game) => {
    if (neededOutcome[game[1]] == LOSS) {
      total += LOSS + moveToInt[moveToLose[game[0]]]
    } else if (neededOutcome[game[1]] == WIN) {
      total += WIN + moveToInt[moveToWin[game[0]]]
    } else {
      total += DRAW + moveToInt[moveToDraw[game[0]]]
    }
  })

  console.log('Ex 2: ' + total)
}

solve_ex1()
solve_ex2()