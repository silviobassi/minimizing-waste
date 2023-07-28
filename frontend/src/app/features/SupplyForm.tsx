import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  notification,
} from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Supply, SupplyService } from '../../sdk';
import CustomError from '../../sdk/CustomError';
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
  const [form] = Form.useForm<any>();

  const handleChange = (value: string) => {
    setSupplyType(value);
  };

  useEffect(() => {}, [supplyType]);

  return (
    <WrapperDefault title={props.title}>
      <Form
        layout="vertical"
        form={form}
        onFinish={async (
          supply: Supply.MaterialInput | Supply.EquipmentInput,
        ) => {
          try {
            const supplyDTO = {
              ...supply,
              supplyDescription: {
                measure: parseFloat(
                  supply.supplyDescription?.measure.replace(',', '.'),
                ),
                measureUnitType: supply.supplyDescription?.measureUnitType,
                quantity: supply.supplyDescription?.quantity,
                packing: supply.supplyDescription?.packing
              },
            };

            console.log(supplyDTO);
      

            if (supplyType === 'MATERIAL') {
              await SupplyService.createSupplyMaterial(supplyDTO).then(
                (supply: Supply.MaterialModel) =>
                  notification.success({
                    message: 'Sucesso',
                    description: `Recurso ${supply?.name}  criado com sucesso`,
                  }),
              );
            } else {
              await SupplyService.createSupplyEquipment(supplyDTO).then(
                (supply: Supply.EquipmentModel) =>
                  notification.success({
                    message: 'Sucesso',
                    description: `Recurso ${supply?.name}  criado com sucesso`,
                  }),
              );
            }
          } catch (error: any) {
            if (error instanceof CustomError) {
              if (error.data?.objects) {
                form.setFields(
                  error.data.objects.map((error: any) => {
                    return {
                      name: error.name
                        ?.split(/(\.|\[|\])/gi)
                        .filter(
                          (str: string) =>
                            str !== '.' &&
                            str !== '[' &&
                            str !== ']' &&
                            str !== '',
                        )
                        .map((str: string) =>
                          isNaN(Number(str)) ? str : Number(str),
                        ) as string[],
                      errors: [error.userMessage],
                    };
                  }),
                );
              } else {
                notification.error({
                  message: error.message,
                  description:
                    error.data?.detail === 'Network Error'
                      ? 'Erro de Rede'
                      : error.data?.detail,
                });
              }
            } else {
              notification.error({
                message: `Houve um erro: ${error.message}`,
              });
            }
          }
        }}
      >
        <Row justify={'space-between'} gutter={30}>
          <Col xs={24} xl={8}>
            <Form.Item label="Nome*" name={'name'}>
              <Input placeholder="e.g.: nome" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item label="Tipo do Recurso*">
              <Select
                onChange={handleChange}
                size="large"
                placeholder="Selecione o Tipo de Recurso"
                optionFilterProp="children"
                options={[
                  {
                    label: 'MATERIAL',
                    value: 'MATERIAL',
                  },
                  {
                    label: 'EQUIPAMENTO',
                    value: 'EQUIPAMENTO',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            {supplyType === 'MATERIAL' ? (
              <Form.Item label="Tipo da Manipulação*" name={['manipulation']}>
                <Select
                  onChange={handleChange}
                  size="large"
                  placeholder="Selecione o Tipo de Recurso"
                  optionFilterProp="children"
                  options={[
                    {
                      label: 'TRANSMUTÁVEL',
                      value: 'TRANSMUTÁVEL',
                    },
                    {
                      label: 'IMUTÁVEL',
                      value: 'IMUTÁVEL',
                    },
                  ]}
                />
              </Form.Item>
            ) : (
              <Form.Item label="Tipo do Volume*" name={['bulk']}>
                <Select
                  onChange={handleChange}
                  size="large"
                  placeholder="Selecione o Tipo do Volume"
                  optionFilterProp="children"
                  options={[
                    {
                      label: 'PEQUENO',
                      value: 'PEQUENO',
                    },
                    {
                      label: 'MÉDIO',
                      value: 'MÉDIO',
                    },
                    {
                      label: 'GRANDE',
                      value: 'GRANDE',
                    },
                  ]}
                />
              </Form.Item>
            )}
          </Col>
        </Row>
        <Row justify={'space-between'} gutter={30}>
          <Col xs={24} xl={6}>
            <Form.Item
              label="Embalagem*"
              name={['supplyDescription', 'packing']}
            >
              <Input placeholder="e.g.: embalagem" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={6}>
            <Form.Item
              label="Quantidade*"
              name={['supplyDescription', 'quantity']}
            >
              <InputNumber
                placeholder="e.g.: 20"
                size="large"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={6}>
            <Form.Item label="Medida*" name={['supplyDescription', 'measure']}>
              <Input placeholder="e.g.: 50,00" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={6}>
            <Form.Item label="Unidade de Medida*" name={['supplyDescription', 'measureUnitType']}>
              <Select
                size="large"
                placeholder="Selecione a Unidade de Medida"
                optionFilterProp="children"
                options={[
                  {
                    label: 'UNIDADE',
                    value: 'UNIDADE',
                  },
                  { label: 'ML', value: 'ML' },
                  { label: 'LITRO', value: 'LITRO' },
                  { label: 'M2', value: 'M2' },
                  { label: 'KG', value: 'KG' },
                  { label: 'TONELADA', value: 'TONELADA' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ marginTop: 10 }}>
          <Space direction="horizontal">
            <Button
              type="primary"
              htmlType="submit"
              icon={props.iconButton.register}
            >
              {props.labelRegister}
            </Button>
            <Link to={'/recursos'}>
              {' '}
              <Button type="primary" danger icon={props.iconButton.cancel}>
                Cancelar
              </Button>
            </Link>
          </Space>
        </Form.Item>
      </Form>
    </WrapperDefault>
  );
}
