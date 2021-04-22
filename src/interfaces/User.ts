import type { ITimestamps, IHasId } from './General';
import type { IPhotos } from './Photos';
  
export enum ActiveStatus {
    ACTIVE = 'active',
    DISABLED = 'disabled',
    BANNED = 'banned',
  }

export interface IUser extends ITimestamps, IHasId {
  name: string;
  pseudoname: string;
  activestatus: ActiveStatus;
  photos: IPhotos[];
}