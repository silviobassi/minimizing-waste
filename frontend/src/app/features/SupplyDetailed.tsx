import { Col, Divider, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Supply } from '../../@types';
import SupplyService from '../../services/Supply.service';
import WrapperDefault from '../components/WrapperDefault';

export default function SupplyDetailed() {
  const params = useParams<{ supplyId: string }>();
  const [supply, setSupply] = useState<Supply.Detailed>();

  useEffect(() => {
    SupplyService.fetchSupply(Number(params.supplyId)).then(setSupply);
  }, [setSupply, params.supplyId]);

  return (
    <WrapperDefault title="Detalhes do Recurso">
      <Row justify={'start'}>
        <Col xs={24} xl={24}>
        <Divider orientation="left">DADOS DO RECURSO</Divider>
          <p>
            <strong>Nome: </strong>
            {supply?.name}
          </p>
          <p>
            <strong>Tipo do Recurso: </strong>
            {supply?.manipulation}
            {supply?.bulk}
          </p>
          <Divider orientation="left">DESCRIÇÃO DO RECURSO</Divider>

          <p>
            <strong>Empacotamento: </strong>
            {supply?.supplyDescription.packing}
          </p>
          <p>
            <strong>Quantidade: </strong>
            {supply?.supplyDescription.quantity}
          </p>
          <p>
            <strong>Medida: </strong>
            {supply?.supplyDescription.measure}
          </p>
          <p>
            <strong>Medida: </strong>
            {`${supply?.supplyDescription.total} ${supply?.supplyDescription.measureUnitType}`}
          </p>
        </Col>
      </Row>
    </WrapperDefault>
  );
}
