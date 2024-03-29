import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import usePageTitle from '../../core/usePageTitle';
import WorkStationForm from '../features/WorkStationForm';

export default function WorkStationCreateView() {
  usePageTitle('Criação de Estação de Trabalho');

  return (
    <WorkStationForm
      labelRegister="CRIAR"
      iconButton={{
        register: <SaveOutlined />,
        cancel: <StopOutlined />,
      }}
      title="Criação de Estação de Trabalho"
    />
  );
}
