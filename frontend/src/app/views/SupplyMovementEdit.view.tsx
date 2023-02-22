import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import usePageTitle from '../../core/usePageTitle';
import SupplyMovementForm from '../features/SupplyMovementForm';

export default function SupplyMovementEditView() {
  usePageTitle('Edição de Movimento de Recurso');

  return (
    <SupplyMovementForm
      labelRegister="EDITAR"
      iconButton={{
        register: <SaveOutlined />,
        cancel: <StopOutlined />,
      }}
      title="Edição de Movimento de Recursos"
    />
  );
}
