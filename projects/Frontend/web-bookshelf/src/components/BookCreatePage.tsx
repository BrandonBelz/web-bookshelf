import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { createBook } from "../api/books";
import { getAuthors } from "../api/authors";
import { getVolumes } from "../api/volumes";
import { getVolumeTitle } from "../utils/volume";
import type { AuthorMinimal } from "../types/authors";
import type { VolumeMinimal } from "../types/volumes";

interface BookFormValues {
  title: string;
  noAuthor?: boolean;
  authorIds?: number[];
  volumeId?: number;
  description?: string;
}

export default function BookCreatePage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [authors, setAuthors] = useState<AuthorMinimal[]>([]);
  const [volumes, setVolumes] = useState<VolumeMinimal[]>([]);
  const [form] = Form.useForm<BookFormValues>();

  const noAuthor = Form.useWatch("noAuthor", form);

  useEffect(() => {
    let isMounted = true;

    const loadOptions = async () => {
      setLoadingOptions(true);
      try {
        const [authorsRes, volumesRes] = await Promise.all([
          getAuthors(),
          getVolumes(),
        ]);
        if (isMounted) {
          setAuthors(authorsRes.data);
          setVolumes(volumesRes.data);
        }
      } catch (err) {
        if (isMounted) {
          message.error((err as Error).message || "Failed to load options");
        }
      } finally {
        if (isMounted) {
          setLoadingOptions(false);
        }
      }
    };

    loadOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  const authorOptions = authors.map((author) => ({
    label: author.name,
    value: author.id,
  }));

  const volumeOptions = volumes.map((volume) => ({
    label: getVolumeTitle(volume),
    value: volume.id,
  }));

  const onFinish = async (values: BookFormValues) => {
    setSubmitting(true);
    try {
      const trimmedTitle = values.title.trim();
      const trimmedDescription = values.description?.trim();
      const description =
        trimmedDescription && trimmedDescription.length > 0
          ? trimmedDescription
          : null;

      const authorIds = values.noAuthor
        ? []
        : values.authorIds && values.authorIds.length > 0
          ? values.authorIds
          : [];

      await createBook({
        title: trimmedTitle,
        description,
        authorIds,
        volumeId: values.volumeId !== undefined ? values.volumeId : undefined,
      });

      message.success("Book created successfully");
      navigate("/books");
    } catch (err) {
      message.error((err as Error).message || "Failed to create book");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Row justify="start">
      <Col xs={24} sm={22} md={18} lg={14} xl={10}>
        <Card title="Add New Book">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please enter the book title" },
                { whitespace: true, message: "Book title cannot be empty" },
              ]}
            >
              <Input placeholder="e.g. The Way of Kings" />
            </Form.Item>

            <Form.Item
              label="Authors"
              name="authorIds"
              dependencies={["noAuthor"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue("noAuthor")) {
                      return Promise.resolve();
                    }
                    if (!value || value.length === 0) {
                      return Promise.reject(
                        new Error(
                          "Please select at least one author or check 'This book has no known author'"
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Select
                mode="multiple"
                placeholder={
                  noAuthor ? "No author required" : "Select author(s)"
                }
                options={authorOptions}
                disabled={noAuthor || loadingOptions}
                loading={loadingOptions}
                allowClear
              />
            </Form.Item>

            <Form.Item name="noAuthor" valuePropName="checked">
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    form.setFields([
                      { name: "authorIds", value: [], errors: [] },
                    ]);
                  }
                }}
              >
                This book has no known author
              </Checkbox>
            </Form.Item>

            <Form.Item label="Volume" name="volumeId">
              <Select
                placeholder="Select a volume (optional)"
                options={volumeOptions}
                disabled={loadingOptions}
                loading={loadingOptions}
                allowClear
              />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea
                rows={4}
                placeholder="e.g. Synopsis or summary of the book (optional)"
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  Add Book
                </Button>
                <Button onClick={() => navigate("/books")} disabled={submitting}>
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
