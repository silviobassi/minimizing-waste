import { EditOutlined, StopOutlined } from '@ant-design/icons';
import usePageTitle from '../../core/usePageTitle';
import SupplyForm from '../features/SupplyForm';

export default function SupplyEditView() {
  usePageTitle('Edição de Recurso')

  return (
    <SupplyForm
      title="Edição de Recurso"
      labelRegister="EDITAR"
      iconButton={{ register: <EditOutlined />, cancel: <StopOutlined /> }}
    />
  );
}
