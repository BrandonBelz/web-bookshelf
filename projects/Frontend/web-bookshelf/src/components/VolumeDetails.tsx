import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Col, Descriptions, Row, Space, Tag, Typography } from "antd";
import type { DescriptionsProps } from "antd";
import {
  BarcodeOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FolderOutlined,
  ReadOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import type { Volume } from "../types/volumes";
import { getVolumeById } from "../api/volumes";
import Loading from "./Loading";
import Error from "./Error";
import BookCard from "./BookCard";
import List from "./List";

const { Text, Title } = Typography;

function getVolumeTitle(volume: Volume) {
  if (volume.title) return volume.title;
  if (volume.books.length > 0) return volume.books[0].title;
  return "Untitled";
}

export default function VolumeDetails() {
  const id = Number(useParams().id);
  const [volume, setVolume] = useState<Volume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVolume = async () => {
      setLoading(true);
      try {
        const response = await getVolumeById(id);
        setVolume(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchVolume();
  }, [id]);

  if (loading) return Loading();
  if (error) return <Error message={error} />;

  if (volume) {
    const items: DescriptionsProps["items"] = [
      {
        key: "pages",
        label: (
          <Space size="small">
            <ReadOutlined />
            <span>Pages</span>
          </Space>
        ),
        children: volume.pages ? `${volume.pages.toLocaleString()} pages` : "—",
      },
      {
        key: "isbn",
        label: (
          <Space size="small">
            <BarcodeOutlined />
            <span>ISBN</span>
          </Space>
        ),
        children: volume.isbn ? <Text copyable>{volume.isbn}</Text> : "—",
      },
      {
        key: "publisher",
        label: (
          <Space size="small">
            <ShopOutlined />
            <span>Publisher</span>
          </Space>
        ),
        children: volume.publisher || "—",
      },
      {
        key: "publishedDate",
        label: (
          <Space size="small">
            <CalendarOutlined />
            <span>Published</span>
          </Space>
        ),
        children: volume.publishedDate || "—",
      },
      {
        key: "obtainedDate",
        label: (
          <Space size="small">
            <CalendarOutlined />
            <span>Obtained</span>
          </Space>
        ),
        children: volume.obtainedDate || "—",
      },
      {
        key: "status",
        label: "Ownership",
        children: (
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
        ),
      },
    ];

    if (volume.set) {
      items.push({
        key: "set",
        label: (
          <Space size="small">
            <FolderOutlined />
            <span>Volume Set</span>
          </Space>
        ),
        children: volume.set.title,
      });
    }

    return (
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <Card>
          <Space orientation="vertical" size="middle">
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
              <Col>
                <Title level={2}>{getVolumeTitle(volume)}</Title>
              </Col>
              <Col>
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
              </Col>
            </Row>

            <Descriptions
              bordered
              size="middle"
              column={{ xs: 1, sm: 2, md: 3 }}
              items={items}
            />
          </Space>
        </Card>

        {volume.books && volume.books.length > 0 && (
          <div>
            <Title level={4}>
              Books in this Volume ({volume.books.length})
            </Title>
            <List
              items={volume.books}
              renderCard={(book) => <BookCard book={book} />}
            />
          </div>
        )}
      </Space>
    );
  }

  return null;
}