import {createReadStream, ReadStream, appendFile} from "fs";
import {createInterface } from 'readline';

export function readResources(callback: (line: string) => void): void {
  const path: string = __dirname+'/resources/resources.txt';

  const stream: ReadStream = createReadStream(path, 'utf-8');

  createInterface({input: stream}).on('line', (line) => {
    callback(line);
  });
}

export function writeReport(data: string) {
  console.log(data);
  appendFile(__dirname+'/report/result.txt', data, (err)=> {
    console.log(err);
  });
}