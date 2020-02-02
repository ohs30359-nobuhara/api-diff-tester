import {createPatch} from "diff";
import {Entity} from "./entity";
import {appendFile} from "fs";
import * as rootPath from "app-root-path";
import {exec} from "child_process";
import {get} from "config";
/**
 * Report
 * @class
 */
export class Report {
  private readonly actual: Entity;
  private readonly expect: Entity;

  /**
   * @constructor
   * @param actual
   * @param expect
   */
  public constructor(actual: Entity, expect: Entity) {
    this.actual = actual;
    this.expect = expect;
  }

  /**
   * print
   */
  public async print(fileName: any): Promise<void> {
    const patch: string = await this.getPatchStream();

    appendFile(`${rootPath.path}/report/${fileName}.txt`, patch, (err)=> {
      console.log(err);
    });
    console.log(patch);
  }

  /**
   * getPatchStream
   */
  private async getPatchStream(): Promise<string> {
    const sort: boolean = get('sort');

    const actualData: string = (sort)? await this.sort(this.actual.data) : this.actual.data;
    const expectData: string = (sort)? await this.sort(this.expect.data) : this.expect.data;

    return createPatch(
      `actual status: ${this.actual.status}, expect status: ${this.expect.status}`,
      actualData, expectData,
      `actual:${this.actual.requestUrl}`, `expect:${this.expect.requestUrl}`);
  }

  private async sort(stream: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const proc: any = exec('sort', (e, stdout, stderr) => {
        if(e) {
          return reject(e);
        }
        return resolve(stdout);
      });

      proc.stdin.write(stream);
      proc.stdin.end();
    })
  }
}