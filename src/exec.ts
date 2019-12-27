import {Resources} from "./resources";
import Timeout = NodeJS.Timeout;
import {Task} from "./task";
import {get} from "config";

const startTime: number = Date.now();
const urls: string[] = [];
const resources: Resources = new Resources();

resources.read((line: string) => {
  urls.push(line);
});

resources.close(() => {
  let counter: number = 0;

  const to: Timeout = setInterval(() => {
    const testUrl: string = urls[counter];

    if (testUrl == null) {
      clearInterval(to);
    } else {
      new Task(testUrl).test(startTime);
      counter++;
    }
  }, get("delayMs"));
});

