import { EditOutlined, StopOutlined } from '@ant-design/icons';
import { Skeleton, notification } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useSupply from '../../core/hooks/useSupply';
import usePageTitle from '../../core/usePageTitle';
import { Supply, SupplyService } from '../../sdk';
import AccessDenied from '../components/AccessDenied';
import ElementNotFound from '../components/ElementNotFound';
import SupplyForm from '../features/SupplyForm';

export default function SupplyEditView() {
  usePageTitle('Edição de Recurso');

  const params = useParams<{ supplyId: string }>();
  const { supply, fetchSupply, notFound } = useSupply();
  const [accessDeniedError, setAccessDeniedError] = useState<boolean>(false);

  useEffect(() => {
    if (params.supplyId && !isNaN(Number(params.supplyId)))
      fetchSupply(Number(params.supplyId)).catch((err) => {
        if (err?.data?.status === 403) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });
  }, [fetchSupply, params.supplyId]);

  if (isNaN(Number(params.supplyId))) return <Navigate to={'/recursos'} />;

  if (notFound)
    return <ElementNotFound description="O Recurso não foi encontrado!" />;
  if (accessDeniedError)
    return <AccessDenied>Você não pode executar essa operação!</AccessDenied>;

  function handleSupplyMaterialUpdate(supply: Supply.MaterialInput) {
    SupplyService.updateExistingSupplyMaterial(
      supply,
      Number(params.supplyId),
    ).then((supply: Supply.MaterialModel) => {
      notification.success({
        message: `Recurso ${supply?.name} atualizado com sucesso.`,
      });
    });
  }

  function handleSupplyEquipmentUpdate(supply: Supply.EquipmentInput) {
    SupplyService.updateExistingSupplyEquipment(
      supply,
      Number(params.supplyId),
    ).then((supply: Supply.EquipmentModel) => {
      notification.success({
        message: `Recurso ${supply?.name} atualizado com sucesso.`,
      });
    });
  }

  if (!supply) return <Skeleton />;

  return (
    <SupplyForm
      title="Edição de Recurso"
      labelRegister="EDITAR"
      iconButton={{ register: <EditOutlined />, cancel: <StopOutlined /> }}
      onUpdateMaterial={handleSupplyMaterialUpdate}
      onUpdateEquipment={handleSupplyEquipmentUpdate}
      supply={supply}
    />
  );
}
