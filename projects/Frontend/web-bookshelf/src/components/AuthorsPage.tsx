import ListPage from "./ListPage";
import type { AuthorMinimal } from "../types/authors";
import { getAuthors } from "../api/authors";

export default function AuthorsPage() {
  return (
    <ListPage<AuthorMinimal>
      pageTitle="Authors"
      fetchData={getAuthors}
      getCardTitle={(author) => author.name}
    />
  )
}
