import readFile from "../../utils/readFile";

const solve = async (fileName: string) => {
  let file = await readFile(fileName);
  const blobs = file.split('\n').map((line) => line.split(',').map((number) => parseInt(number)))

  let surface = 6 * blobs.length
  blobs.forEach((blob) => {
    blobs.forEach((checkblob) => {
      if (checkblob !== blob) {
        if (Math.abs(blob[0] - checkblob[0])===1 && blob[1] === checkblob[1] && blob[2] === checkblob[2]) {
          surface -= 1
        }
        if (Math.abs(blob[1] - checkblob[1])===1 && blob[0] === checkblob[0] && blob[2] === checkblob[2]) {
          surface -= 1
        }
        if (Math.abs(blob[2] - checkblob[2])===1 && blob[1] === checkblob[1] && blob[0] === checkblob[0]) {
          surface -= 1
        }
      }
    })
  })
  console.log('Ex 1: ' + surface) // 3396
}

solve('./input.txt')