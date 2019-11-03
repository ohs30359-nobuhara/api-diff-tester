import {createPatch} from "diff";
import {Entity} from "./entity";

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
  public print(): string {
    return createPatch(
      ``,
      this.actual.data, this.expect.data,
      `actual:${this.actual.requestUrl}`, `expect:${this.expect.requestUrl}`);
  }
}