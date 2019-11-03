import {readResources, writeReport} from "./resources";
import {fetch} from "./fetcher";
import {Entity} from "./model/entity";
import {Report} from "./model/report";
import {get} from 'config';
import {sleep} from 'sleep';

readResources((line: string) => {
  const expectedUrl: string = get('url.expected');
  const actual: string = get('url.actual');

  // バックポストへの負荷を下げるためdelayをかける
  console.info('wait request ... ');
  sleep(get('delaySec'));

  Promise.all([
    fetch(`${expectedUrl}${line}`),
    fetch(`${actual}${line}`)
  ]).then((result => {
    const actualEntity: Entity = new Entity(result[0]);
    const expectEntity: Entity = new Entity(result[1]);

    writeReport(new Report(actualEntity, expectEntity).print());
  }));
});