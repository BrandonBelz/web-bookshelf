import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import type { BookMinimal } from "../types/books";

interface BookCardProps {
  book: BookMinimal;
}

export default function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => navigate(`/books/${book.id}`)}
      title={book.title}>
      <Card.Meta description={`Author: ${book.authors[0].name}`} />
    </Card>
  );
}