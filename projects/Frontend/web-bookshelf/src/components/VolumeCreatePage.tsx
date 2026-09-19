import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  message,
} from "antd";
import type { Dayjs } from "dayjs";
import { createVolume } from "../api/volumes";
import { getBooks } from "../api/books";
import { getVolumeSets } from "../api/volumeSets";
import type { BookMinimal } from "../types/books";
import type { VolumeSetMinimal } from "../types/volumeSets";

interface VolumeFormValues {
  title?: string;
  bookIds?: number[];
  pages: number;
  isbn?: string;
  publisher?: string;
  publishedDate?: Dayjs;
  obtainedDate?: Dayjs;
  setId?: number;
}

export default function VolumeCreatePage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [books, setBooks] = useState<BookMinimal[]>([]);
  const [volumeSets, setVolumeSets] = useState<VolumeSetMinimal[]>([]);
  const [form] = Form.useForm<VolumeFormValues>();

  useEffect(() => {
    let isMounted = true;

    const loadOptions = async () => {
      setLoadingOptions(true);
      try {
        const [booksRes, volumeSetsRes] = await Promise.all([
          getBooks(),
          getVolumeSets(),
        ]);
        if (isMounted) {
          setBooks(booksRes.data);
          setVolumeSets(volumeSetsRes.data);
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

  const bookOptions = books.map((book) => {
    const authorNames =
      book.authors && book.authors.length > 0
        ? ` (${book.authors.map((a) => a.name).join(", ")})`
        : "";
    return {
      label: `${book.title}${authorNames}`,
      value: book.id,
    };
  });

  const volumeSetOptions = volumeSets.map((vs) => ({
    label: vs.title,
    value: vs.id,
  }));

  const onFinish = async (values: VolumeFormValues) => {
    setSubmitting(true);
    try {
      const trimmedTitle = values.title?.trim();
      const title =
        trimmedTitle && trimmedTitle.length > 0 ? trimmedTitle : undefined;

      const trimmedIsbn = values.isbn?.trim();
      const isbn =
        trimmedIsbn && trimmedIsbn.length > 0 ? trimmedIsbn : undefined;

      const trimmedPublisher = values.publisher?.trim();
      const publisher =
        trimmedPublisher && trimmedPublisher.length > 0
          ? trimmedPublisher
          : undefined;

      const publishedDate = values.publishedDate
        ? values.publishedDate.format("YYYY-MM-DD")
        : undefined;

      const obtainedDate = values.obtainedDate
        ? values.obtainedDate.format("YYYY-MM-DD")
        : undefined;

      const bookIds =
        values.bookIds && values.bookIds.length > 0 ? values.bookIds : [];

      await createVolume({
        title,
        bookIds,
        pages: values.pages,
        isbn,
        publisher,
        publishedDate,
        obtainedDate,
        setId: values.setId !== undefined ? values.setId : undefined,
      });

      message.success("Volume created successfully");
      navigate("/volumes");
    } catch (err) {
      message.error((err as Error).message || "Failed to create volume");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Row justify="start">
      <Col xs={24} sm={22} md={18} lg={14} xl={10}>
        <Card title="Add New Volume">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              dependencies={["bookIds"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value !== undefined && value !== null && value.length > 0 && !value.trim()) {
                      return Promise.reject(
                        new Error("Title cannot be whitespace only")
                      );
                    }
                    const bookIds = getFieldValue("bookIds");
                    if (!value?.trim() && (!bookIds || bookIds.length === 0)) {
                      return Promise.reject(
                        new Error(
                          "Please enter a title or select at least one book"
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              extra="Leave blank to use the title of the book (for single-book volumes)."
            >
              <Input placeholder="e.g. The Way of Kings (Omnibus)" />
            </Form.Item>

            <Form.Item
              label="Books"
              name="bookIds"
              dependencies={["title"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const title = getFieldValue("title")?.trim();
                    if ((!value || value.length === 0) && !title) {
                      return Promise.reject(
                        new Error(
                          "Please select at least one book or enter a title"
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
                placeholder="Select book(s)"
                options={bookOptions}
                disabled={loadingOptions}
                loading={loadingOptions}
                allowClear
              />
            </Form.Item>

            <Form.Item
              label="Pages"
              name="pages"
              rules={[
                { required: true, message: "Please enter the number of pages" },
                { type: "number", min: 1, message: "Page count must be at least 1" },
              ]}
            >
              <InputNumber
                min={1}
                precision={0}
                placeholder="e.g. 1007"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item label="ISBN" name="isbn">
              <Input placeholder="e.g. 978-0765326355 (optional)" />
            </Form.Item>

            <Form.Item label="Publisher" name="publisher">
              <Input placeholder="e.g. Tor Books (optional)" />
            </Form.Item>

            <Form.Item label="Published Date" name="publishedDate">
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Select published date (optional)"
              />
            </Form.Item>

            <Form.Item
              label="Obtained Date"
              name="obtainedDate"
              extra="Setting an obtained date marks this volume as owned in your collection."
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Select obtained date (optional)"
              />
            </Form.Item>

            <Form.Item label="Volume Set" name="setId">
              <Select
                placeholder="Select a volume set (optional)"
                options={volumeSetOptions}
                disabled={loadingOptions}
                loading={loadingOptions}
                allowClear
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  Add Volume
                </Button>
                <Button
                  onClick={() => navigate("/volumes")}
                  disabled={submitting}
                >
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
