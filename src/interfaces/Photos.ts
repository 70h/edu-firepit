import type { ITimestamps, IHasId } from './General';
import type { IUser } from './User';
import type { ITags } from './Tags';

export interface IPhotoId {
  id: string;
}

export enum VerifiedStatus {
  VERIFIED = 'verified',
  UNVERIFIED = 'unverified',
}

export interface IPhotos extends ITimestamps, IHasId, IPhotoId {
  userId: IUser['id'];
  imgurl: string;
  verified: VerifiedStatus;
  description: string;
  firecount: number;
  tags: ITags[];
}