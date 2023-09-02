import { EditOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, notification } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../core/hooks/useAuth';
import { Role } from '../../sdk';
import { RoleService } from '../../sdk/services';
import ButtonForm from '../components/ButtonForm';

type RoleType = Role.Detailed;

interface AccessProfileFormDefaultProps {
  onUpdate?: (role: Role.Input) => Promise<RoleType>;
  role?: RoleType;
}

export default function AccessProfileForm(
  props: AccessProfileFormDefaultProps,
) {
  const [form] = Form.useForm<Role.Input>();
  const { userAuth } = useAuth();
  const [fetching, setFetching] = useState<boolean>();
  const navigate = useNavigate();
  return (
    <Row justify={'start'}>
      <Col xs={24}>
        <Form
          layout="vertical"
          form={form}
          initialValues={props.role}
          onFinish={async (role: Role.Input) => {
            setFetching(true);
            if (props.role) {
              return (
                props.onUpdate &&
                props.onUpdate(role).finally(() => {
                  setFetching(false);
                  form.resetFields();
                })
              );
            }

            await RoleService.createRole(role)
              .then((role: Role.Detailed) => {
                notification.success({
                  message: 'Sucesso',
                  description: `Role ${role?.name} criado com sucesso`,
                });
                navigate('/perfis-de-acesso');
              })
              .finally(() => {
                setFetching(false);
                form.resetFields();
              });
          }}
        >
          <Form.Item label="Nome" name={'name'}>
            <Input type="text" size="large" />
          </Form.Item>

          <ButtonForm
            loading={fetching}
            icon={{
              create: props.role ? <EditOutlined /> : <SaveOutlined />,
              cancel: <StopOutlined />,
            }}
            label={{
              save: props.role ? 'EDITAR' : 'CRIAR',
              cancel: 'CANCELAR',
            }}
            link={{ cancel: '/perfis-de-acesso' }}
          />
        </Form>
      </Col>
    </Row>
  );
}
