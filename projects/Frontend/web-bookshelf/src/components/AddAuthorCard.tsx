import { Avatar, Card, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function AddAuthorCard() {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => navigate("/authors/new")}
    >
      <Space size={12} align="center">
        <Avatar size="large" icon={<PlusOutlined />} />
        <Space orientation="vertical" size={0}>
          <Text strong>Add Author</Text>
          <Text type="secondary">Create new</Text>
        </Space>
      </Space>
    </Card>
  );
}
