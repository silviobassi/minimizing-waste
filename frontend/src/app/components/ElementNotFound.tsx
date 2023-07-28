import { Card, Empty, Space, Typography } from 'antd';

interface ElementNotFoundProps {
  description: string;
}
export default function ElementNotFound(props: ElementNotFoundProps) {
  return (
    <>
      <Card
        style={{
          minHeight: 256,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Space direction={'vertical'} align="center">
          <Empty
            description={
              <Space align={'center'}>
                <Typography.Title level={3} style={{ margin: 0 }}>
                  {props.description}
                </Typography.Title>
              </Space>
            }
          />
        </Space>
      </Card>
    </>
  );
}
