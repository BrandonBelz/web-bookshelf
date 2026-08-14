import { getBooks } from "../api/books";
import type { BookMinimal } from "../types/books";
import ListPage from "./ListPage";

export default function BooksPage() {
  return (
    <ListPage<BookMinimal>
      pageTitle="Books"
      fetchData={getBooks}
      getCardTitle={(book) => book.title}
      getCardDescription={(book) => `Author: ${book.authors[0].name}`}
    />);
}
