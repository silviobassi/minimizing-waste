import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useSupply from '../../core/hooks/useSupply';
import usePageTitle from '../../core/usePageTitle';
import AccessDenied from '../components/AccessDenied';
import ElementNotFound from '../components/ElementNotFound';
import SupplyDetailed from '../features/SupplyDetailed';

export default function SupplyDetailedView() {
  usePageTitle('Detalhes do Recurso');

  const params = useParams<{ supplyId: string }>();
  const { fetchSupply, supply, notFound } = useSupply();
  const [accessDeniedError, setAccessDeniedError] = useState(false);

  useEffect(() => {
    if (!isNaN(Number(params.supplyId))) {
      fetchSupply(Number(params.supplyId)).catch((err) => {
        if (err?.data?.status === 403) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });

      console.log(supply)
    }
  }, [fetchSupply, params.supplyId]);

  if (isNaN(Number(params.supplyId))) return <Navigate to={'/recursos'} />;

  if (notFound) return <ElementNotFound description="Recurso não encontrado" />;
  if (accessDeniedError)
    return <AccessDenied>Esses dados não podem ser visualizados!</AccessDenied>;
  if (!supply) return <Skeleton />;

  return <SupplyDetailed supply={supply} />;
}
