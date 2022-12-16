import { Layout } from 'antd';
import React from 'react';
import ContentLayout from './ContentLayout';
import HeaderLayout from './HeaderLayout';
import NavbarLayout from './MenuLayout';

import logo from '../../assets/logo_mw.svg';

const { Sider } = Layout;

interface DefaultLayoutProps {
  children: React.ReactNode;
}
export default function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <>
      <Layout>
        <Sider
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
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

          <NavbarLayout />
        </Sider>
        <Layout>
          <HeaderLayout />
          <ContentLayout>{props.children}</ContentLayout>
        </Layout>
      </Layout>
    </>
  );
}
