import Builder from './controllers/Builder';
import { printRandomUserData } from './controllers/Analytics';
import { orm } from './models';

orm.databaseInit();

const usersCount = 1;
const photosCount = 4;
const tagsCount = 1;
const builder = new Builder(usersCount, photosCount, tagsCount);

(async () => {
  await builder.makeDatabase();
  await printRandomUserData();
})();
