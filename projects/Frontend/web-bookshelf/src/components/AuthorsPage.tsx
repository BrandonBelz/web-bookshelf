import ListPage from "./ListPage";
import type { AuthorMinimal } from "../types/authors";
import { getAuthors } from "../api/authors";
import AuthorCard from "./AuthorCard";

export default function AuthorsPage() {
  return (
    <ListPage<AuthorMinimal>
      pageTitle="Authors"
      fetchData={getAuthors}
      renderCard={(author) => <AuthorCard author={author} />}
    />
  )
}
