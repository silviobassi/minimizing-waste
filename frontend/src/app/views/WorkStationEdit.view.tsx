import { EditOutlined, StopOutlined } from '@ant-design/icons';
import usePageTitle from '../../core/usePageTitle';
import WorkStationForm from '../features/WorkStationForm';

export default function WorkStationEditView() {
  usePageTitle('Edição de Estação de Trabalho');

  return (
    <WorkStationForm
      labelRegister="Editar"
      iconButton={{
        register: <EditOutlined />,
        cancel: <StopOutlined />,
      }}
      title="Edição de Estação de Trabalho"
    />
  );
}
