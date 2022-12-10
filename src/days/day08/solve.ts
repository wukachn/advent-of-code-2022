import readFile from "../../utils/readFile";

const solve_exercises = async (filePath: string) => {
  let file = await readFile(filePath);
  const grid = file.split('\n').map((row) => row.split('').map((num) => parseInt(num)))

  let visible: number = (grid.length * 2) + (grid[0].length * 2) - 4
  let maxScenicScore = 0

  for (let row = 1; row < grid.length - 1; row++) {
    for (let column = 1; column < grid[0].length - 1; column++) {
      let isVisible: boolean = false
      const tree: number = grid[row][column]

      let upCount: number = 0
      let downCount: number = 0
      let leftCount: number = 0
      let rightCount: number = 0

      for (let up = row - 1; up >= 0; up--) {
        upCount += 1
        if (grid[up][column] >= tree) {
          break
        } else if (up === 0) {
          isVisible = true
        }
      }

      for (let down = row + 1; down < grid.length; down++) {
        downCount += 1
        if (grid[down][column] >= tree) {
          break
        } else if (down === grid.length - 1) {
          isVisible = true
        }
      }

      for (let left = column - 1; left >= 0; left--) {
        leftCount += 1
        if (grid[row][left] >= tree) {
          break
        } else if (left === 0) {
          isVisible = true
        }
      }

      for (let right = column + 1; right < grid[0].length; right++) {
        rightCount += 1
        if (grid[row][right] >= tree) {
          break
        } else if (right === grid[0].length - 1) {
          isVisible = true
        }
      }

      if (isVisible) {
        visible += 1
      }

      const scenicScore = upCount * downCount * leftCount * rightCount
      if (scenicScore > maxScenicScore) {
        maxScenicScore = scenicScore
      }
    }
  }
  console.log('Ex 1: ' + visible)
  console.log('Ex 2: ' + maxScenicScore)
}

solve_exercises('./input.txt')
