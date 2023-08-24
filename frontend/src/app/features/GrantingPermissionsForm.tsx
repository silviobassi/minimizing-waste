import { LockTwoTone, StopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Select, SelectProps, Space } from 'antd';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Permission, Role } from '../../sdk';
import WrapperDefault from '../components/WrapperDefault';

type GrantingPermissionsType = Permission.CollectionDetailedModel;

interface GrantingPermissionsFormDefaultProps {
  title: string;
  isNotGranted: boolean;
  optionsAllNotOrGranted: SelectProps['options'];
  optionsRole: Role.CollectionDetailed;
  onPermissionsNotOrGranted: (value: number) => GrantingPermissionsType;
  onGrantingPermissions: (roleId: number, permissionId: number) => any;
}
export default function GrantingPermissionsForm(
  props: GrantingPermissionsFormDefaultProps,
) {
  const [form] = Form.useForm();
  const [notGranted, setNotGranted] = useState<string>('');
  const [receiveConcession, setReceiveConcession] = useState<number[]>([]);
  const [role, setRole] = useState<{ id: number }>();

  const roleId = useMemo(() => {
    return role?.id;
  }, [role?.id]);

  const perm: any = {
    permission: (
      <Select
        size="large"
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Selecione as permissões"
        onChange={(value) => {
          const grant: number[] = [];
          grant.push(value);
          setReceiveConcession(grant);
        }}
        optionFilterProp="children"
        filterOption={(input, option: any) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={props.optionsAllNotOrGranted}
      />
    ),
  };

  return (
    <WrapperDefault title={props.title}>
      <Form form={form} layout="vertical">
        <Row gutter={30}>
          <Col xs={24} lg={8}>
            <Form.Item label="Perfis de Acesso" name={'role'}>
              <Select
                style={{ width: '100%' }}
                onChange={(value) => {
                  if (props.optionsAllNotOrGranted) {
                    props.onPermissionsNotOrGranted(value);
                  }
                  setRole({ ...role, id: value });
                  setNotGranted('permission');
                }}
                onClear={() => form.setFieldValue('grant', '')}
                size="large"
                showSearch
                placeholder="Selecione o Perfil de Acesso"
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={props.optionsRole}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={16}>
            {perm[notGranted] && (
              <Form.Item label="Permissões a serem concedidas" name={'grant'}>
                {perm[notGranted]}
              </Form.Item>
            )}
          </Col>
        </Row>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              receiveConcession.map((element: any) =>
                element.map(async (permissionId: number) => {
                  await props.onGrantingPermissions(
                    Number(roleId),
                    permissionId,
                  );
                }),
              );
            }}
            icon={<LockTwoTone />}
          >
            {props.isNotGranted ? 'CONCEDER' : 'REVOGAR'}
          </Button>
          <Link to={'/'}>
            <Button type="primary" danger icon={<StopOutlined />}>
              CANCELAR
            </Button>
          </Link>
        </Space>
      </Form>
    </WrapperDefault>
  );
}
