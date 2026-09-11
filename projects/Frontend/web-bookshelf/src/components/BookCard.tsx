import { Card, Space, Typography } from "antd";
import { BookOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { BookMinimal } from "../types/books";

const { Text } = Typography;

interface BookCardProps {
  book: BookMinimal;
}

export default function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

  const authorNames =
    book.authors && book.authors.length > 0
      ? book.authors.map((a) => a.name).join(", ")
      : "Unknown Author";

  return (
    <Card
      hoverable
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <Space direction="vertical" size="middle">
        <Space align="start" size="small">
          <BookOutlined />
          <Text strong>{book.title}</Text>
        </Space>

        <Space size="small">
          <UserOutlined />
          <Text type="secondary">{authorNames}</Text>
        </Space>
      </Space>
    </Card>
  );
}