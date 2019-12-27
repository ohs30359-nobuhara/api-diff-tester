import {Response} from "../fetcher";
import {ContentTypeEnum} from "./contentType";

const prettyData = require('pretty-data');

/**
 * Entity
 * @class
 */
export class Entity {
  public readonly data: string;
  public readonly requestUrl: string;
  public readonly status: number;

  /**
   * @constructor
   * @param data
   */
  public constructor(data: Response) {
    this.requestUrl = data.url;
    this.status = data.status;

    if (data.contentType.type === ContentTypeEnum.JSON) {
      this.data = this.toJson(JSON.stringify(data.response));
      return;
    }

    if (data.contentType.type === ContentTypeEnum.XML) {
      this.data = this.toXml(data.response);
      return;
    }

    // Content-Typeをつけていないものも存在するため 変換をかけてフォーマットを整える
    this.data = this.textTryConvertToXmlOrJson(data.response);
  }

  /**
   * toXml
   * @param data
   */
  private toXml(data: string): string {
    return prettyData.pd.xml(data);
  }

  /**
   * toJson
   * @param data
   */
  private toJson(data: string): string {
    return prettyData.pd.json(data);
  }

  /**
   * textTryConvertToXmlOrJson
   * @param data
   */
  private textTryConvertToXmlOrJson(data: string): string {
    try { return this.toXml(data);} catch (e) {} // errorは握りつぶす
    try { return this.toJson(data);} catch (e) {} // errorは握りつぶす

    return data;
  }
}