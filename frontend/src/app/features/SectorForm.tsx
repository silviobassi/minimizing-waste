import { Button, Form, Input, Space } from 'antd';
import WrapperDefault from '../components/WrapperDefault';

interface SectorFormDefaultProps {
  labelRegister: string;
  iconButton: {
    register: React.ReactNode;
    cancel: React.ReactNode;
  };
  title: string;
}

export default function SectorForm(props: SectorFormDefaultProps) {
  const [form] = Form.useForm();
  return (
    <WrapperDefault title={props.title}>
      <Form layout={'vertical'} form={form}>
        <Form.Item label="Nome:*">
          <Input placeholder="ex:nome do setor" size="large" />
        </Form.Item>
        <Form.Item>
          <Space direction="horizontal">
            <Button type="primary" icon={props.iconButton.register}>
              {props.labelRegister}
            </Button>
            <Button type="primary" danger icon={props.iconButton.cancel}>
              Cancelar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </WrapperDefault>
  );
}
