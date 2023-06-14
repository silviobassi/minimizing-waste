import { Layout } from 'antd';
import logo from '../../assets/logo_mw.svg';
import MenuLayout from '../layouts/MenuLayout';

const { Sider } = Layout;

export default function SiderBarLayout() {
  return (
    <Sider
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      
    >
      <div style={{ borderRight: '1px solid #d7e2ed' }}>
        <img
          src={logo}
          style={{
            display: 'block',
            width: 120,
            height: 64,
            margin: '0 auto',
          }}
        />
      </div>

      <MenuLayout />
    </Sider>
  );
}
