import { Button, Form, InputNumber, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import WrapperDefault from '../components/WrapperDefault';

interface SupplyMovementGiveBackFormProps {
  labelRegister: string;
  iconButton: {
    register: React.ReactNode;
    cancel: React.ReactNode;
  };
  title: string;
}

export default function SupplyMovementGiveBackForm(
  props: SupplyMovementGiveBackFormProps,
) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  return (
    <WrapperDefault title={props.title}>
      <Form layout={'vertical'} form={form}>
        <Form.Item label="Quantidade Reservada:*">
          <InputNumber
            placeholder="ex: 10"
            size="large"
            min={1}
            max={1000}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item>
          <Space direction="horizontal">
            <Button type="primary" icon={props.iconButton.register}>
              {props.labelRegister}
            </Button>
            <Button
              type="primary"
              danger
              icon={props.iconButton.cancel}
              onClick={() => navigate('/movimento-recursos')}
            >
              Cancelar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </WrapperDefault>
  );
}
