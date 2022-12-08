import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import SupplyForm from '../features/SupplyForm';

export default function SupplyCreateView() {
  return (
    <SupplyForm
      title="Criação de Recurso"
      labelRegister="CRIAR"
      iconButton={{ register: <SaveOutlined />, cancel: <StopOutlined /> }}
    />
  );
}
