import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import usePageTitle from '../../core/usePageTitle';
import SupplyForm from '../features/SupplyForm';

export default function SupplyCreateView() {
  usePageTitle('Criação de Recurso')

  return (
    <SupplyForm
      title="Criação de Recurso"
      labelRegister="CRIAR"
      iconButton={{ register: <SaveOutlined />, cancel: <StopOutlined /> }}
    />
  );
}