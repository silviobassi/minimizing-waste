import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import usePageTitle from '../../core/usePageTitle';
import EmployeeForm from '../features/EmployeeForm';

export default function EmployeeEditView() {
  usePageTitle('Edição de Colaborador');

  return (
    <EmployeeForm
      title="Edição de Colaborador"
      labelRegister="CRIAR"
      iconButton={{ register: <SaveOutlined />, cancel: <StopOutlined /> }}
    />
  );
}
