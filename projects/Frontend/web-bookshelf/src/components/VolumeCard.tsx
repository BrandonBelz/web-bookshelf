import { Card, Space, Tag, Typography } from "antd";
import {
  BarcodeOutlined,
  BookOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { VolumeMinimal } from "../types/volumes";

const { Text } = Typography;

interface VolumeCardProps {
  volume: VolumeMinimal;
}

export default function VolumeCard({ volume }: VolumeCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => navigate(`/volumes/${volume.id}`)}
      style={{
        height: "100%",
      }}
    >
      <Space orientation="vertical" size="middle">
        <Space align="start" size="small">
          <ReadOutlined />
          <Text strong>{volume.title}</Text>
        </Space>

        <Space direction="vertical" size="small">
          {volume.hasMultipleBooks && volume.books && volume.books.length > 0 && (
            <Text type="secondary">
              {volume.books.map((b) => b.title).join(", ")}
            </Text>
          )}
          {volume.isbn && (
            <Space size="small">
              <BarcodeOutlined />
              <Text type="secondary">ISBN: {volume.isbn}</Text>
            </Space>
          )}
        </Space>

        <Space size="small" wrap>
          {volume.hasMultipleBooks && (
            <Tag color="blue" icon={<BookOutlined />}>
              Multiple Books
            </Tag>
          )}
          <Tag
            color={volume.isOwned ? "success" : "default"}
            icon={
              volume.isOwned ? (
                <CheckCircleOutlined />
              ) : (
                <CloseCircleOutlined />
              )
            }
          >
            {volume.isOwned ? "In Collection" : "Not Owned"}
          </Tag>
        </Space>
      </Space>
    </Card>
  );
}