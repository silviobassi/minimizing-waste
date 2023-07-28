import { EditOutlined, StopOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useWorkStation from '../../core/hooks/useWorkStation';
import usePageTitle from '../../core/usePageTitle';
import { WorkStation, WorkStationService } from '../../sdk';
import ElementNotFound from '../components/ElementNotFound';
import WorkStationForm from '../features/WorkStationForm';

export default function WorkStationEditView() {
  usePageTitle('Edição de Estação de Trabalho');

  const params = useParams<{ workStationId: string }>();
  const { workStation, fetchWorkStation, notFound } = useWorkStation();

  useEffect(() => {
    if (params.workStationId && !isNaN(Number(params.workStationId)))
      fetchWorkStation(Number(params.workStationId));
  }, [fetchWorkStation, params.workStationId]);

  if (isNaN(Number(params.workStationId)))
    return <Navigate to={'/estacoes-de-trabalho'} />;

  if (notFound)
    return (
      <ElementNotFound description="A Estação de Trabalho não foi encontrada!" />
    );

  function handleWorkStationUpdate(workStation: WorkStation.Input) {
    WorkStationService.updateExistingWorkStation(
      workStation,
      Number(params.workStationId),
    ).then((workStation: WorkStation.WorkStationModel) => {
      notification.success({
        message: `Tarefa ${workStation?.name} atualizada com sucesso.`,
      });
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
