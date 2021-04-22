import fs from 'fs';
import path from 'path';

import type { ITags } from '../interfaces/Tags';
import type { IPhotos } from '../interfaces/Photos';
import type { Databases } from '../interfaces/General';
import { IUser } from '#interfaces/User';

import User from './User';
import Photos from './Photo';
import Tags from './Tag';

const databasePath = path.resolve(`${__dirname}/../../database.json`);

const databaseInit = () => {
  if (!fs.existsSync(databasePath)) {
    const database = { users: [], photos: [], tags: [] };
    fs.writeFileSync(databasePath, JSON.stringify(database));
    console.log('Database was created');
  }
};

const readDatabase = () => {
  if (!fs.existsSync(databasePath)) {
    throw new Error('Database does not exists');
  }

  const data = fs.readFileSync(databasePath, 'utf8');
  return JSON.parse(data);
};

const writeToDatabase = async (database: Databases, data: IUser[] | IPhotos[] | ITags[]) => {
  const dbData = readDatabase();

  return fs.writeFileSync(
    databasePath,
    JSON.stringify({
      ...dbData,
      [database]: [...dbData[database], ...data],
    })
  );
};

const orm = {
  databaseInit,
  databasePath,
  writeToDatabase,
  readDatabase,
};

export { User, Photos, Tags, orm };
