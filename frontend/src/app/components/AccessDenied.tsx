import { LockFilled } from '@ant-design/icons';
import { Card, Space, Typography } from 'antd';
export default function AccessDenied() {
  return (
    <Card style={{ minHeight: 256, display: 'flex', alignItems: 'center' }}>
      <Space direction={'vertical'}>
        <Space align={'center'}>
          <LockFilled style={{ fontSize: 32 }} />
          <Typography.Title style={{ margin: 0 }}>
            Acesso negado
          </Typography.Title>
        </Space>
        <Typography.Paragraph>
          Você não tem permissão para visualizar estes dados
        </Typography.Paragraph>
      </Space>
    </Card>
  );
}
