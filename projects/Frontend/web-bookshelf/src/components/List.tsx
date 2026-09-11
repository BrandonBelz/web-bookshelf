import { Col, Row } from "antd";

interface ListProps<T> {
    items: T[];
    renderCard: (item: T) => React.ReactNode;
}

export default function List<T extends { id: number }>({ items, renderCard }: ListProps<T>) {
    return (
        <Row gutter={[16, 16]}>
            {items.map((item) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.id} span={6}>
                    {renderCard(item)}
                </Col>
            ))}
        </Row>
    );
}