import usePageTitle from '../../core/usePageTitle';
import EmployeeDetailed from '../features/EmployeeDetailed';

export default function EmployeeDetailedView() {
  usePageTitle('Detalhes do Colaborador');

  return <EmployeeDetailed />;
}
