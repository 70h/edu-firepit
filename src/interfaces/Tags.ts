import type { ITimestamps, IHasId } from './General';
import type { IUser } from './User';
import type { IPhotoId, IPhotos } from './Photos';

export interface ITags extends ITimestamps, IHasId, IPhotoId {
  userId: IUser['id'];
  tag: string;
}