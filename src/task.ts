import {get} from "config";
import {fetch} from "./fetcher";
import {Entity} from "./model/entity";
import {writeReport} from "./resources";
import {Report} from "./model/report";

/**
 * Task
 * @class
 */
export class Task {
  private expectedUrl: string;
  private actualUrl: string;

  /**
   * @constructor
   * @param qs
   */
  public constructor(qs: string) {
    const expectedUrl: string = get('url.expected');
    const actual: string = get('url.actual');

    this.actualUrl = `${expectedUrl}${qs}`;
    this.expectedUrl = `${actual}${qs}`;
  }

  /**
   * test
   */
  public test() {
    Promise.all([
      fetch(this.actualUrl),
      fetch(this.expectedUrl)
    ]).then((result => {
      const actualEntity: Entity = new Entity(result[0]);
      const expectEntity: Entity = new Entity(result[1]);

      writeReport(new Report(actualEntity, expectEntity).print());
    }));
  }
}