import readFile from "../../utils/readFile";

const shouldBeLight = (cycle: number, register: number) => {
  cycle = (cycle - 1) % 40
  if (Math.abs(cycle - register) <= 1) {
    return true
  }
  return false
}

const getCRToutput = async (filePath: string) => {
  let file = await readFile(filePath);
  const commands = file.split('\n').map((row) => row.split(' '))

  let cycle: number = 0
  let register: number = 1
  let row = ''

  commands.forEach((command) => {
    if (command[0] === 'noop'){
      cycle += 1
      if (shouldBeLight(cycle, register)) {
        row += '#'
      } else {
        row += '.'
      }
      if (cycle % 20 === 0) {
        console.log(row)
        row = ''
      }
    } else {
      for (let i = 0; i < 2; i++){
        cycle += 1
        if (shouldBeLight(cycle, register)) {
          row += '#'
        } else {
          row += '.'
        }
        if (i === 1) {
          register += parseInt(command[1])
        }
        if (cycle % 40 === 0) {
          console.log(row)
          row = ''
        }
      }
    }
  })
}

const getSignalStrength = async (filePath: string) => {
  let file = await readFile(filePath);
  const commands = file.split('\n').map((row) => row.split(' '))

  let cycle: number = 0
  let register: number = 1
  let signalStrength: number[] = []

  commands.forEach((command) => {
    if (command[0] === 'noop'){
      cycle += 1
      if ((cycle - 20) % 40 === 0 && cycle <= 220) {
        signalStrength.push(cycle * register)
      }
    } else {
      for (let i = 0; i < 2; i++){
        cycle += 1
        if ((cycle - 20) % 40 === 0 && cycle <= 220) {
          signalStrength.push(cycle * register)
        }
        if (i === 1) {
          register += parseInt(command[1])
        }
      }
    }
  })

  return signalStrength.reduce((a: number, v: number) => a + v ,0)
}

const solve = async (fileName: string) => {
  console.log('Ex 1: ' + await getSignalStrength(fileName))
  console.log('Ex 2:')
  await getCRToutput(fileName)
}

solve('./input.txt')