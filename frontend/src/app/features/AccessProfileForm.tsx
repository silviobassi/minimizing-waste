import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, notification } from 'antd';
import { hasPermission } from '../../auth/utils/isAuthenticated';
import useAuth from '../../core/hooks/useAuth';
import { Role } from '../../sdk';
import CustomError from '../../sdk/CustomError';
import { RoleService } from '../../sdk/services';
import AccessDenied from '../components/AccessDenied';
import ButtonForm from '../components/ButtonForm';

type RoleType = Role.Detailed;

interface AccessProfileFormDefaultProps {
  onUpdate?: (role: Role.Input) => RoleType;
  role?: RoleType;
}

export default function AccessProfileForm(
  props: AccessProfileFormDefaultProps,
) {
  const [form] = Form.useForm<Role.Input>();
  const { userAuth } = useAuth();

  if (!hasPermission('EDIT_USER', userAuth))
    return (
      <AccessDenied>
        Você não tem permissão para executar esta operação!
      </AccessDenied>
    );

  return (
    <Row justify={'start'}>
      <Col xs={24}>
        <Form
          layout="vertical"
          form={form}
          initialValues={props.role}
          onFinish={async (role: Role.Input) => {
           

            try {
              if (props.role) {
   
                return props.onUpdate && props.onUpdate(role, );
              }
              await RoleService.createRole(role).then((role: Role.Detailed) => {
                notification.success({
                  message: 'Sucesso',
                  description: `Role ${role?.name} criado com sucesso`,
                });
              });
            } catch (error) {
              if (error instanceof CustomError) {
                if (error.data?.objects) {
                  form.setFields(
                    error.data.objects.map((error: any) => {
                      return {
                        name: error.name?.split('.') as string[],
                        errors: [error.userMessage],
                      };
                    }),
                  );
                }
              } else {
                notification.error({
                  message: 'Houve um erro',
                });
              }
            }
          }}
        >
          <Form.Item label="Nome" name={'name'}>
            <Input type="text" size="large" />
          </Form.Item>

          <ButtonForm
            icon={{ create: <SaveOutlined />, cancel: <StopOutlined /> }}
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
