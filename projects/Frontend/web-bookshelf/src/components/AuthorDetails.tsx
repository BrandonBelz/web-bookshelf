import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, Card, Col, Row, Space, Tag, Typography } from "antd";
import { BookOutlined, UserOutlined } from "@ant-design/icons";
import type { Author } from "../types/authors";
import { getAuthorById } from "../api/authors";
import Loading from "./Loading";
import Error from "./Error";
import BookCard from "./BookCard";
import List from "./List";

const { Text, Title } = Typography;

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
      }
    };
    fetchAuthor();
  }, [id]);

  if (loading) return Loading();
  if (error) return <Error message={error} />;

  if (author) {
    const bookCount = author.books ? author.books.length : 0;

    return (
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <Card>
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col>
              <Space size="middle" align="center">
                <Avatar size={54} icon={<UserOutlined />} />
                <Space orientation="vertical" size={0}>
                  <Title level={2}>{author.name}</Title>
                  <Text type="secondary">Author</Text>
                </Space>
              </Space>
            </Col>

            <Col>
              <Tag color="blue" icon={<BookOutlined />}>
                {bookCount} {bookCount === 1 ? "Book" : "Books"}
              </Tag>
            </Col>
          </Row>
        </Card>

        {author.books && author.books.length > 0 && (
          <div>
            <Title level={4}>Books by {author.name}</Title>
            <List
              items={author.books}
              renderCard={(book) => <BookCard book={book} />}
            />
          </div>
        )}
      </Space>
    );
  }

  return null;
}


