import { Card, Space, Tag, Typography } from "antd";
import {
  BarcodeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { VolumeMinimal } from "../types/volumes";
import { getVolumeTitle } from "../utils/volume";

const { Text } = Typography;

interface VolumeCardProps {
  volume: VolumeMinimal;
}

export default function VolumeCard({ volume }: VolumeCardProps) {
  const navigate = useNavigate();
  const isStandalone = !volume.title && volume.books.length === 1;

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
          <Text strong>{getVolumeTitle(volume)}</Text>
        </Space>

        <Space direction="vertical" size="small">
          {!isStandalone && volume.books && volume.books.length > 0 && (
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

        <div>
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
        </div>
      </Space>
    </Card>
  );
}