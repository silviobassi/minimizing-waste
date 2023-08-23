import { LockFilled } from '@ant-design/icons';
import { Card, Space, Typography } from 'antd';
import React from 'react';

interface AccessDeniedProps {
  children: React.ReactNode;
}

export default function AccessDenied(props: AccessDeniedProps) {
  return (
    <Card style={{ minHeight: 256, display: 'flex', alignItems: 'center' }}>
      <Space direction={'vertical'}>
        <Space align={'center'}>
          <LockFilled style={{ fontSize: 32, color: '#001529' }} />
          <Typography.Title style={{ margin: 0, color: '#001529' }}>
            Acesso negado
          </Typography.Title>
        </Space>
        <Typography.Paragraph style={{ color: '#001529' }}>
          {props.children}
        </Typography.Paragraph>
      </Space>
    </Card>
  );
}
