import usePageTitle from '../../core/usePageTitle';
import EmployeeList from '../features/EmployeeList';
export default function EmployeeListView() {
  usePageTitle('Lista de Colaboradores');
  return <EmployeeList />;
}
