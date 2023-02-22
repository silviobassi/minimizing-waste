import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import WrapperDefault from '../components/WrapperDefault';

interface SupplyMovementFormProps {
  labelRegister: string;
  iconButton: {
    register: React.ReactNode;
    cancel: React.ReactNode;
  };
  title: string;
}

export default function SupplyMovementForm(props: SupplyMovementFormProps) {
  const [form] = Form.useForm();
  return (
    <WrapperDefault title={props.title}>
      <Form layout={'vertical'} form={form}>
        <Divider orientation="left">DADOS DO MOVIMENTO</Divider>
        <Row justify={'space-between'}>
          <Col xs={24} xl={3}>
            <Form.Item label="Movimentável?:*">
              <Checkbox checked={true}>MOVIMENTÁVEL</Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24} xl={6}>
            <Form.Item label="Quantidade Reservada:*">
              <InputNumber
                placeholder="ex: 10"
                size="large"
                min={1}
                max={1000}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={11}>
            {' '}
            <Form.Item label="Colaborador Responsável*">
              <Select
                size="large"
                defaultValue="Selecione o Colaborador Responsável:*"
                //onChange={null}
                options={[
                  { label: 'Pedro Bassi', value: '1' },
                  { label: 'Ana Paula Schiavinato', value: '2' },
                  { label: 'Marcelo Ramos', value: '3' },
                  { label: 'Juscelino Vasconcelos', value: '4' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col xs={24} xl={11}>
            <Form.Item label="Recurso*">
              <Select
                size="large"
                defaultValue="Selecione o Recurso:*"
                //onChange={null}
                options={[
                  { label: 'Cimento', value: '1' },
                  { label: 'Porcelanato', value: '2' },
                  { label: 'Vergalhão', value: '3' },
                  { label: 'Areia Grossa', value: '4' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={11}>
            <Form.Item label="Estação de Trabalho*">
              <Select
                size="large"
                defaultValue="Selecione a Estação de Trabalho:*"
                //onChange={null}
                options={[
                  { label: 'Bloco B Apto 127', value: '1' },
                  { label: 'Bloco G Apto 75', value: '2' },
                  { label: 'Bloco H Apto 89', value: '3' },
                  { label: 'Bloco K Apto 165', value: '4' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">NOTIFICAÇÃO</Divider>
        <Row justify={'space-between'}>
          <Col xs={24} xl={11}>
            <Form.Item label="Título*">
              <Input placeholder="ex: Revestimento do Bloco B" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={11}>
            <Form.Item label="Razão*">
              <Input
                placeholder="ex: Regularização de paredes concluídas"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col xs={24}>
            <Form.Item label="Objetivo*">
              <TextArea
                placeholder="ex: O Revestimento deve ser executado, pois precisamos executar o gesso e as paredes. Sem o revestimento, tais serviços não podem ser executados!"
                size="large"
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
