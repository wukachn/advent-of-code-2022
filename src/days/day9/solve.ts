import readFile from "../../utils/readFile";

const zeros = (m: number, n: number) => [...Array(m)].map(e => Array(n).fill(0));

const update_tail = (head: number[], tail: number[]) => {
  if (Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1) {
    return tail
  }
  if (tail[0] < head[0]) {
    tail[0] += 1
  }
  if (tail[0] > head[0]) {
    tail[0] -= 1
  }
  if (tail[1] < head[1]) {
    tail[1] += 1
  }
  if (tail[1] > head[1]) {
    tail[1] -= 1
  }
  return [tail[0], tail[1]]

}

const getVisited = async (filePath: string, ropeLength: number) => {
  let file = await readFile(filePath);
  const grid = file.split('\n').map((row) => row.split(' '))
  const visited: number[][] = zeros(800,800)
  let rope: number[][] = []
  for (ropeLength; ropeLength>0;ropeLength--){
    rope.push([400, 400])
  }

  visited[rope[0][0]][rope[0][1]] = 1
  grid.forEach((line) => {
    const direction = line[0]
    let steps = parseInt(line[1])
    for (steps; steps>0; steps--) {
      // Move Head
      if (direction === 'U') {
        rope[0][0] -= 1
      } else if (direction === 'D') {
        rope[0][0] += 1
      } else if (direction === 'L') {
        rope[0][1] -= 1
      } else if (direction === 'R') {
        rope[0][1] += 1
      }

      for (let i = 0; i<rope.length - 1; i++) {
        // Move Tail
        rope[i+1] = update_tail(rope[i], rope[i+1])
      }
      visited[rope[rope.length-1][0]][rope[rope.length-1][1]] = 1
    }
  })
  const visitedTotal = visited.map((row:number[]) => row.reduce((a: number, v: number) => a + v ,0)).reduce((a: number, v: number) => a + v ,0)
  return visitedTotal
}

const solve = async (fileName: string) => {
  console.log('Ex 1: ' + await getVisited(fileName, 2))
  console.log('Ex 2: ' + await getVisited(fileName, 10))
}

solve('./input.txt')