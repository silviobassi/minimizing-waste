import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import usePageTitle from '../../core/usePageTitle';
import EmployeeForm from '../features/EmployeeForm';

export default function EmployeeCreateView() {
  usePageTitle('Criação de Colaborador');

  return (
    <EmployeeForm
      title="Criação de Colaborador"
    />
  );
}
