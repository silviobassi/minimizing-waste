import { EditOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Col, Form, Input, InputNumber, Row, Select, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../core/hooks/useAuth';
import { Supply, SupplyService } from '../../sdk';
import ButtonForm from '../components/ButtonForm';
import WrapperDefault from '../components/WrapperDefault';

interface SupplyFormDefaultProps {
  labelRegister: string;
  iconButton: {
    register: React.ReactNode;
    cancel: React.ReactNode;
  };
  title: string;
  onUpdateMaterial: (
    supply: Supply.MaterialInput,
  ) => Promise<Supply.MaterialModel>;
  onUpdateEquipment: (
    supply: Supply.EquipmentInput,
  ) => Promise<Supply.EquipmentModel>;
  supply: Supply.Detailed;
}

export default function SupplyForm(props: SupplyFormDefaultProps) {
  const [supplyKind, setSupplyKind] = useState<any>('material');
  const [form] = Form.useForm<any>();

  const { userAuth } = useAuth();
  const [fetching, setFetching] = useState<boolean>();

  const navigate = useNavigate();
  const supply: any = {
    material: (
      <Form.Item
        label="Manipulação*"
        name={'manipulation'}
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
          placeholder="Selecione a manipulação"
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
    equipamento: (
      <Form.Item
        label="Tamanho*"
        name={'bulk'}
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
          placeholder="Selecione o Tamanho"
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
    setSupplyKind(value.toLowerCase());
  };

  useEffect(() => {
    setSupplyKind(props.supply?.supplyType.toLowerCase());
  }, []);

  return (
    <WrapperDefault title={props.title}>
      <Form
        layout="vertical"
        form={form}
        initialValues={props.supply}
        onFinish={async (
          supply: Supply.MaterialInput | Supply.EquipmentInput,
        ) => {
          const supplyDTO = {
            ...supply,
            supplyDescription: {
              measure: parseFloat(supply.supplyDescription?.measure),
              measureUnitType: supply.supplyDescription?.measureUnitType,
              quantity: supply.supplyDescription?.quantity,
              packing: supply.supplyDescription?.packing,
            },
          };

          setFetching(true);
          if (supplyKind === 'material') {
            if (props.supply) {
              return (
                props.onUpdateMaterial &&
                props.onUpdateMaterial(supplyDTO).finally(() => {
                  setFetching(false);
                })
              );
            }
            await SupplyService.createSupplyMaterial(supplyDTO)
              .then((supply: Supply.MaterialModel) => {
                notification.success({
                  message: 'Sucesso',
                  description: `Recurso ${supply?.name}  criado com sucesso`,
                }),
                  navigate('/recursos');
              })
              .finally(() => {
                setFetching(false);
                form.resetFields();
              });
          } else {
            if (props.supply) {
              return (
                props.onUpdateEquipment &&
                props.onUpdateEquipment(supplyDTO).finally(() => {
                  setFetching(false);
                  form.resetFields();
                })
              );
            }

            await SupplyService.createSupplyEquipment(supplyDTO)
              .then((supply: Supply.EquipmentModel) => {
                notification.success({
                  message: 'Sucesso',
                  description: `Recurso ${supply?.name}  criado com sucesso`,
                });
                navigate('/recursos');
              })
              .finally(() => {
                setFetching(false);
                form.resetFields();
              });
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
              name={'supplyType'}
              label="Tipo do Recurso"
              rules={[
                {
                  required: true,
                  message: 'O tipo de recurso é obrigatório',
                },
                {
                  type: 'enum',
                  enum: ['MATERIAL', 'EQUIPAMENTO'],
                  message: `O tipo do recurso precisa ser: MATERIAL ou EQUIPAMENTO`,
                },
              ]}
            >
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
            {supply[supplyKind]}
          </Col>
        </Row>
        <Row justify={'space-between'} gutter={30}>
          <Col xs={24} xl={6}>
            <Form.Item
              label="Embalagem*"
              name={['supplyDescription', 'packing']}
              rules={[
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
                },
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
              <InputNumber size="large" style={{ width: '100%' }} />
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
                  enum: [
                    'UNIDADE',
                    'ML',
                    'LITRO',
                    'M2',
                    'M3',
                    'KG',
                    'TONELADA',
                  ],
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
        <ButtonForm
          loading={fetching}
          icon={{
            create: props.supply ? <EditOutlined /> : <SaveOutlined />,
            cancel: <StopOutlined />,
          }}
          label={{
            save: props.supply ? 'EDITAR' : 'CRIAR',
            cancel: 'CANCELAR',
          }}
          link={{ cancel: '/recursos' }}
        />
      </Form>
    </WrapperDefault>
  );
}
