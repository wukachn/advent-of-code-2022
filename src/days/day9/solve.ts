import readFile from "../../utils/readFile";

const zeros = (m: number, n: number) => [...Array(m)].map(e => Array(n).fill(0));

const solve_exercises = async (filePath: string) => {
  let file = await readFile(filePath);
  const grid = file.split('\n').map((row) => row.split(' '))
  const visited: number[][] = zeros(800,800)

  let head: [number, number] = [400, 400]
  let tail: [number, number] = [400, 400]

  visited[tail[0]][tail[1]] = 1
  grid.forEach((line) => {
    const direction = line[0]
    let steps = parseInt(line[1])
    for (steps; steps>0; steps--) {
      // Move Head
      if (direction === 'U') {
        head[0] -= 1
      } else if (direction === 'D') {
        head[0] += 1
      } else if (direction === 'L') {
        head[1] -= 1
      } else if (direction === 'R') {
        head[1] += 1
      }

      // Move Tail
      // Left or Right
      if (head[0] === tail[0]) {
        if (head[1] - tail[1] > 1) {
          tail[1] = head[1] - 1
        } else if (tail[1] - head[1] > 1) {
          tail[1] = head[1] + 1
        }
      }
      // Up or Down
      else if (head[1] === tail[1]) {
        if (head[0] - tail[0] > 1) {
          tail[0] = head[0] - 1
        } else if (tail[0] - head[0] > 1) {
          tail[0] = head[0] + 1
        }
      }
      // Up or Down Diagonal
      else if (head[0] - tail[0] > 1) {
        tail[0] = head[0] - 1
        tail[1] = head[1]
      } else if (tail[0] - head[0] > 1) {
        tail[0] = head[0] + 1
        tail[1] = head[1]
      }
      // Left or Right Diagonal
      else if (head[1] - tail[1] > 1) {
        tail[1] = head[1] - 1
        tail[0] = head[0]
      } else if (tail[1] - head[1] > 1) {
        tail[1] = head[1] + 1
        tail[0] = head[0]
      }

      visited[tail[0]][tail[1]] = 1
    }
  })
  let totalVisited = visited.map((row:number[]) => row.reduce((a: number, v: number) => a + v ,0)).reduce((a: number, v: number) => a + v ,0)
  console.log('Ex 1: ' + totalVisited) // 6357
}

solve_exercises('./input.txt')
