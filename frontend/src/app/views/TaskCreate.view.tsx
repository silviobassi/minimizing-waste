import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import usePageTitle from '../../core/usePageTitle';

import TaskForm from '../features/TaskForm';

export default function TaskCreateView() {
  usePageTitle('Criação de Tarefa');

  return (
    <TaskForm
      labelRegister="CRIAR"
      iconButton={{
        register: <SaveOutlined />,
        cancel: <StopOutlined />,
      }}
      title="Criação de Tarefa"
    />
  );
}
