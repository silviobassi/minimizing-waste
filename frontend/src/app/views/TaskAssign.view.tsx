import usePageTitle from '../../core/usePageTitle';
import TaskAssignForm from '../features/TaskAssignForm';

export default function TaskAssignView() {
  usePageTitle('Atribuição de Tarefas')
  return <TaskAssignForm />;
}
