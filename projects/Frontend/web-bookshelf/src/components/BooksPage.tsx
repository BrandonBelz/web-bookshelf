import { getBooks } from "../api/books";
import type { BookMinimal } from "../types/books";
import BookCard from "./BookCard";
import ListPage from "./ListPage";

export default function BooksPage() {
  return (
    <ListPage<BookMinimal>
      pageTitle="Books"
      fetchData={getBooks}
      renderCard={(book) => <BookCard book={book} />}
    />);
}
