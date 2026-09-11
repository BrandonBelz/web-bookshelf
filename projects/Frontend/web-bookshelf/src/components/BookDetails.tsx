import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography } from "antd";
import type { Book } from "../types/books";
import { getBookById } from "../api/books";
import Loading from "./Loading";
import Error from "./Error";
import AuthorCard from "./AuthorCard";
import VolumeCard from "./VolumeCard";
import List from "./List";

const { Paragraph, Text, Title } = Typography;

export default function BookDetails() {
  const id = Number(useParams().id);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await getBookById(id);
        setBook(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return Loading();
  if (error) return <Error message={error} />;

  if (book) {
    return (
      <>
        <Title level={2}>{book.title}</Title>
        {book.description && <Paragraph>{book.description}</Paragraph>}
        {book.rating && <Text>Rating: {book.rating}</Text>}
        {book.review && <Paragraph>Review: {book.review}</Paragraph>}

        <Title level={4}>Authors</Title>
        <List
          items={book.authors}
          renderCard={(author) => <AuthorCard author={author} />}
        />

        {book.volume && (
          <>
            <Title level={4}>Volume</Title>
            <List
              items={[book.volume]}
              renderCard={(volume) => <VolumeCard volume={volume} />}
            />
          </>
        )}
      </>
    );
  }

  return null;
}