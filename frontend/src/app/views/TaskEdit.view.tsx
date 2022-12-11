import { EditOutlined, StopOutlined } from '@ant-design/icons';
import usePageTitle from '../../core/usePageTitle';
import TaskForm from '../features/TaskForm';

export default function TaskEditView() {
  usePageTitle('Edição de Tarefa');

  return (
    <TaskForm
      labelRegister="CRIAR"
      iconButton={{
        register: <EditOutlined />,
        cancel: <StopOutlined />,
      }}
      title="Edição de Tarefa"
    />
  );
}
