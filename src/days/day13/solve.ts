import readFile from "../../utils/readFile";

function equal(a1:any,a2:any) {
  return JSON.stringify(a1)==JSON.stringify(a2);
}

const compare = (first: any[], second: any[]): boolean => {
  if (second === undefined) {
    return false
  }
  if (typeof(first) == 'number' && typeof(second) == 'number') {
    return first < second
  }

  if (!Array.isArray(first)) {
    first = [first]
  }
  if (!Array.isArray(second)) {
    second = [second]
  }
  if (JSON.stringify(first) === JSON.stringify(second)) {
    return true
  }
  let i = 0
  for (i; i < first.length; i++) {
    const firstVal = first[i]
    const secondVal = second[i]
    if (!equal(firstVal, secondVal)) {
      return compare(firstVal, secondVal)
    }
  }
  return i < second.length
}


const solve = async (fileName: string) => {
  let file = await readFile(fileName);
  const pairs = file.split('\n\n').map((pair) => pair.split('\n').map((line) => JSON.parse(line)))
  let i = 1
  let total = 0
  pairs.forEach((pair) => {
    if (compare(pair[0], pair[1])){
      total += i
    }
    i += 1
  })
  console.log('Ex 1: ' + total) // 5185

  const decoderKeys = [[[2]], [[6]]]
  let all = file.replace('\n\n', '\n').split('\n\n').join('\n').split('\n').map((line) => JSON.parse(line))
  all.push(...decoderKeys)
  const sorted = all.sort(function compareFn(a: any[], b: any[]) {
    if (compare(a, b)){
      return -1
    } else {
      return 1
    }
  })
  console.log('Ex 2: ' + (sorted.indexOf(decoderKeys[0]) + 1) * (sorted.indexOf(decoderKeys[1]) + 1)) // 23751
}

solve('./input.txt')