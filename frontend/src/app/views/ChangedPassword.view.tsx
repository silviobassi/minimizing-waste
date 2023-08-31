import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { Divider, Form, Input, Typography, notification } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import AuthService from '../../auth/Authorization.service';
import useAuth from '../../core/hooks/useAuth';
import usePageTitle from '../../core/usePageTitle';
import { User, UserService } from '../../sdk';
import ButtonForm from '../components/ButtonForm';
import WrapperDefault from '../components/WrapperDefault';

export default function ChangedPasswordView() {
  usePageTitle('Alteração de Senha');
  const { xs, sm, md } = useBreakpoint();

  const { userAuth } = useAuth();

  const [form] = Form.useForm<User.PasswordInput>();

  return (
    <WrapperDefault title="ALTERAÇÃO DE SENHA DO USUÁRIO LOGADO">
      <Form
        layout="vertical"
        form={form}
        style={{
          margin:'50px auto' ,
          marginTop: '30px auto',
          maxWidth: 450,
          boxShadow: '1px 0px 37px 0px rgba(232,232,232,1)',
          padding: '60px 35px',
          borderRadius: 5,
          display: 'block',
        }}
        onFinish={async (password: User.PasswordInput) => {
          await UserService.changedPassword(password, userAuth?.id).then(
            (status: number) => {
              if (status === 204) {
                notification.success({
                  message: 'Sucesso',
                  description: `${userAuth?.name}, sua senha foi alterada com sucesso`,
                });
              }
            },
          );
          form.resetFields();
          AuthService.imperativelySendToLoginScreen();
        }}
      >
        <Form.Item label="Senha Atual" name={'currentPassword'}>
          <Input.Password
            size="large"
            type="password"
            placeholder="senha atual"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item label="Nova Senha" name={'newPassword'}>
          <Input.Password
            size="large"
            type="password"
            placeholder="nova senha"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <ButtonForm
          icon={{ create: <KeyOutlined />, cancel: <StopOutlined /> }}
          label={{
            save: 'ALTERAR',
            cancel: 'CANCELAR',
          }}
          link={{ cancel: '/' }}
        />{' '}
        <Divider />
        <Typography.Title level={5}>
          © Enfatiza7 - <Typography.Text>Minimizing Waste</Typography.Text>
        </Typography.Title>
      </Form>
    </WrapperDefault>
  );
}
