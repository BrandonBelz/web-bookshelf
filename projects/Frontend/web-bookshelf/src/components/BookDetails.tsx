import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Popconfirm,
  Rate,
  Row,
  Space,
  Tag,
  Typography,
  message,
} from "antd";
import {
  BookOutlined,
  CommentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { Book } from "../types/books";
import { deleteBook, getBookById } from "../api/books";
import Loading from "./Loading";
import Error from "./Error";
import AuthorCard from "./AuthorCard";
import VolumeCard from "./VolumeCard";
import List from "./List";

const { Paragraph, Text, Title } = Typography;

export default function BookDetails() {
  const id = Number(useParams().id);
  const navigate = useNavigate();
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

  const handleDelete = async () => {
    try {
      await deleteBook(id);
      message.success("Book deleted successfully");
      navigate("/books");
    } catch (err) {
      message.error((err as Error).message || "Failed to delete book");
    }
  };

  if (loading) return Loading();
  if (error) return <Error message={error} />;

  if (book) {
    return (
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <Card>
          <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
              <Col>
                <Title level={2}>{book.title}</Title>
              </Col>
              <Col>
                <Popconfirm
                  title="Delete this book?"
                  onConfirm={handleDelete}
                  okText="Delete"
                  okButtonProps={{ danger: true }}
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              </Col>
            </Row>

            {/* Authors and Volume associations */}
            <Space size="small" wrap>
              {book.authors && book.authors.length > 0 && (
                book.authors.map((author) => (
                  <Tag
                    key={author.id}
                    icon={<UserOutlined />}
                    color="blue"
                    onClick={() => navigate(`/authors/${author.id}`)}
                  >
                    {author.name}
                  </Tag>
                ))
              )}

              {book.volume && (
                <Tag
                  icon={<BookOutlined />}
                  color="cyan"
                  onClick={() => navigate(`/volumes/${book.volume!.id}`)}
                >
                  {book.volume.title || "Part of Volume"}
                </Tag>
              )}
            </Space>

            {/* Rating */}
            {book.rating !== undefined && book.rating !== null && (
              <Space align="center" size="small">
                <Rate disabled allowHalf value={book.rating} />
                <Text strong>{book.rating}</Text>
                <Text type="secondary">/ 5.0</Text>
              </Space>
            )}

            {/* Book Description */}
            {book.description && (
              <>
                <Divider />
                <div>
                  <Title level={5}>Description</Title>
                  <Paragraph>{book.description}</Paragraph>
                </div>
              </>
            )}

            {/* Personal Review */}
            {book.review && (
              <Card
                size="small"
                title={
                  <Space align="center">
                    <CommentOutlined />
                    <span>Review</span>
                  </Space>
                }
              >
                <Paragraph italic>{book.review}</Paragraph>
              </Card>
            )}
          </Space>
        </Card>

        {/* Authors list */}
        {book.authors && book.authors.length > 0 && (
          <div>
            <Title level={4}>Authors</Title>
            <List
              items={book.authors}
              renderCard={(author) => <AuthorCard author={author} />}
            />
          </div>
        )}

        {book.volume && (
          <div>
            <Title level={4}>Volume</Title>
            <List
              items={[book.volume]}
              renderCard={(volume) => <VolumeCard volume={volume} />}
            />
          </div>
        )}
      </Space>
    );
  }

  return null;
}