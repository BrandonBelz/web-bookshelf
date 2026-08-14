import type { BookMinimal } from './books';

export interface Author {
  id: number;
  name: string;
  books: BookMinimal[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthorMinimal {
  id: number;
  name: string;
}

export interface AuthorCreateRequest {
  name: string;
}

export interface AuthorUpdateNameRequest {
  name: string;
}
