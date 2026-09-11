import { Card, Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import type { VolumeMinimal } from "../types/volumes";

interface VolumeCardProps {
  volume: VolumeMinimal;
}

function getVolumeTitle(volume: VolumeMinimal) {
  if (volume.title)
    return volume.title;
  if (volume.books.length > 0)
    return volume.books[0].title;
  return "Untitled";
}

function getVolumeDescription(volume: VolumeMinimal) {
  const isStandalone = !volume.title && volume.books.length === 1;

  return (
    <Space orientation="vertical" size={4}>
      {!isStandalone && (
        <span>
          Books: {volume.books.map(book => book.title).join(", ")}
        </span>
      )}
      {volume.isbn && <span>ISBN: {volume.isbn}</span>}
      <Tag color={volume.isOwned ? "green" : "red"}>
        {volume.isOwned ? "Owned" : "Not Owned"}
      </Tag>
    </Space>
  )
}

export default function VolumeCard({ volume }: VolumeCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => navigate(`/volumes/${volume.id}`)}
      title={getVolumeTitle(volume)}>
      <Card.Meta description={getVolumeDescription(volume)} />
    </Card>
  );
}