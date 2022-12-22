import usePageTitle from '../../core/usePageTitle';
import TaskDetailed from '../features/TaskDetailed';

export default function TaskDetailedView() {
  usePageTitle('Detalhes da tarefa');

  return <TaskDetailed />;
}
