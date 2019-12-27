import {createPatch} from "diff";
import {Entity} from "./entity";
import {appendFile} from "fs";
import * as rootPath from "app-root-path";

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
  public print(fileName: any): void {
    const patch: string = this.getPatchStream();

    appendFile(`${rootPath.path}/report/${fileName}.txt`, patch, (err)=> {
      console.log(err);
    });
    console.log(patch);
  }

  /**
   * getPatchStream
   */
  private getPatchStream(): string {
    return createPatch(
      `actual status: ${this.actual.status}, expect status: ${this.expect.status}`,
      this.actual.data, this.expect.data,
      `actual:${this.actual.requestUrl}`, `expect:${this.expect.requestUrl}`);
  }
}