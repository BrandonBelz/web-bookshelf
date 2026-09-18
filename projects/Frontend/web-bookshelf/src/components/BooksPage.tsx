import { getBooks } from "../api/books";
import type { BookMinimal } from "../types/books";
import BookCard from "./BookCard";
import AddBookCard from "./AddBookCard";
import ListPage from "./ListPage";

export default function BooksPage() {
  return (
    <ListPage<BookMinimal>
      pageTitle="Books"
      fetchData={getBooks}
      prependCard={<AddBookCard />}
      renderCard={(book) => <BookCard book={book} />}
    />
  );
}
