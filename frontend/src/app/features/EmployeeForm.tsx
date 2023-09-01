import {
  Avatar,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Upload,
  notification,
} from 'antd';
import ImageCrop from 'antd-img-crop';
import { useNavigate } from 'react-router-dom';
import { User } from '../../sdk/@types';
import WrapperDefault from '../components/WrapperDefault';
const { RangePicker } = DatePicker;

import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  SaveOutlined,
  StopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MaskedInput } from 'antd-mask-input';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useCallback, useEffect, useState } from 'react';
import useAuth from '../../core/hooks/useAuth';
import { AvatarService, UserService } from '../../sdk/services';
import ButtonForm from '../components/ButtonForm';

type UserFormType = User.Detailed;
interface TaskFormDefaultProps {
  labelRegister: string;
  iconButton: {
    register: React.ReactNode;
    cancel: React.ReactNode;
  };
  isCurrentUser?: boolean;
  title: string;
  user?: UserFormType;
  onUpdate?: (user: User.UpdateInput) => any;
}

export default function EmployeeForm(props: TaskFormDefaultProps) {
  const [form] = Form.useForm<User.Input>();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(props.user?.avatarUrl || '');
  const [filename, setFilename] = useState<string>('');
  const { userAuth } = useAuth();
  const { xs, sm, md, lg } = useBreakpoint();
  const handleAvatarUpload = useCallback(async (file: File) => {
    const avatarSource = await AvatarService.upload(file);
    setAvatarUrl(avatarSource);
  }, []);

  const [fetching, setFetching] = useState<boolean>();

  useEffect(() => {
    form.setFieldsValue({
      avatarUrl: avatarUrl.avatarUrl || undefined,
    });
    setFilename(avatarUrl?.avatarUrl?.split('/').pop());
  }, [avatarUrl, form, filename]);

  return (
    <WrapperDefault title={props.title}>
      <Form
        layout={'vertical'}
        autoComplete="off"
        form={form}
        onFinish={async (user: User.Input | User.UpdateInput) => {
          const userDTO: User.Input | User.UpdateInput = {
            ...user,
            whatsApp: user.whatsApp
              ? user.whatsApp.replace(/\D/g, '')
              : user.whatsApp,
            cpf: user.cpf ? user.cpf.replace(/\D/g, '') : user.cpf,
          };

          if (props.user) return props.onUpdate && props.onUpdate(userDTO);

          setFetching(true);
          await UserService.createUser(userDTO).finally(() =>
            setFetching(false),
          );
          notification.success({
            message: 'Sucesso',
            description: `Colaborador ${user?.name} criado com sucesso`,
          });
          form.resetFields();
          return navigate('/colaboradores')
        }}
        initialValues={props.user}
      >
        <Divider orientation="left">DADOS PESSOAIS</Divider>
        <Row justify={'space-between'} gutter={40}>
          <Col xs={24} lg={3}>
            <div
              style={
                xs || sm || md
                  ? { display: 'flex', justifyContent: 'center' }
                  : {}
              }
            >
              <ImageCrop rotationSlider cropShape={'round'} showGrid aspect={1}>
                <Upload
                  maxCount={1}
                  onRemove={() => {
                    AvatarService.remove(filename);
                    setAvatarUrl('');
                    form.setFieldsValue({
                      avatarUrl: '',
                    });
                  }}
                  beforeUpload={(file) => {
                    if (avatarUrl?.avatarUrl) AvatarService.remove(filename);
                    handleAvatarUpload(file);
                    return false;
                  }}
                  fileList={[
                    ...(avatarUrl
                      ? [
                          {
                            name: 'Avatar',
                            uid: '',
                          },
                        ]
                      : []),
                  ]}
                >
                  <Avatar
                    style={{ cursor: 'pointer' }}
                    icon={<UserOutlined />}
                    src={
                      avatarUrl.avatarUrl
                        ? avatarUrl.avatarUrl
                        : props.user?.avatarUrl
                    }
                    size={xs ? 80 : sm ? 100 : 128}
                  />
                </Upload>
              </ImageCrop>
            </div>

            <Form.Item name={'avatarUrl'} hidden>
              <Input hidden />
            </Form.Item>
          </Col>
          <Col xs={24} xl={11}>
            <Form.Item label="Nome:*" name={'name'}>
              <Input size="large" placeholder="ex: João dos Santos" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={10}>
            <Form.Item label="CPF:*" name={'cpf'}>
              <MaskedInput
                size="large"
                mask={'000.000.000-00'}
                placeholder="e.g.: 000.000.000-00"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'} gutter={40}>
          <Col xs={24} xl={props.isCurrentUser ? 12 : 8}>
            <Form.Item label="Email:*" name={'email'}>
              <Input size="large" placeholder="ex: joaosantos@email.com" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={props.isCurrentUser ? 12 : 8}>
            <Form.Item label="WhatsApp:*" name={'whatsApp'}>
              <MaskedInput
                size="large"
                mask="(00) 00000-0000"
                placeholder={'(00) 00000-0000'}
              />
            </Form.Item>
          </Col>
          {!props.isCurrentUser && (
            <Col xs={24} xl={8}>
              <Form.Item label="Senha" name={'password'}>
                <Input.Password
                  size="large"
                  type="password"
                  placeholder="nova senha"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>
          )}
        </Row>
        <Divider orientation="left">DADOS PROFISSIONAIS</Divider>
        <Row justify={'space-between'} gutter={40}>
          <Col xs={24} xl={8}>
            <Form.Item label="Cargo:*" name={'office'}>
              <Input size="large" placeholder="ex: Azulejista" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item label="Função:*" name={'occupation'}>
              <Input size="large" placeholder="ex: Instalador de gesso" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item label="Escolaridade*" name={'literate'}>
              <Select
                size="large"
                defaultValue="Selecione a Escolaridade"
                options={[
                  {
                    label: 'Curso Superior completo',
                    value: 'Curso Superior completo',
                  },
                  {
                    label: 'Curso Superior Incompleto',
                    value: 'Curso Superior Incompleto',
                  },
                  {
                    label: 'Ensino Médio',
                    value: 'Ensino Médio',
                  },
                  {
                    label: 'Ensino Fundamental',
                    value: 'Ensino Fundamental',
                  },
                  {
                    label: 'Ensino Básico',
                    value: 'Ensino Básico',
                  },
                  {
                    label: 'Não Alfabetizado',
                    value: 'Não Alfabetizado',
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <ButtonForm
          loading={fetching}
          icon={{
            create: props.user ? <EditOutlined /> : <SaveOutlined />,
            cancel: <StopOutlined />,
          }}
          label={{
            save: props.user ? 'EDITAR' : 'CRIAR',
            cancel: 'CANCELAR',
          }}
          link={{ cancel: '/colaboradores' }}
        />
      </Form>
    </WrapperDefault>
  );
}
