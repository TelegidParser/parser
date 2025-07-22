import { readdirSync, readFileSync, writeFileSync } from "fs";
import * as iconv from 'iconv-lite';
import { join } from "path";
import { inPath, rawPath } from "../globals";

const convertFileEncoding = (
  inputFileName: string,
  sourceEncoding = 'windows-1251',
  targetEncoding: BufferEncoding = 'utf-8'
): void => {
  try {
    const win1251Data = readFileSync(join(rawPath, inputFileName));
    const data = iconv.decode(Buffer.from(win1251Data), 'win1251');
    writeFileSync(join(inPath, inputFileName), data);
    console.log(`File ${inputFileName} converted from ${sourceEncoding} to ${targetEncoding} successfully.`);
  } catch (error) {
    console.error('Error converting file:', error);
  }
}

const renameFiles = () => {
  const files = readdirSync(rawPath)

  for (const file of files) {
    convertFileEncoding(file)
  }
}

renameFiles()
