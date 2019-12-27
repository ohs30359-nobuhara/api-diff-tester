import {createReadStream, ReadStream, appendFile} from "fs";
import {createInterface } from 'readline';

/**
 * Resources
 * @class
 */
export class Resources {
  private readonly stream: ReadStream;

  /**
   * @constructor
   */
  public constructor() {
    const path: string = __dirname+'/resources/resources.txt';
    this.stream = createReadStream(path, 'utf-8');
  }

  /**
   * read
   * @param callback
   */
  public read(callback: (line: string) => void): void {
    createInterface({input: this.stream}).on('line', (line) => {
      callback(line);
    });
  }

  /**
   * close
   */
  public close(callback: () => void) {
    createInterface({input: this.stream}).on('close', () => {
      callback();
    })
  }
}

// TODO: Reportclass に書き出す
export function writeReport(data: string) {
  console.log(data);
  appendFile(__dirname+'/report/result.txt', data, (err)=> {
    console.log(err);
  });
}