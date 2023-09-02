import { LockTwoTone, StopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Select, SelectProps, Space } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hasPermission } from '../../auth/utils/isAuthenticated';
import useAuth from '../../core/hooks/useAuth';
import { Permission, Role, User } from '../../sdk';
import WrapperDefault from '../components/WrapperDefault';

type GrantingPermissionsType = Permission.CollectionDetailedModel;

interface GrantingPermissionsFormDefaultProps {
  title: string;
  isNotGranted: boolean;
  profile:
    | 'REVOKE_ROLE'
    | 'GRANT_ROLE'
    | 'REVOKE_PERMISSIONS'
    | 'GRANT_PERMISSIONS';
  optionsAllNotOrGranted: SelectProps['options'];
  optionsRoleOrUser: Role.CollectionDetailed | User.SummaryNameModel;
  onPermissionsNotOrGranted: (value: number) => GrantingPermissionsType;
  onGrantingPermissions: (
    roleId: number,
    permissionId: number,
    permission: string,
  ) => Promise<any>;
}
export default function GrantForm(props: GrantingPermissionsFormDefaultProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [notGranted, setNotGranted] = useState<string>('');
  const [receivePermissionOrRole, setReceivePermissionOrRole] = useState<{
    id: number;
    description?: string;
  }>();
  const [roleOrUser, setRoleOrUser] = useState<{
    id: number;
    name: string;
  }>();

  const [fetching, setFetching] = useState<boolean>();

  const { userAuth } = useAuth();

  const access: { id: number; name: string } | undefined = useMemo(() => {
    return roleOrUser;
  }, [{ ...roleOrUser }]);
  //@ts-ignore
  const permissionOrRole: { id: number; description: string } = useMemo(() => {
    return receivePermissionOrRole;
  }, [{ ...receivePermissionOrRole }]);

  const { xs } = useBreakpoint();

  const labels = useCallback((firstLabel: string, secondLabel: string) => {
    return props.profile.includes('REVOKE_ROLE') ||
      props.profile.includes('GRANT_ROLE')
      ? firstLabel
      : props.profile.includes('REVOKE_PERMISSIONS') ||
        props.profile.includes('GRANT_PERMISSIONS')
      ? secondLabel
      : '';
  }, []);

  const perm: any = {
    permission: (
      <Select
        loading={fetching}
        size="large"
        style={{ width: '100%' }}
        onChange={(value, option: any) => {
          setReceivePermissionOrRole({
            ...receivePermissionOrRole,
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
      <Form
        form={form}
        layout="vertical"
        disabled={!hasPermission('EDIT_SECTORS', userAuth)}
      >
        <Row gutter={30}>
          <Col xs={24} lg={8}>
            <Form.Item
              label={labels('Selecione um usuário', 'Selecione um Role')}
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

                  setRoleOrUser({
                    ...roleOrUser,
                    id: value,
                    name: option?.label,
                  });

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
                options={props.optionsRoleOrUser}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={16}>
            {perm[notGranted] && (
              <Form.Item
                label={labels('Selecione um role', 'Selecione uma permissão')}
                name={'grant'}
              >
                {perm[notGranted]}
              </Form.Item>
            )}
          </Col>
        </Row>
        <Space
          direction={xs ? 'vertical' : 'horizontal'}
          style={{ width: '100%' }}
        >
          <Button
            block={xs ? true : false}
            loading={fetching}
            type="primary"
            onClick={() => {
              setFetching(true);
              if (props.optionsAllNotOrGranted && props.optionsRoleOrUser)
                form.setFieldValue('grant', '');
              return (
                props.onGrantingPermissions &&
                props
                  .onGrantingPermissions(
                    Number(access?.id),
                    Number(permissionOrRole?.id),
                    permissionOrRole?.description,
                  )
                  .finally(() => {
                    setFetching(false);
                  })
              );
            }}
            icon={<LockTwoTone />}
          >
            {props.isNotGranted ? 'CONCEDER' : 'REVOGAR'}
          </Button>
          <Link to={'/perfis-de-acesso'}>
            <Button
              block={xs ? true : false}
              type="primary"
              danger
              icon={<StopOutlined />}
            >
              CANCELAR
            </Button>
          </Link>
        </Space>
      </Form>
    </WrapperDefault>
  );
}
