import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useSupplyMovement from '../../core/hooks/useSuppliesMovement';
import usePageTitle from '../../core/usePageTitle';
import { Supply, SupplyMovementService } from '../../sdk';
import ElementNotFound from '../components/ElementNotFound';
import SupplyMovementForm from '../features/SupplyMovementForm';

export default function SupplyMovementEditView() {
  usePageTitle('Edição de Movimento de Recurso');
  const params = useParams<{ supplyMovementId: string }>();
  const { supplyMovement, fetchSupplyMovement, notFound } = useSupplyMovement();

  useEffect(() => {
    if (params.supplyMovementId && !isNaN(Number(params.supplyMovementId)))
      fetchSupplyMovement(Number(params.supplyMovementId));
  }, [fetchSupplyMovement, params.supplyMovementId]);

  if (isNaN(Number(params.supplyMovementId)))
    return <Navigate to={'/movimento-recursos'} />;

  if (notFound)
    return (
      <ElementNotFound description="O Movimento do Recurso não foi encontrado!" />
    );

  function handleSupplyMovementUpdate(movement: Supply.MovementInput) {
    SupplyMovementService.updateExistingSupplyMovement(
      movement,
      Number(params.supplyMovementId),
    ).then((movement: Supply.MovementModel) => {
      notification.success({
        message: `Movimento do recurso ${movement?.supply?.name} atualizado com sucesso.`,
      });
    });
  }

  return (
    <SupplyMovementForm
      labelRegister="EDITAR"
      iconButton={{
        register: <SaveOutlined />,
        cancel: <StopOutlined />,
      }}
      title="Edição de Movimento de Recursos"
      supplyMovement={supplyMovement}
      onUpdate={handleSupplyMovementUpdate}
    />
  );
}
