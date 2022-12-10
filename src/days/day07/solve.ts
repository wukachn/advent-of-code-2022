import readFile from "../../utils/readFile";

class Directory {
  name!: string;
  parentDir!: Directory | null;
  children: Record<string, (File|Directory)> = {};

  public constructor(name: string, parentDir: Directory | null) {
    this.name = name;
    this.parentDir = parentDir;
  }
}

class File {
  name!: string;
  parentDir!: Directory;
  size!: number;

  public constructor(name: string, parentDir: Directory, size: number) {
    this.name = name;
    this.parentDir = parentDir;
    this.size = size;
  }
}

const BreakException: Error = {name: 'break', message: 'break'}

const directorySizes: number[] = []

const generateDirectorySizes = (dir: Directory) => {
  let dirTotal = 0
  for (const key in dir.children) {
    const child = dir.children[key];
    if (child instanceof File) {
      dirTotal += child.size
    } else {
      dirTotal += generateDirectorySizes(child)
    }
  }
  directorySizes.push(dirTotal)
  return dirTotal
}

const create_file_system = async (filePath: string) => {
  let file = await readFile(filePath);
  const blocks = file.split('\n$ cd ').map((block) => block.split('\n')).map((block) => {
    block.splice(1, 1)
    return block
  });

  let fileSystem = new Directory('/', null)
  let currentDir: Directory = fileSystem

  blocks[0].shift()
  blocks.forEach((block) => {
    try {
      block.forEach((result) => {
        const splitRes = result.split(' ')
        if (splitRes[0] === '..') {
          const parentDir = currentDir.parentDir
          if (parentDir !== null) {
            currentDir = parentDir
            throw BreakException
          }
        }
        if (splitRes.length === 1) {
          let currentChild = currentDir.children[splitRes[0]]
          if (currentChild instanceof Directory) {
            currentDir = currentChild
          }
        } else {
          if (splitRes[0] === 'dir') {
            currentDir.children[splitRes[1]] = new Directory(splitRes[1], currentDir)
          } else {
            currentDir.children[splitRes[1]] = new File(splitRes[1], currentDir, parseInt(splitRes[0]))
          }
        }
      })
    } catch (e) {}
  })
  return fileSystem
}

const solve_exercises = async () => {
  const fileSystem = await create_file_system('./input.txt')
  generateDirectorySizes(fileSystem)
  directorySizes.sort(function(a, b) {
    return b - a;
  });

  const atMostOneHundoThous = [...directorySizes].filter((size) => (size <= 100000))
  console.log('Ex 1: ' + atMostOneHundoThous.reduce((a, v) => a + v ,0))

  const bigEnough = 30000000 - (70000000 - directorySizes[0])
  const deleteCandidates = [...directorySizes].filter((size) => (size >= bigEnough))
  console.log('Ex 2: ' + deleteCandidates[deleteCandidates.length - 1])
}

solve_exercises()
