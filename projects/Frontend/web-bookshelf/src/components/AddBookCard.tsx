import { Avatar, Card, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function AddBookCard() {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => navigate("/books/new")}
      style={{
        height: "100%",
      }}
    >
      <Space size={12} align="center">
        <Avatar size="large" icon={<PlusOutlined />} />
        <Space orientation="vertical" size={0}>
          <Text strong>Add Book</Text>
        </Space>
      </Space>
    </Card>
  );
}
