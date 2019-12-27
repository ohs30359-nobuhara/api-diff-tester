import {createReadStream, ReadStream} from "fs";
import {createInterface } from 'readline';
import * as rootPath from 'app-root-path';

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
    const path: string = `${rootPath.path}/config/resources/resources.txt`;
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
