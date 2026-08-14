import type {
  Author,
  AuthorCreateRequest,
  AuthorMinimal,
  AuthorUpdateNameRequest
} from "../types/authors";
import apiClient from "./client";

export function getAuthors() {
  return apiClient.get<AuthorMinimal[]>('/authors');
};

export function getAuthorById(id: number) {
  return apiClient.get<Author>(`/authors/${id}`);
};

export function createAuthor(author: AuthorCreateRequest) {
  return apiClient.post<Author>('/authors', author);
};

export function updateAuthorName(id: number, updateNameRequest: AuthorUpdateNameRequest) {
  return apiClient.put<Author>(`/authors/${id}/name`, updateNameRequest);
};

export function deleteAuthor(id: number) {
  return apiClient.delete<void>(`/authors/${id}`);
};
