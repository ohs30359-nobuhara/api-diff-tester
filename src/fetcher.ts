import axios, {AxiosResponse} from 'axios';
import {ContentType} from "./model/contentType";

export async function fetch(url: string): Promise<Response> {
  try {
    console.log(`request: ${url}`);
    const response: AxiosResponse = await axios.get(url);

    return {
      contentType: new ContentType(response.headers['content-type']),
      response: response.data,
      status: response.status,
      url
    };
  } catch (e) {
    return {
      contentType: new ContentType(''),
      response: e.message,
      status: 500, // TODO: 一旦固定
      url
    };
  }
}

export interface Response {
  contentType: ContentType
  response: any;
  status: number;
  url: string;
}