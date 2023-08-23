import {
  BarsOutlined,
  LockOutlined,
  SaveOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Row, Space, Transfer } from 'antd';
import { TransferDirection } from 'antd/es/transfer';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useCallback, useEffect, useState } from 'react';
import usePermissions from '../../core/hooks/usePermissions';
import { Permission, Role } from '../../sdk';
import WrapperDefault from '../components/WrapperDefault';

export default function EmployeeAccessControlView() {
  const [accessControlType, setAccessControlType] = useState<string>('role');
  const [form] = Form.useForm<Role.Input>();
  const { lg } = useBreakpoint();
  const { permissions, fetchPermissions } = usePermissions();
  const [sourcePermissions, setSourcePermissions] = useState<
    Permission.CollectionDetailedModel[]
  >([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

 

  const fetchPermissionSource = useCallback(() => {
    const tempPermissionData: any = [];
    permissions?._embedded?.permissions.map(
      (permission: Permission.DetailedModel) => {
        const data = {
          key: permission.id,
          name: permission.name,
          description: permission.description,
        };

        tempPermissionData.push(data);
      },
    );
    setSourcePermissions(tempPermissionData);
  }, []);

  const handleChange = (
    newTargetKeys: string[],
    direction: TransferDirection,
    moveKeys: string[],
  ) => {
    console.log(newTargetKeys, direction, moveKeys);
    setTargetKeys(newTargetKeys);
  };

  const renderItem = (item: Permission.DetailedModel) => {
    return <span className="custom-item">{item.name}</span>;
  };

  useEffect(() => {
    fetchPermissions();
    fetchPermissionSource();
  }, [fetchPermissions, fetchPermissionSource]);

  const accessControl: any = {
    role: (
      <Form form={form}>
        <Form.Item
          label="Nome:*"
          name={'name'}
          rules={[
            {
              required: false,
              message: 'o campo é obrigatório',
            },
          ]}
        >
          <Input placeholder="e.g.:nome do acesso" size="large" />
        </Form.Item>
        <Form.Item style={{ marginTop: 40 }}>
          <Space direction="horizontal">
            <Button type="primary" htmlType={'submit'} icon={<SaveOutlined />}>
              CRIAR
            </Button>
            <Button type="primary" danger icon={<StopOutlined />}>
              CANCELAR
            </Button>
          </Space>
        </Form.Item>
      </Form>
    ),
    permission: (
      <Transfer
        dataSource={sourcePermissions}
        listStyle={{
          width: 400,
          height: 400,
        }}
        targetKeys={targetKeys}
        onChange={handleChange}
        render={renderItem}
      />
    ),
  };

  return (
    <WrapperDefault title="Controle de Acesso">
      <Row style={{ marginBottom: 50 }}>
        <Col xs={24}>
          <Space direction={lg ? 'horizontal' : 'vertical'}>
            <Button
              type="dashed"
              icon={<BarsOutlined />}
              onClick={() => setAccessControlType('role')}
            >
              CRIAR NÍVEL DE ACESSO
            </Button>

            <Button
              type="dashed"
              icon={<LockOutlined />}
              onClick={() => {
                setAccessControlType('permission');
                fetchPermissionSource();
              }}
            >
              CONCEDER PERMISSÕES
            </Button>
          </Space>
        </Col>
      </Row>
      <Divider orientation="left">
        {accessControlType === 'role'
          ? 'CRIAÇÃO DE ACESSO'
          : 'CONTROLE DE PERMISSÕES'}
      </Divider>
      <Row justify={'start'}>
        <Col xs={24} lg={12}>
          {accessControl[accessControlType]}
        </Col>
      </Row>
    </WrapperDefault>
  );
}
