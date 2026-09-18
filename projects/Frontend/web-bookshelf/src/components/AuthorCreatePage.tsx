import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Input, Row, Space, message } from "antd";
import { createAuthor } from "../api/authors";
import type { AuthorCreateRequest } from "../types/authors";

export default function AuthorCreatePage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: AuthorCreateRequest) => {
    setSubmitting(true);
    try {
      await createAuthor({
        name: values.name.trim(),
      });
      message.success("Author created successfully");
      navigate("/authors");
    } catch (err) {
      message.error((err as Error).message || "Failed to create author");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Row justify="start">
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Card title="Add New Author">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: "Please enter the author's full name" },
                { whitespace: true, message: "Author name cannot be empty" },
              ]}
            >
              <Input placeholder="e.g. Brandon Sanderson" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  Add Author
                </Button>
                <Button onClick={() => navigate("/authors")} disabled={submitting}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
