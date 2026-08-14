import apiClient from './client';
import type { Book, BookCreateRequest, BookMinimal } from '../types/books';

export function getBooks() {
  return apiClient.get<BookMinimal[]>('/books');
}

export function getBookById(id: number) {
  return apiClient.get<Book>(`/books/${id}`);
}

export function createBook(book: BookCreateRequest) {
  return apiClient.post<Book>('/books', book);
}

export function deleteBook(id: number) {
  return apiClient.delete<void>(`/books/${id}`);
}
