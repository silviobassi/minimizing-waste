import { Col, Descriptions, Divider, Row, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import { Supply } from '../../sdk/@types';
import WrapperDefault from '../components/WrapperDefault';

type SupplyType = Supply.Detailed;

interface SupplyProps {
  supply: SupplyType;
}

export default function SupplyDetailed(props: SupplyProps) {
  return (
    <WrapperDefault title="Detalhes do Movimento do Recurso">
      <Row justify={'space-between'} gutter={60}>
        <Col xs={24} lg={12}>
          <Row justify={'space-between'}>
            <Col xs={24}>
              <Divider orientation="left">DADOS DO RECURSO</Divider>
              <Title
                level={4}
                style={{ marginBottom: 20, textDecoration: 'underline' }}
              >
                {props.supply?.name}
              </Title>
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label={'Tipo do Recurso'}>
                  <Tag color="blue">{props.supply?.supplyType}</Tag>
                </Descriptions.Item>
                <Descriptions.Item
                  label={props.supply?.bulk ? 'Tamanho' : 'Manipulação'}
                >
                  {props.supply?.bulk ? (
                    <Tag color="blue">{props.supply?.bulk}</Tag>
                  ) : (
                    <Tag color="blue">{props.supply?.manipulation}</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label={'Quantidade'}>
                  {props.supply?.supplyDescription?.quantity}{' '}
                  {`${props.supply?.supplyDescription?.packing}(s)`}
                </Descriptions.Item>
                <Descriptions.Item label={'Quantidade por Unidade'}>
                  {props.supply?.supplyDescription?.measure}{' '}
                  <Tag color="green">
                    {`${props.supply?.supplyDescription?.measureUnitType}(s)`}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label={'Total'}>
                  {props.supply?.supplyDescription?.total}{' '}
                  <Tag color="green">
                    {`${props.supply?.supplyDescription?.measureUnitType}(s)`}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Col>
        <Col xs={24} lg={12}>
          <Row></Row>
        </Col>
      </Row>
    </WrapperDefault>
  );
}
