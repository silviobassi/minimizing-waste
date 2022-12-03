import { Layout } from 'antd';
import NavbarLayout from './NavbarLayout';
const { Header } = Layout;

export default function HeaderLayout() {
  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        marginBottom: 20,
      }}
    >
      <NavbarLayout />
    </Header>
  );
}
