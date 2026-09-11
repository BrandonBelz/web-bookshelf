import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import type { AuthorMinimal } from "../types/authors";

interface AuthorCardProps {
  author: AuthorMinimal;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => navigate(`/authors/${author.id}`)}
      title={author.name}
    />
  );
}