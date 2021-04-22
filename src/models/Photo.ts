import faker from 'faker';

import type { IPhotos } from '../interfaces/Photos';
import type { ITags } from '../interfaces/Tags';
import { Databases } from '../interfaces/General';
import { VerifiedStatus } from '../interfaces/Photos';

import Dates from './Dates';
import { orm } from './';

interface IPhotosClass {}

export default class Photos extends Dates implements IPhotos, IPhotosClass {
  constructor(
    public userId: string,
    public id: string = faker.datatype.uuid(),
    public imgurl: string = faker.image.imageUrl(),
    public verified: VerifiedStatus = faker.random.arrayElement(Object.values(VerifiedStatus)),
    public description: string = faker.commerce.productDescripiton(),
    public firecount: number = faker.random.number(),
    public tags: ITags[] = []
  ) {
    super();
  }

  static create(userId: string) {
    return new this(userId);
  }

  static async createBulk(count: number, usersIds: string[]) {
    const photos: IPhotos[] = [...Array(count)].map(() => {
      const randomUserId = usersIds[Math.floor(Math.random() * usersIds.length)];

      return new this(randomUserId);
    });

    await orm.writeToDatabase(Databases.PHOTOS, photos);
    return photos;
  }

  static async getUserPhotos(userId: string): Promise<IPhotos[]> {
    const { photos } = await orm.readDatabase();
    return photos.filter((photo) => photo.userId === userId);
  }
}
