import faker from 'faker';

import { IUser, ActiveStatus } from '../interfaces/User';
import { Databases } from '../interfaces/General';
import type { IPhotos } from '../interfaces/Photos';

import Dates from './Dates';
import Photo from './Photo';
import Tag from './Tag';
import { orm } from './';

interface IUserClass {}

export default class User extends Dates implements IUser, IUserClass {
  constructor(
    public id: string = faker.datatype.uuid(),
    public name: string = faker.name.findName(),
    public pseudoname: string = faker.internet.username(),
    public activestatus: ActiveStatus = faker.random.arrayElement(Object.values(ActiveStatus)),
    public photos: IPhotos[] = []
  ) {
    super();

    // check if database file was created and create one if not
  }

  // Objekto sukurimui naudojam statini metoda, o ne tiesiog kur reik sukurti rasom: `new User()`
  // Del labai paprastos priezasties: Kai bus naudojamos duomenu bazes, kad sukurti irasa, mes turesim naudoti asinchroninius metodus
  // Tokiu atveju jau mes negalesim naudoti konstruktoriaus ir reikes statinio metodo
  // Kuris sukuria duomenu bazeje irasa ir tada jau mums grazina nauja klases objekta
  // Todel ir cia stengiames laikytis to conventiono, kad priprastumet
  static create() {
    const user = new this();
    // idedam i duomenu baze nauja irasa

    return user;
  }

  static async createBulk(count: number) {
    const users: IUser[] = [...Array(count)].map((_, key) => {
      return new this();
    });

    // idedam i duomenu baze
    await orm.writeToDatabase(Databases.USERS, users);
    return users;
  }

  static async findAll(): Promise<IUser[]> {
    const { users } = await orm.readDatabase();

    return users;
  }

  static async findById(id: string): Promise<IUser> {
    const { users } = await orm.readDatabase();
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error(`User by specified id ${id} was not found`);
    }

    return user;
  }

  static async getWithRelations(id: string): Promise<IUser> {
    const user = await this.findById(id);
    const photos = await Photo.getUserPhotos(user.id);
    const photosWithTags = photos.map(async (photo) => ({
      ...photo,
      invoices: await Tag.getAccountTags(photo.id),
    }));

    return { ...user, photos: await Promise.all(photosWithTags) };
  }
}