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
} from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../sdk/@types';
import WrapperDefault from '../components/WrapperDefault';

const { RangePicker } = DatePicker;
interface TaskFormDefaultProps {
  labelRegister: string;
  iconButton: {
    register: React.ReactNode;
    cancel: React.ReactNode;
  };
  title: string;
}

export default function EmployeeForm(props: TaskFormDefaultProps) {
  const [form] = Form.useForm<User.Input>();
  const navigate = useNavigate();

  const handleAvatarUpload = useCallback((file: File) => {
    // chamar serviço aqui  
    return;
  }, [])

  return (
    <WrapperDefault title={props.title}>
      <Form layout={'vertical'} form={form}>
        <Divider orientation="left">DADOS PESSOAIS</Divider>
        <Row justify={'space-between'} gutter={24}>
          <Col xs={24} xl={4}>
            <Upload
              beforeUpload={async (file) => await handleAvatarUpload(file)}
            >
              <Avatar size={128} />
            </Upload>
          </Col>
          <Col xs={24} xl={10}>
            <Form.Item label="Nome:*">
              <Input size="large" placeholder="ex: João dos Santos" />
            </Form.Item>
            <Form.Item label="CPF:*">
              <Input size="large" placeholder="ex: 999.999.999-99" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={10}>
            <Form.Item label="Email:*">
              <Input size="large" placeholder="ex: joaosantos@email.com" />
            </Form.Item>
            <Form.Item label="WhatsApp:*">
              <Input size="large" placeholder="ex: (17) 99999-9999" />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="left">DADOS PROFISSIONAIS</Divider>
        <Row justify={'space-between'} gutter={24}>
          <Col xs={24} xl={8}>
            <Form.Item label="Senha:*">
              <Input size="large" placeholder="ex: hd746¨0^k" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item label="Cargo:*">
              <Input size="large" placeholder="ex: Azulejista" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item label="Função:*">
              <Input size="large" placeholder="ex: Instalador de gesso" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'} gutter={24}>
          <Col xs={24} xl={12}>
            <Form.Item label="Escolaridade*">
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
          <Col xs={24} xl={12}>
            <Form.Item label="Grupo de Usuários*">
              <Select
                size="large"
                defaultValue="Selecione o Grupo do Colaborador"
                options={[
                  {
                    label: 'ADMINISTRADOR',
                    value: 'ADMINISTRADOR',
                  },
                  {
                    label: 'ENCARREGADO',
                    value: 'ENCARREGADO',
                  },
                  {
                    label: 'OPERÁRIO',
                    value: 'OPERÁRIO',
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ marginTop: 40 }}>
          <Space direction="horizontal">
            <Button type="primary" icon={props.iconButton.register}>
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
