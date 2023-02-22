import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import usePageTitle from '../../core/usePageTitle';
import SupplyMovementForm from '../features/SupplyMovementForm';

export default function SupplyMovementCreateView() {
  usePageTitle('Criação de Movimento de Recurso');

  return (
    <SupplyMovementForm
      labelRegister="CRIAR"
      iconButton={{
        register: <SaveOutlined />,
        cancel: <StopOutlined />,
      }}
      title="Criação de Movimento de Recursos"
    />
  );
}
