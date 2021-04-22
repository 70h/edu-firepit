import faker from 'faker';

import type { ITags } from '../interfaces/Tags';
import { Databases } from '../interfaces/General';

import Dates from './Dates';
import { orm } from './';

interface ITagsClass {}

export default class Tags extends Dates implements ITags, ITagsClass {
  constructor(
    public userId: string = null,
    public id: string = faker.datatype.uuid(),
    public tag: string = faker.random.word(),
  ) {
    super();
  }

  static create() {
    const tag = new this();
    // idedam i duomenu baze nauja irasa

    return tag;
  }

  static async createBulk(count: number, photosIds: string[]) {
    const tags: ITags[] = [...Array(count)].map((_) => {
      const randomPhotoID = photosIds[Math.floor(Math.random() * photosIds.length)];

      return new this(randomPhotoID);
    });

    await orm.writeToDatabase(Databases.TAGS, tags);
    return tags;
  }

  static async getAccountTags(accountId: string): Promise<ITags[]> {
    const { tags } = await orm.readDatabase();
    return tags.filter((tags) => tags.accountId === accountId);
  }
}
