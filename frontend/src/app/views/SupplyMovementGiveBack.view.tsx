import { RollbackOutlined, StopOutlined } from '@ant-design/icons';
import usePageTitle from '../../core/usePageTitle';
import SupplyMovementGiveBackForm from '../features/SupplyMovementGiveBackForm';

export default function SupplyMovementGiveBackView() {
  usePageTitle('Devolução de Recurso');

  return (
    <SupplyMovementGiveBackForm
      labelRegister="DEVOLVER"
      iconButton={{
        register: <RollbackOutlined />,
        cancel: <StopOutlined />,
      }}
      title="Devolução de Recurso"
    />
  );
}
