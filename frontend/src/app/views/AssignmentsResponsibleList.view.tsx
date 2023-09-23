import usePageTitle from '../../core/usePageTitle';
import AssignmentResponsibleList from '../features/AssignmentResponsibleList';

export default function AssignmentsResponsibleListView() {
  usePageTitle('Pesquisa de Tarefas');
  return <AssignmentResponsibleList />;
}
