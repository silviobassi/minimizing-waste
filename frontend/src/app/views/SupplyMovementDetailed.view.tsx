import { Card, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useSuppliesMovement from '../../core/hooks/useSuppliesMovement';
import usePageTitle from '../../core/usePageTitle';
import AccessDenied from '../components/AccessDenied';
import SupplyMovementDetailed from '../features/SupplyMovementDetailed';

export default function SupplyMovementDetailedView() {
  usePageTitle('Detalhes do Movimento do Recurso');

  const params = useParams<{ supplyMovementId: string }>();
  const { fetchSupplyMovement, supplyMovement, notFound } =
    useSuppliesMovement();
  const [accessDeniedError, setAccessDeniedError] = useState(false);

  useEffect(() => {
    if (!isNaN(Number(params.supplyMovementId))) {
      fetchSupplyMovement(Number(params.supplyMovementId)).catch((err) => {
        if (err?.data?.status === 403) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });
    }
  }, [fetchSupplyMovement, params.supplyMovementId]);

  if (accessDeniedError) return <AccessDenied />;

  if (isNaN(Number(params.supplyMovementId)))
    return <Navigate to={'/movimento-recursos'} />;

  if (notFound) return <Card>tarefa não encontrada</Card>;
  if (accessDeniedError) return <AccessDenied />;
  if (!supplyMovement) return <Skeleton />;

  return <SupplyMovementDetailed supplyMovement={supplyMovement} />;
}
