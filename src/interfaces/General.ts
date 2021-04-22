export interface ITimestamps {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }
  
  export interface IHasId {
    id: string;
  }

  export enum Databases {
    USERS = 'users',
    PHOTOS = 'photos',
    TAGS = 'tags',
  }