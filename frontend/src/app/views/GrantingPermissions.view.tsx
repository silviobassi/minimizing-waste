import { Col, Form, Row, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import useAccessProfiles from '../../core/hooks/useAccessProfiles';
import usePageTitle from '../../core/usePageTitle';
import { Permission, Role } from '../../sdk';
import WrapperDefault from '../components/WrapperDefault';

import type { SelectProps } from 'antd';
import usePermissions from '../../core/hooks/usePermissions';

export default function GrantingPermissionsView() {
  usePageTitle('Concessão de Permissões');
  const { fetchRoles, roles } = useAccessProfiles();
  const { permissionsNotGranted, fetchPermissionsAllNotGranted } =
    usePermissions();
  const [form] = Form.useForm();
  const [notGranted, setNotGranted] = useState<string>('');

  const option = useCallback(() => {
    return fetchOptions();
  }, [fetchOptions]);

  useEffect(() => {
    fetchRoles();
  
  }, [fetchRoles, fetchPermissionsAllNotGranted]);

  const optionsAllNotGranted: SelectProps['options'] = [];

  permissionsNotGranted?._embedded?.permissions.map(
    (permission: Permission.DetailedModel) => {
      return optionsAllNotGranted.push({
        label: `${permission.name} - ${permission.description}`,
        value: permission.id,
      });
    },
  );

  function fetchOptions() {
    const options: Role.CollectionDetailed = [];
    roles?._embedded?.roles.map((role: Role.Detailed) => {
      options.push({
        label: role.name,
        value: role.id,
      });
    });
    return options;
  }

  const perm: any = {
    permission: (
      <Select
        size="large"
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Selecione as permissões"
        onChange={(value: number[]) => console.log(value)}
        options={optionsAllNotGranted}
      />
    ),
  };

  return (
    <WrapperDefault title="Concessão de Permissões">
      <Form form={form} layout="vertical">
        <Row gutter={30}>
          <Col xs={24} lg={8}>
            <Form.Item label="Perfis de Acesso" name={'role'}>
              <Select
                style={{ width: '100%' }}
                onChange={(value) => {
                 fetchPermissionsAllNotGranted(value)
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
                options={option()}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={16}>
            {perm[notGranted] && (
              <Form.Item label="Permissões a serem concedidas">{perm[notGranted]}</Form.Item>
            )}
          </Col>
        </Row>
      </Form>
    </WrapperDefault>
  );
}
