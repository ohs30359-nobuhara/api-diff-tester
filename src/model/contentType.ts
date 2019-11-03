export class ContentType {
  readonly type: ContentTypeEnum;

  constructor(contentType: string) {
    if (contentType.match(/application\/json/)) {
      this.type = ContentTypeEnum.JSON;
      return;
    }

    if (contentType.match(/application\/xml/)) {
      this.type = ContentTypeEnum.XML;
      return;
    }

    this.type = ContentTypeEnum.TEXT_HTML;
  }
}

export enum ContentTypeEnum {
  JSON,
  XML,
  TEXT_HTML,
  NONE
}