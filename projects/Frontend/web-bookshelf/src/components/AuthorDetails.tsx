import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Author } from "../types/authors";
import { getAuthorById } from "../api/authors";
import { Typography } from "antd";
import Loading from "./Loading";
import Error from "./Error";

import BookCard from "./BookCard";
import List from "./List";

const { Title } = Typography;

export default function AuthorDetails() {
  const id = Number(useParams().id);
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      try {
        const response = await getAuthorById(id);
        setAuthor(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      };
    };
    fetchAuthor();
  }, [id]);

  if (loading) return Loading();
  if (error) return <Error message={error} />;

  if (author) {
    return (
      <>
        <Title level={2}>{author.name}</Title>
        <Title level={4}>Books</Title>
        <List
          items={author.books}
          renderCard={(book) => <BookCard book={book} />}
        />

      </>
    )
  }
}
