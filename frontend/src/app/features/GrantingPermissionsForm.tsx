import { LockTwoTone, StopOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Row,
  Select,
  SelectProps,
  Space,
  Typography,
} from 'antd';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { hasManagerUser } from '../../auth/utils/isAuthenticated';
import useAuth from '../../core/hooks/useAuth';
import { Permission, Role } from '../../sdk';
import WrapperDefault from '../components/WrapperDefault';

type GrantingPermissionsType = Permission.CollectionDetailedModel;

interface GrantingPermissionsFormDefaultProps {
  title: string;
  isNotGranted: boolean;
  optionsAllNotOrGranted: SelectProps['options'];
  optionsRole: Role.CollectionDetailed;
  onPermissionsNotOrGranted: (value: number) => GrantingPermissionsType;
  onGrantingPermissions: (
    roleId: number,
    permissionId: number,
    permission: string,
  ) => any;
}
export default function GrantingPermissionsForm(
  props: GrantingPermissionsFormDefaultProps,
) {
  const [form] = Form.useForm();
  const [notGranted, setNotGranted] = useState<string>('');
  const [receivePermission, setReceivePermission] = useState<{
    id: number;
    description: string;
  }>();
  const [role, setRole] = useState<{ id: number; name: string }>();
  const { userAuth } = useAuth();

  const access: { id: number; name: string } | undefined = useMemo(() => {
    return role;
  }, [{ ...role }]);

  const permission: { id: number; description: string } | undefined =
    useMemo(() => {
      return receivePermission;
    }, [{ ...receivePermission }]);

  const perm: any = {
    permission: (
      <Select
        disabled={
          !props.isNotGranted ? hasManagerUser(userAuth, access?.name) : false
        }
        size="large"
        style={{ width: '100%' }}
        placeholder="Selecione as permissões"
        onChange={(value, option: any) => {
          setReceivePermission({
            ...receivePermission,
            id: value,
            description: option?.label,
          });
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
            <Form.Item
              label="Perfis de Acesso"
              name={'role'}
              rules={[
                {
                  required: false,
                  message: 'o campo é obrigatório',
                },
              ]}
            >
              <Select
                style={{ width: '100%' }}
                onChange={(value, option: any) => {
                  if (props.optionsAllNotOrGranted) {
                    props.onPermissionsNotOrGranted(value);
                  }
                  setRole({ ...role, id: value, name: option?.label });
                  setNotGranted('permission');
                }}
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
              <Form.Item
                label={
                  hasManagerUser(userAuth, access?.name) ? (
                    <Typography.Text type="danger">
                      Administrador não pode revogar suas permissões
                    </Typography.Text>
                  ) : (
                    'Selecione as Permissões '
                  )
                }
                name={'grant'}
              >
                {perm[notGranted]}
              </Form.Item>
            )}
          </Col>
        </Row>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              if (props.optionsAllNotOrGranted && props.optionsRole)
                form.setFieldValue('grant', '');
              return (
                props.onGrantingPermissions &&
                props.onGrantingPermissions(
                  Number(access?.id),
                  Number(permission?.id),
                  permission?.description,
                )
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
