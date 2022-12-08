import { Button, Col, Form, Input, Row, Select, Space } from 'antd';
import WrapperDefault from '../components/WrapperDefault';

interface WorkStationFormDefaultProps {
  labelRegister: string;
  iconButton: {
    register: React.ReactNode;
    cancel: React.ReactNode;
  };
  title: string;
}

export default function WorkStationForm(props: WorkStationFormDefaultProps) {
  const [form] = Form.useForm();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <WrapperDefault title={props.title}>
      <Form layout="vertical">
        <Row justify={'space-between'}>
          <Col xs={24} xl={11}>
            <Form.Item label="Nome:*">
              <Input
                placeholder="ex:nome da estação de trabalho"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={11}>
            <Form.Item label="Selecione o Setor:*">
              <Select
                size="large"
                defaultValue="Selecione o setor"
                onChange={handleChange}
                options={[
                  { label: 'Acabamento', value: 'Acabamento' },
                  { label: 'Alvenaria', value: 'Alvenaria' },
                  { label: 'Fundação', value: 'Fundação' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

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
