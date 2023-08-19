import { Col, Descriptions, Divider, Row, Space, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import { Supply } from '../../sdk';
import EmployeesResponsible from '../components/EmployeesResponsible';
import NotificationDescription from '../components/NotificationDescription';
import WrapperDefault from '../components/WrapperDefault';

type SupplyMovementType = Supply.MovementModel;

interface SupplyMovementProps {
  supplyMovement: SupplyMovementType;
}

export default function SupplyMovementDetailed(props: SupplyMovementProps) {
  return (
    <WrapperDefault title="Detalhes do Movimento do Recurso">
      <Row justify={'space-between'} gutter={60}>
        <Col xs={24} lg={12}>
          <Row justify={'space-between'}>
            <Col xs={24}>
              <Divider orientation="left">
                DADOS DO MOVIMENTO DO RECURSO
              </Divider>
              <Title
                level={4}
                style={{ marginBottom: 20, textDecoration: 'underline' }}
              >
                {props?.supplyMovement?.supply?.name}
              </Title>
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label={'Desocupado?'}>
                  <Space direction="horizontal">
                    {props.supplyMovement?.notBusy ? (
                      <Tag color="blue">DESOCUPADO</Tag>
                    ) : (
                      <Tag color="red">OCUPADO</Tag>
                    )}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label={'Movimentável?'}>
                  <Space direction="horizontal">
                    {props.supplyMovement?.movable ? (
                      <Tag color="blue">MOVIMENTÁVEL</Tag>
                    ) : (
                      <Tag color="red">IMOVIMENTÁVEL</Tag>
                    )}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label={'Quantidade Alocada'}>
                  {props.supplyMovement?.allocatedQuantity} UNIDADE
                </Descriptions.Item>
                <Descriptions.Item label={'Quantidade Disponível'}>
                  {props.supplyMovement?.supply?.supplyDescription?.quantity}{' '}
                  UNIDADE
                </Descriptions.Item>
                <Descriptions.Item label={'Quantidade em Espécie'}>
                  {props.supplyMovement?.supply?.supplyDescription?.total} {' '}
                  {
                    props.supplyMovement?.supply?.supplyDescription
                      ?.measureUnitType
                  }
                </Descriptions.Item>
                <Descriptions.Item label={'Setor'}>
                  {props?.supplyMovement?.workStation?.sector?.name}
                </Descriptions.Item>
                <Descriptions.Item label={'Estação de Trabalho'}>
                  {props?.supplyMovement?.workStation?.name}
                </Descriptions.Item>
                <Descriptions.Item label={'Localização'}>
                  {props?.supplyMovement?.workStation?.localization}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Col>
        <Col xs={24} lg={12}>
          <Row>
            <Space direction="vertical">
              <Col xs={24}>
                <Divider orientation="left">RESPONSÁVEL PELO RECURSO</Divider>
                <EmployeesResponsible
                  employeeResponsible={
                    props?.supplyMovement?.employeeResponsible
                  }
                />
              </Col>
              <Col xs={24}>
                <NotificationDescription
                  notification={props.supplyMovement?.notification}
                />
              </Col>
            </Space>
          </Row>
        </Col>
      </Row>
    </WrapperDefault>
  );
}
