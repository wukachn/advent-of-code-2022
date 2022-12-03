import { readFile } from 'fs';

export default async (inputFilePath: string) => {
  let puzzleInput = '';
  try {
    puzzleInput = await new Promise<string>((resolve, reject) => {
      readFile(inputFilePath, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
    ;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  return puzzleInput
};
