import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Tabs,
} from 'antd';
import { useState } from 'react';
import WrapperDefault from '../components/WrapperDefault';

interface SupplyFormDefaultProps {
  labelRegister: string;
  iconButton: {
    register: React.ReactNode;
    cancel: React.ReactNode;
  };
  title: string;
}

export default function SupplyForm(props: SupplyFormDefaultProps) {
  const [supplyType, setSupplyType] = useState<string>();

  const handleChange = (value: string) => {
    setSupplyType(value);
  };

  const items = [
    {
      label: 'Recursos',
      key: '1',
      children: (
        <Form layout="vertical">
          <Row>
            <Col xs={24} xl={24}>
              <Form.Item label="Título*">
                <Input placeholder="ex: Título" size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={'space-between'}>
            <Col xs={24} xl={11}>
              <Form.Item label="Tipo do Recurso*">
                <Select
                  size="large"
                  defaultValue="Selecione o Tipo do Recurso"
                  onChange={handleChange}
                  options={[
                    { label: 'Material', value: 'MATERIAL' },
                    { label: 'Equipamento', value: 'EQUIPAMENTO' },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} xl={11}>
              {supplyType === 'EQUIPAMENTO' && (
                <Form.Item label="Tipo do Volume*">
                  <Select
                    size="large"
                    defaultValue="Selecione o Volume"
                    options={[
                      { label: 'Pequeno', value: 'PEQUENO' },
                      { label: 'Médio', value: 'MÉDIO' },
                      { label: 'Grande', value: 'GRANDE' },
                    ]}
                  />
                </Form.Item>
              )}

              {supplyType === 'MATERIAL' && (
                <Form.Item label="Tipo de Manipulação*">
                  <Select
                    size="large"
                    defaultValue="Selecione a Manipulação"
                    options={[
                      { label: 'Mutável', value: 'MUTÁVEL' },
                      { label: 'Transmutável', value: 'TRANSMUTÁVEL' },
                    ]}
                  />
                </Form.Item>
              )}
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      label: 'Descrição',
      key: '2',
      children: (
        <Form layout="vertical">
          <Row justify={'space-between'}>
            <Col xs={24} xl={11}>
              <Form.Item label="Empacotamento*">
                <Input placeholder="ex: Caixa" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} xl={11}>
              <Form.Item label="Quantidade*">
                <InputNumber
                  placeholder="ex: 10"
                  size="large"
                  min={1}
                  max={1000}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={'space-between'}>
            <Col xs={24} xl={11}>
              <Form.Item label="Medida*">
                <InputNumber<string>
                  placeholder="ex: 10.50"
                  size="large"
                  min="0"
                  max="100000"
                  step="0.1"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} xl={11}>
              <Form.Item label="Empacotamento*">
                <Select
                  size="large"
                  defaultValue="Selecione a Unidade de Medida"
                  onChange={handleChange}
                  options={[
                    { label: 'Metro Linear', value: 'ML' },
                    { label: 'Metro Cúbico', value: 'M3' },
                    { label: 'Metro Quadrado', value: 'M2' },
                    { label: 'Kilo', value: 'KG' },
                    { label: 'Litro', value: 'LITRO' },
                    { label: 'Tonelada', value: 'TONELADA' },
                    { label: 'Unidade', value: 'UNIDADE' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Space direction="horizontal">
            <Button type="primary" icon={props.iconButton.register}>
              {props.labelRegister}
            </Button>
            <Button type="primary" danger icon={props.iconButton.cancel}>
              Cancelar
            </Button>
          </Space>
        </Form>
      ),
    },
  ];

  return (
    <WrapperDefault title={props.title}>
      <Tabs type="card" items={items} style={{ minHeight: 276 }} />
    </WrapperDefault>
  );
}
