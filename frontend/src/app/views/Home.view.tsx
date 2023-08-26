import {
  BankOutlined,
  BellOutlined,
  HomeOutlined,
  LockFilled,
  ReconciliationOutlined,
  RotateLeftOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import usePageTitle from '../../core/usePageTitle';
import MenuHomePage from '../components/MenuHomePage';
import WrapperDefault from '../components/WrapperDefault';

export default function HomeView() {
  usePageTitle('Home');

  return (
    <WrapperDefault title="Home">
      <Row gutter={20} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} lg={6}>
          {' '}
          <MenuHomePage
            link="/conceder-roles/perfis-de-acesso"
            labelColor="#001529"
            border="1px solid #001529"
          >
            <LockFilled style={{ marginRight: 15 }} />
            CONCEDER ROLES
          </MenuHomePage>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          {' '}
          <MenuHomePage
            link="/conceder-permissoes/perfis-de-acesso"
            labelColor="#001529"
            border="1px solid #001529"
          >
            <LockFilled style={{ marginRight: 15 }} />
            CONCEDER PERMISSÕES
          </MenuHomePage>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          {' '}
          <MenuHomePage
            link="/revogar-permissoes/perfis-de-acesso"
            labelColor="#fff"
            border="1px solid #001529"
            backgroundColor="#001529"
          >
            <LockFilled style={{ marginRight: 15 }} />
            REVOGAR PERMISSÕES
          </MenuHomePage>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          {' '}
          <MenuHomePage
            link="/revogar-roles/perfis-de-acesso"
            labelColor="#fff"
            border="1px solid #001529"
            backgroundColor="#001529"
          >
            <LockFilled style={{ marginRight: 15 }} />
            REVOGAR ROLES
          </MenuHomePage>
        </Col>
      </Row>

      <Row justify={'start'} gutter={20} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} lg={6}>
          <MenuHomePage
            link="/setor/criar"
            labelColor="#fff"
            backgroundColor="#1677ff"
          >
            <BankOutlined style={{ marginRight: 15 }} />
            CRIAR SETOR
          </MenuHomePage>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MenuHomePage
            link="/estacao-de-trabalho/criar"
            labelColor="#fff"
            backgroundColor="#1677ff"
          >
            <HomeOutlined style={{ marginRight: 15 }} />
            CRIAR ESTAÇÃO DE TRABALHO
          </MenuHomePage>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MenuHomePage
            link="/recursos/criar"
            labelColor="#fff"
            backgroundColor="#1677ff"
          >
            <ShoppingCartOutlined style={{ marginRight: 15 }} />
            CRIAR RECURSO
          </MenuHomePage>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col xs={24} sm={12} lg={6}>
          {' '}
          <MenuHomePage
            link="/movimento-recursos/criar"
            labelColor="#fff"
            backgroundColor="#1677ff"
          >
            <RotateLeftOutlined style={{ marginRight: 15 }} />
            CRIAR MOVIMENTO DE RECURSO
          </MenuHomePage>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MenuHomePage
            link="/tarefa/criar"
            labelColor="#fff"
            backgroundColor="#1677ff"
          >
            <ReconciliationOutlined style={{ marginRight: 15 }} />
            CRIAR TAREFA
          </MenuHomePage>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MenuHomePage
            link="/tarefa/criar"
            labelColor="#fff"
            backgroundColor="#1677ff"
          >
            <UserAddOutlined style={{ marginRight: 15 }} />
            CRIAR COLABORADOR
          </MenuHomePage>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MenuHomePage
            link="/notificacoes"
            labelColor="#fff"
            backgroundColor="#1677ff"
          >
            <BellOutlined style={{ marginRight: 15 }} />
            NOTIFICAÇÕES
          </MenuHomePage>
        </Col>
      </Row>
    </WrapperDefault>
  );
}
