import { SendOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

interface SectorFormDefaultProps {
  labelRegister: string;
}

export default function SectorFormDefault(props: SectorFormDefaultProps) {
  const [form] = Form.useForm();
  return (
    <Form layout={'vertical'} form={form}>
      <Form.Item label="Nome:*">
        <Input placeholder="ex:nome do setor" size="large" />
      </Form.Item>
      <Form.Item>
        <Space direction="horizontal">
          <Button type="primary" icon={<SendOutlined />}>
            {props.labelRegister}
          </Button>
          <Button type="primary" danger icon={<StopOutlined />}>
            Cancelar
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
