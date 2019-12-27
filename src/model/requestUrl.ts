/**
 * RequestUrl
 * @class
 */
export class RequestUrl {
  public readonly url: string
  /**
   * @constructor
   * @param host
   * @param queryString
   */
  public constructor(host: string, queryString: string) {
    if (host.indexOf("?") === -1 && queryString.indexOf("?") === -1) {
      this.url = `${host}?${queryString}`;
    } else {
      this.url = `${host}${queryString}`
    }
  }
}