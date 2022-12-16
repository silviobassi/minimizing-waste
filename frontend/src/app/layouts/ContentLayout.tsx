import { Layout, theme } from 'antd';
import React from 'react';
const { Content } = Layout;

export interface ContentLayoutProps {
  children: React.ReactNode;
}

export default function ContentLayout(props: ContentLayoutProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content style={{ margin: '24px 16px 0' }}>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          margin: 20,
        }}
      >
        {props.children}
      </div>
    </Content>
  );
}
