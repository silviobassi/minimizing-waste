import { Layout } from 'antd';
import MenuLayout from '../layouts/MenuLayout';

const { Sider } = Layout;

export default function SiderBarLayout() {
  return (
    <Sider
      theme="dark"
      breakpoint="lg"
      collapsedWidth="0"
      width={230}
     
    >
      <div className="demo-logo-vertical" />

      <MenuLayout />
    </Sider>
  );
}
