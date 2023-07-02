import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
  notification,
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../sdk/@types';
import FileService from '../../sdk/services/File.service';
import WrapperDefault from '../components/WrapperDefault';
const { RangePicker } = DatePicker;

import { UserOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { MaskedInput } from 'antd-mask-input';
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload/interface';
import CustomError from '../../sdk/CustomError';
import { UserService } from '../../sdk/services';

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
  avatarUrl?: string;
  onUpdate?: (user: User.UpdateInput, file: RcFile) => any;
}

export default function EmployeeForm(props: TaskFormDefaultProps) {
  const [form] = Form.useForm<User.Input>();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>();
  const [photo, setPhoto] = useState<RcFile>();

  useEffect(() => {}, [photo]);

  const beforeUpload = (file: RcFile) => {
    setPhoto(file);
    return true;
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setImageUrl(url);
    });
  };

  return (
    <WrapperDefault title={props.title}>
      <Form
        initialValues={props.user}
        layout={'vertical'}
        autoComplete="off"
        form={form}
        onFinish={async (user: User.Input | User.UpdateInput) => {
          try {
            const userDTO: User.Input | User.UpdateInput = {
              ...user,
              whatsApp: user.whatsApp
                ? user.whatsApp.replace(/\D/g, '')
                : user.whatsApp,
              cpf: user.cpf ? user.cpf.replace(/\D/g, '') : user.cpf,
            };

            if (props.user)
              return props.onUpdate && props.onUpdate(userDTO, photo);

            const dataUser = await UserService.createUser(userDTO);
            if (photo) await FileService.updatePhoto(photo, dataUser.id);

            notification.success({
              message: 'Sucesso',
              description: `Colaborador ${user?.name} criado com sucesso`,
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
              } else {
                notification.error({
                  message: error.message,
                  description:
                    error.data?.detail === 'Network Error'
                      ? 'Erro de Rede'
                      : error.data?.detail,
                });
              }
            } else {
              notification.error({
                message: `Houve um erro: ${error.message}`,
              });
            }
          }
        }}
      >
        <Divider orientation="left">DADOS PESSOAIS</Divider>
        <Row justify={'space-between'} gutter={24}>
          <Col xs={24} xl={3}>
            <ImgCrop rotationSlider cropShape={'round'} showGrid aspect={1}>
              <Upload
                name="avatar"
                showUploadList={false}
                maxCount={1}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                <Avatar
                  src={photo ? imageUrl : (props.avatarUrl ? props.avatarUrl : imageUrl)}
                  size={128}
                  style={{ cursor: 'pointer' }}
                  icon={<UserOutlined />}
                />
              </Upload>
            </ImgCrop>
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
        <Row justify={'space-between'} gutter={24}>
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
              <Form.Item label="Senha:*" name={'password'}>
                <Input size="large" placeholder="ex: hd746¨0^k" />
              </Form.Item>
            </Col>
          )}
        </Row>
        <Divider orientation="left">DADOS PROFISSIONAIS</Divider>
        <Row justify={'space-between'} gutter={24}>
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
        <Form.Item style={{ marginTop: 40 }}>
          <Space direction="horizontal">
            <Button
              type="primary"
              icon={props.iconButton.register}
              htmlType="submit"
            >
              {props.labelRegister}
            </Button>
            <Button
              type="primary"
              danger
              icon={props.iconButton.cancel}
              onClick={() => navigate('/colaboradores')}
            >
              Cancelar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </WrapperDefault>
  );
}
