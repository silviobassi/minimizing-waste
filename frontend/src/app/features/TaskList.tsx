import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Space, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import WrapperDefault from '../components/WrapperDefault';

interface TaskType {
  key: React.Key;
  id: number;
  title: string;
  workStation: string;
  startDate: Date;
  deadline: Date;
  endDate: Date;
  completed: boolean;
  approved: boolean;
}

export default function TaskList() {
  const navigate = useNavigate();

  const columns: ColumnsType<TaskType> = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: 'Título', dataIndex: 'title' },
    { title: 'Estação de Trabalho', dataIndex: 'workStation' },
    {
      title: 'Data de Início',
      dataIndex: 'startDate',
      align: 'center',
      width: 130,
    },
    {
      title: 'Data do Término',
      dataIndex: 'endDate',
      align: 'center',
      width: 130,
    },
    {
      title: 'Prazo Para Conclusão',
      dataIndex: 'deadline',
      align: 'center',
      width: 130,
    },
    {
      title: 'Finalização',
      dataIndex: 'completed',
      align: 'center',
      render(completed) {
        return <Checkbox checked={completed}>FINALIZADA</Checkbox>;
      },
    },
    {
      title: 'Verificação',
      dataIndex: 'approved',
      align: 'center',
      render(approved: boolean) {
        return <Checkbox checked={approved}>APROVADA</Checkbox>;
      },
    },

    {
      title: 'Ações',
      dataIndex: 'actions',
      align: 'center',
      width: 200,
      render: (_: any, task) => (
        <Space size={'middle'}>
          <Tooltip title={'Editar'}>
            <Button
              type={'link'}
              icon={<EditOutlined />}
              onClick={() => navigate(`/tarefa/editar/${task.id}`)}
            />
          </Tooltip>
          <Tooltip title={'Excluir'}>
            <Button type={'link'} icon={<DeleteOutlined />} />
          </Tooltip>
          <Tooltip title={'Atribuir Tarefa'}>
            <Button
              type={'link'}
              icon={<ReconciliationOutlined />}
              onClick={() => navigate(`/tarefa/atribuicao/${task.id}`)}
            />
          </Tooltip>
          <Tooltip title={'Ver Detalhes'}>
            <Button type={'link'} icon={<EyeOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const tasks: TaskType[] = [];

  for (let i = 1; i < 20; i++) {
    tasks.push({
      key: i,
      id: i,
      title: 'Instalação de Revestimento',
      workStation: `Bloco B${i * 3} Apto ${i * 9}`,
      startDate: new Date(Date.now()),
      deadline: new Date(),
      endDate: new Date(),
      completed: true,
      approved: true,
    });
  }

  return (
    <WrapperDefault title="Lista de Tarefas">
      <Table<TaskType>
        dataSource={tasks}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
      />
    </WrapperDefault>
  );
}
