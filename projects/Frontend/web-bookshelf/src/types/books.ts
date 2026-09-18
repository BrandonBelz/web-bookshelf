import type { AuthorMinimal } from "./authors";
import type { VolumeMinimal } from "./volumes";

export interface Book {
  id: number;
  title: string;
  authors: AuthorMinimal[];
  description?: string | null;
  rating?: number;
  review?: string;
  volume?: VolumeMinimal;
  isPartOfVolume: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface BookMinimal {
  id: number;
  title: string;
  authors: AuthorMinimal[];
};

export interface BookCreateRequest {
  title: string;
  authorIds?: number[];
  description?: string | null;
  rating?: number;
  review?: string;
  volumeId?: number;
};
