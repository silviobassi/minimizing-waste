import { Layout } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React from 'react';
import ContentLayout from './ContentLayout';
import HeaderLayout from './HeaderLayout';
import MenuLayout from './MenuLayout';

const { Sider } = Layout;

interface DefaultLayoutProps {
  children: React.ReactNode;
}
export default function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <Layout hasSider>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      
      >
        <div className="demo-logo-vertical" />
        <MenuLayout />
      </Sider>
      <Layout>
        <HeaderLayout />
        <ContentLayout>{props.children}</ContentLayout>
        <Footer style={{ textAlign: 'center' }}>
          Minimizing Waste ©2023 Created by Silvio Bassi
        </Footer>
      </Layout>
    </Layout>
  );
}
