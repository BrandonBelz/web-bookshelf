import { LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";

export interface PageNavigationItem {
  label: string;
  path?: string;
}

interface PageNavigationProps {
  items: PageNavigationItem[];
  backPath?: string;
}

export default function PageNavigation({
  items,
  backPath,
}: PageNavigationProps) {
  const navigate = useNavigate();

  return (
    <Space align="center" size="middle">
      {backPath && (
        <Button
          aria-label="Go back"
          title="Go back"
          icon={<LeftOutlined />}
          onClick={() => navigate(backPath)}
        />
      )}
      <Breadcrumb
        items={items.map(({ label, path }) => ({
          title: path ? <Link to={path}>{label}</Link> : label,
        }))}
      />
    </Space>
  );
}
