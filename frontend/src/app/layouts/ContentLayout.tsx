import { Layout, theme } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React from 'react';
const { Content } = Layout;

export interface ContentLayoutProps {
  children: React.ReactNode;
}

export default function ContentLayout(props: ContentLayoutProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { xs } = useBreakpoint();

  const space = xs ? 20 : 60;

  return (
    <Content style={{ margin: '24px 16px 0' }}>
      <div
        style={{ padding: space, minHeight: 360, background: colorBgContainer }}
      >
        {props.children}
      </div>
    </Content>
  );
}
