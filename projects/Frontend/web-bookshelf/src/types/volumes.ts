import type { BookMinimal } from './books';
import type { VolumeSetMinimal } from './volumeSets';

export interface Volume {
  id: number;
  title?: string;
  books: BookMinimal[];
  isbn?: string;
  pages: number;
  publisher?: string;
  publishedDate?: string;
  obtainedDate?: string;
  isOwned: boolean;
  set?: VolumeSetMinimal;
  createdAt: string;
  updatedAt: string;
};

export interface VolumeMinimal {
  id: number;
  title?: string;
  books: BookMinimal[];
  isbn?: string;
  isOwned: boolean;
  volumeSetId?: number;
};

export interface VolumeCreateRequest {
  title?: string;
  bookIds: number[];
  isbn?: string;
  pages: number;
  publisher?: string;
  publishedDate?: string;
  obtainedDate?: string;
  setId?: number;
};
