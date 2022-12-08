import { EditOutlined, StopOutlined } from '@ant-design/icons';
import SupplyForm from '../features/SupplyForm';

export default function SupplyEditView() {
  return (
    <SupplyForm
      title="Edição de Recurso"
      labelRegister="EDITAR"
      iconButton={{ register: <EditOutlined />, cancel: <StopOutlined /> }}
    />
  );
}
