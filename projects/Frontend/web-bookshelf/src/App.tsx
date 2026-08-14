import { Layout, Menu } from 'antd';
import AppRoutes from './Components/AppRoutes';
import { useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

function App() {
  const navigate = useNavigate();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider>
        <Menu theme='dark' onClick={({ key }) => {
          navigate(key);
        }} items={[
          { label: 'Home', key: '/' },
          { label: 'Books', key: '/books' },
          { label: 'Authors', key: '/authors' },
          { label: 'Volumes', key: '/volumes' },
        ]}></Menu>
      </Sider>
      <Content>
        <AppRoutes />
      </Content>
    </Layout>
  )
}

export default App
