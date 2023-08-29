import usePageTitle from '../../core/usePageTitle';
import AssignmentList from '../features/TaskList';

export default function TaskListView() {
  usePageTitle('Lista de Tarefas');
  return <AssignmentList />;
}
