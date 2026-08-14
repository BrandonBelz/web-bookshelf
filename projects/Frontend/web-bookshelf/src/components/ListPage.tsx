import { Card, Col, Row, Typography } from 'antd';
import { useState, useEffect } from 'react';

const { Title } = Typography;

interface ListPageProps<T> {
  pageTitle: string;
  fetchData: () => Promise<{ data: T[] }>;
  getCardTitle: (item: T) => string;
  getCardDescription?: (item: T) => React.ReactNode;
};

export default function ListPage<T extends { id: number }>({
  pageTitle,
  fetchData,
  getCardTitle,
  getCardDescription
}: ListPageProps<T>) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetchData();
      setItems(response.data);
    };
    fetchItems();
  }, [fetchData]);

  return (
    <>
      <Title level={2}>{pageTitle}</Title>
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id} span={6}>
            <Card hoverable title={getCardTitle(item)}>
              {getCardDescription && <Card.Meta description={getCardDescription(item)} />}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}
