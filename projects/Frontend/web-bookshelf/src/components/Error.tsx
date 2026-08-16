import { Alert } from 'antd';

export default function Error({ message }: { message: string }) {
  return <Alert type='error' title="Failed to fetch data" description={message} />;
}
