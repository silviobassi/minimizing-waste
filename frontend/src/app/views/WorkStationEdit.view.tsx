import { EditOutlined, StopOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useWorkStation from '../../core/hooks/useWorkStation';
import usePageTitle from '../../core/usePageTitle';
import { WorkStation, WorkStationService } from '../../sdk';
import AccessDenied from '../components/AccessDenied';
import ElementNotFound from '../components/ElementNotFound';
import WorkStationForm from '../features/WorkStationForm';

export default function WorkStationEditView() {
  usePageTitle('Edição de Estação de Trabalho');

  const params = useParams<{ workStationId: string }>();
  const { workStation, fetchWorkStation, notFound } = useWorkStation();
  const [accessDeniedError, setAccessDeniedError] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (params.workStationId && !isNaN(Number(params.workStationId)))
      fetchWorkStation(Number(params.workStationId)).catch((err) => {
        if (err?.data?.status === 403) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });
  }, [fetchWorkStation, params.workStationId]);

  if (isNaN(Number(params.workStationId)))
    return <Navigate to={'/estacoes-de-trabalho'} />;

  if (notFound)
    return (
      <ElementNotFound description="A Estação de Trabalho não foi encontrada!" />
    );

  if (accessDeniedError)
    return <AccessDenied>Você não pode executar essa operação.</AccessDenied>;

  async function handleWorkStationUpdate(workStation: WorkStation.Input) {
    await WorkStationService.updateExistingWorkStation(
      workStation,
      Number(params.workStationId),
    ).then((workStation: WorkStation.WorkStationModel) => {
      notification.success({
        message: `Tarefa ${workStation?.name} atualizada com sucesso.`,
      });
      navigate('/estacoes-de-trabalho');
    });
  }

  return (
    <WorkStationForm
      labelRegister="Editar"
      iconButton={{
        register: <EditOutlined />,
        cancel: <StopOutlined />,
      }}
      title="Edição de Estação de Trabalho"
      workStation={workStation}
      onUpdate={handleWorkStationUpdate}
    />
  );
}
