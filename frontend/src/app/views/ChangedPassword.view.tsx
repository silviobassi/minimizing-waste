import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SaveOutlined,
  StopOutlined,
} from '@ant-design/icons';
import {
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
  notification,
} from 'antd';
import AuthService from '../../auth/Authorization.service';
import useAuth from '../../core/hooks/useAuth';
import usePageTitle from '../../core/usePageTitle';
import { User, UserService } from '../../sdk';
import ButtonForm from '../components/ButtonForm';
import WrapperDefault from '../components/WrapperDefault';

export default function ChangedPasswordView() {
  usePageTitle('Alteração de Senha');

  const { userAuth } = useAuth();

  const [form] = Form.useForm<User.PasswordInput>();

  return (
    <WrapperDefault title="ALTERAÇÃO DE SENHA DO USUÁRIO LOGADO">
      <Row justify={'center'} gutter={40}>
        <Col xs={24} lg={12}>
          <Card
            style={{
              margin: 40,
              padding: 15,
              boxShadow: '1px 0px 37px 0px rgba(232,232,232,1)',
            }}
          >
            <Form
              layout="vertical"
              form={form}
              style={{ marginBottom: 50, marginTop: 30 }}
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
                icon={{ create: <SaveOutlined />, cancel: <StopOutlined /> }}
                label={{
                  save: 'ALTERAR',
                  cancel: 'CANCELAR',
                }}
                link={{ cancel: '/' }}
              />
            </Form>
            <Divider />
            <Typography.Title level={5}>
              © Enfatiza7 - <Typography.Text>Minimizing Waste</Typography.Text>
            </Typography.Title>
          </Card>
        </Col>
      </Row>
    </WrapperDefault>
  );
}
