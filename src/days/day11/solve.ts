import readFile from "../../utils/readFile";

class Monkey {
  starting: number[];
  operation: string[];
  test: number;
  ifTrue: number;
  ifFalse: number;

  public constructor(starting: number[],
                     operation: string[],
                     test: number,
                      ifTrue: number,
                      ifFalse: number) {
    this.starting = starting;
    this.operation = operation;
    this.test = test;
    this.ifTrue = ifTrue;
    this.ifFalse = ifFalse;
  }
}

const create_monkeys = async (filePath: string) => {
  let file = await readFile(filePath);
  const blocks = file.split('\n\n').map((row) => row.split('\n'))

  let monkeys: Monkey[] = []

  blocks.forEach((block) => {
    const starting = block[1].split('  Starting items: ')[1].split(', ').map((number) => parseInt(number))
    const operation = block[2].split('  Operation: new = ')[1].split(' ')
    const test = parseInt(block[3].split('  Test: divisible by ')[1])
    const ifTrue = parseInt(block[4][block[4].length - 1])
    const ifFalse = parseInt(block[5][block[5].length - 1])

    monkeys.push(new Monkey(starting, operation, test, ifTrue, ifFalse))
  })
  return monkeys
}

const getWorryModNum = (monkeys: Monkey[]) => {
  let num = 1
  monkeys.forEach((monkey) => {
    num *= monkey.test
  })
  return num
}

const solve = async (filePath: string, ex: number) => {
  let monkeys = await create_monkeys('./input.txt')

  let inspected = Array(monkeys.length).fill(0)

  const worryNum = getWorryModNum(monkeys)

  const rounds = (ex === 1) ? 20 : 10000

  for (let round = 0; round < rounds; round ++){
    let monkeyNum = 0
    monkeys.forEach((monkey) => {
      let item = monkey.starting.shift()
      while (item !== undefined){
        const op = monkey.operation
        if (op[1] === '*') {
          item = item * ((op[2] === 'old') ? item : parseInt(op[2]))
        }
        else if (op[1] === '+') {
          item = item + ((op[2] === 'old') ? item : parseInt(op[2]))
        }
        inspected[monkeyNum] += 1

        if (ex === 1){
          item = Math.floor(item / 3)
        } else {
          item = Math.floor(item % worryNum)
        }

        const testResult = item % monkey.test
        if (testResult === 0) {
          monkeys[monkey.ifTrue].starting.push(item)
        } else {
          monkeys[monkey.ifFalse].starting.push(item)
        }

        item = monkey.starting.shift()
      }
      monkeyNum += 1
    })
  }
  inspected.sort(function(a, b) {
    return b - a;
  });
  return inspected[0] * inspected[1]

}

const solve_ = async (fileName: string) => {
  console.log('Ex 1: ' + await solve(fileName, 1))
  console.log('Ex 2: ' + await solve(fileName, 2))
}

solve_('./input.txt')