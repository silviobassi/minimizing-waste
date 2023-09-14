import usePageTitle from '../../core/usePageTitle';

import TaskForm from '../features/TaskForm';

export default function TaskCreateView() {
  usePageTitle('Criação de Tarefa');

  return <TaskForm title="Criação de Tarefa" />;
}
