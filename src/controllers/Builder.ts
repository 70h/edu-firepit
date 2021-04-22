import type { IUser } from '../interfaces/User';
import type { IPhotos } from '../interfaces/Photos';
import type { ITags } from '../interfaces/Tags';

import { User, Photos, Tags } from '../models';

interface IBuilder {
  makeDatabase: () => void;
}

export default class Builder implements IBuilder {
  [x: string]: any;
  private users: IUser[] = [];
  private photos: IPhotos[] = [];
  private tags: ITags[] = [];

  constructor(
    private usersCount: number = 1,
    private photosCount: number = 5,
    private tagsCount: number = 1
  ) {}

  public async makeDatabase() {
    this.users = await this.makeUsers();
    this.photos = await this.makePhotos();
    this.tags = await this.makeTags();
  }

  private async makeUsers() {
    console.log(`Making ${this.usersCount} users...`);
    return User.createBulk(this.usersCount);
  }

  private async makeAccounts() {
    if (!this.users.length) {
      throw new Error('Users mock is empty, need to create users first');
    }

    console.log(`Making ${this.photosCount} accounts...`);
    const usersIds = this.users.map((user) => user.id);
    return Photos.createBulk(this.photosCount, usersIds);
  }

  private async makeInvoices() {
    if (!this.photos.length) {
      throw new Error('Accounts mock is empty, need to create accounts first');
    }

    console.log(`Making ${this.tagsCount} invoices...`);
    const photosIds = this.photos.map((photos) => photos.id);
    return Tags.createBulk(this.tagsCount, photosIds);
  }
}
