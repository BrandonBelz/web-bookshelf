import { Avatar, Card, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { AuthorMinimal } from "../types/authors";

const { Text } = Typography;

interface AuthorCardProps {
  author: AuthorMinimal;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => navigate(`/authors/${author.id}`)}
    >
      <Space size={12} align="center">
        <Avatar size="large" icon={<UserOutlined />} />
        <Space direction="vertical" size={0}>
          <Text strong>{author.name}</Text>
          <Text type="secondary">Author</Text>
        </Space>
      </Space>
    </Card>
  );
}