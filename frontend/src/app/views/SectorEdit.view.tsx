import { EditOutlined, StopOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useSector from '../../core/hooks/useSector';
import usePageTitle from '../../core/usePageTitle';
import { Sector, SectorService } from '../../sdk';
import AccessDenied from '../components/AccessDenied';
import ElementNotFound from '../components/ElementNotFound';
import SectorForm from '../features/SectorForm';

export default function SetorEditView() {
  usePageTitle('Edição de Setor');
  const params = useParams<{ sectorId: string }>();
  const { sector, fetchSector, notFound } = useSector();
  const [accessDeniedError, setAccessDeniedError] = useState<boolean>(false);

  useEffect(() => {
    if (params.sectorId && !isNaN(Number(params.sectorId)))
      fetchSector(Number(params.sectorId)).catch((err) => {
        if (err?.data?.status === 403) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });
  }, [fetchSector, params.sectorId]);

  if (isNaN(Number(params.sectorId))) return <Navigate to={'/setores'} />;

  if (notFound)
    return <ElementNotFound description="O Setor não foi encontrado!" />;

  if (accessDeniedError) return <AccessDenied />;

  function handleSectorUpdate(sector: Sector.Input) {
    SectorService.updateExistingSector(sector, Number(params.sectorId)).then(
      (sector: Sector.SectorModel) => {
        notification.success({
          message: `Setor ${sector?.name} atualizado com sucesso.`,
        });
      },
    );
  }

  return (
    <SectorForm
      labelRegister="EDITAR"
      iconButton={{
        register: <EditOutlined />,
        cancel: <StopOutlined />,
      }}
      title="Edição de Setor"
      sector={sector}
      onUpdate={handleSectorUpdate}
    />
  );
}
