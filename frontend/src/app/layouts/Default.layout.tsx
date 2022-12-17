import { Layout } from 'antd';
import React from 'react';
import ContentLayout from './ContentLayout';
import HeaderLayout from './HeaderLayout';
import SiderBarLayout from './Sidebar.layout';

const { Sider } = Layout;

interface DefaultLayoutProps {
  children: React.ReactNode;
}
export default function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <>
      <Layout>
        <SiderBarLayout />
        <Layout>
          <HeaderLayout />
          <ContentLayout>{props.children}</ContentLayout>
        </Layout>
      </Layout>
    </>
  );
}
