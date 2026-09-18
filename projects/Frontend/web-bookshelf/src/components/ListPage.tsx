import { Col, Row, Typography } from 'antd';
import { useState, useEffect } from 'react';
import Loading from './Loading';
import Error from './Error';

const { Title } = Typography;

interface ListPageProps<T> {
  pageTitle: string;
  fetchData: () => Promise<{ data: T[] }>;
  renderCard: (item: T) => React.ReactNode;
  prependCard?: React.ReactNode;
};

export default function ListPage<T extends { id: number }>({
  pageTitle,
  fetchData,
  renderCard,
  prependCard
}: ListPageProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await fetchData();
        setItems(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      };
    };
    fetchItems();
  }, [fetchData]);

  return (
    <>
      <Title level={2}>{pageTitle}</Title>
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!(loading || error) && (
        <Row gutter={[16, 16]}>
          {prependCard && (
            <Col xs={24} sm={12} md={8} lg={6} span={6}>
              {prependCard}
            </Col>
          )}
          {items.map((item) => (
            <Col xs={24} sm={12} md={8} lg={6} key={item.id} span={6}>
              {renderCard(item)}
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}
