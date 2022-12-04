import { Col, Layout, Row } from 'antd';
import React from 'react';
import BreadcrumbLayout from './BreadcrumbLayout';
const { Content } = Layout;

export interface ContentLayoutProps {
  children: React.ReactNode;
}

export default function ContentLayout(props: ContentLayoutProps) {
  return (
    <Content style={{ padding: '0 30px' }}>
      
      <Row justify={'center'}>
        <Col xs={24} xl={20}>
        <BreadcrumbLayout />
          <Content
            style={{
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Col>
      </Row>
    </Content>
  );
}
