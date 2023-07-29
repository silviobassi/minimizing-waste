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
  const [supplyType, setSupplyType] = useState<any>('material');
  const [form] = Form.useForm<any>();

  const supply: any = {
    material: (
      <Form.Item
        label="Tipo da Manipulação*"
        name={['manipulation']}
        rules={[
          {
            required: true,
            message: 'O tipo de manipulação é obrigatório',
          },
          {
            type: 'enum',
            enum: ['TRANSMUTÁVEL', 'IMUTÁVEL'],
            message: `O tipo de manipulação precisa ser: TRANSMUTÁVEL ou IMUTÁVEL`,
          },
        ]}
      >
        <Select
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
    ),
    equipment: (
      <Form.Item
        label="Tipo do Volume*"
        name={['bulk']}
        rules={[
          {
            required: true,
            message: 'O tipo de volume é obrigatório',
          },
          {
            type: 'enum',
            enum: ['PEQUENO', 'MÉDIO', 'GRANDE'],
            message: `O tipo de manipulação precisa ser: PEQUENO, MÉDIO ou GRANDE`,
          },
        ]}
      >
        <Select
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
    ),
  };

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
                  supply.supplyDescription?.measure,
                ),
                measureUnitType: supply.supplyDescription?.measureUnitType,
                quantity: supply.supplyDescription?.quantity,
                packing: supply.supplyDescription?.packing,
              },
            };

            console.log(supplyDTO);

            if (supplyType === 'material') {
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
            <Form.Item
              label="Nome"
              name={'name'}
              rules={[
                {
                  required: true,
                  message: 'O nome é obrigatório',
                },
                {
                  max: 50,
                  message: `O nome não pode ter mais de 50 caracteres`,
                },
              ]}
            >
              <Input placeholder="e.g.: nome" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item
              label="Tipo do Recurso"
              rules={[
                {
                  required: true,
                  message: 'O tipo de recurso é obrigatório',
                },
                {
                  type: 'enum',
                  enum: ['material', 'equipment', 'MANAGER'],
                  message: `O tipo do recurso precisa ser: MATERIAL ou EQUIPAMENTO`,
                },
              ]}
            >
              <Select
                onChange={handleChange}
                defaultValue={'material'}
                size="large"
                placeholder="Selecione o Tipo de Recurso"
                optionFilterProp="children"
                options={[
                  {
                    label: 'MATERIAL',
                    value: 'material',
                  },
                  {
                    label: 'EQUIPAMENTO',
                    value: 'equipment',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            {supply[supplyType]}
          </Col>
        </Row>
        <Row justify={'space-between'} gutter={30}>
          <Col xs={24} xl={6}>
            <Form.Item
              label="Embalagem*"
              name={['supplyDescription', 'packing']}
              rules={[
                {
                  required: true,
                  message: 'A embalagem é obrigatória',
                },
                {
                  max: 70,
                  message: `A embalagem não pode ter mais de 70 caracteres`,
                },
              ]}
            >
              <Input placeholder="e.g.: embalagem" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={6}>
            <Form.Item
              label="Quantidade*"
              name={['supplyDescription', 'quantity']}
              rules={[
                {
                  required: true,
                  message: 'A quantidade é obrigatória',
                }
              ]}
            >
              <InputNumber
                placeholder="e.g.: 20"
                size="large"
                style={{ width: '100%' }}
                min={1}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={6}>
            <Form.Item label="Medida" name={['supplyDescription', 'measure']}>
              <Input placeholder="e.g.: 30,50 ou 30" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={6}>
            <Form.Item
              label="Unidade de Medida*"
              name={['supplyDescription', 'measureUnitType']}
              rules={[
                {
                  required: true,
                  message: 'A unidade de medida é obrigatória',
                },
                {
                  type: 'enum',
                  enum: ['UNIDADE', 'ML', 'LITRO', 'M2', 'M3', 'KG', 'TONELADA'],
                  message:
                    'A unidade de medida precisa ser: UNIDADE, ML, LITRO, M2, M3, KG ou TONELADA',
                },
              ]}
            >
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
                  { label: 'M3', value: 'M3' },
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
