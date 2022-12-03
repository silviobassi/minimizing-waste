import { DeleteOutlined, EditOutlined, ReconciliationOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import TableCustom from '../features/TableCustom';

interface TaskType {
  key: React.Key;
  id: number;
  title: string;
  workStation: string;
  nature: string;
  startDate: Date;
  deadline: Date;
  endDate: Date;
  completed: string;
  approved: string;
}

const columns: ColumnsType<TaskType> = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Título', dataIndex: 'title' },
  { title: 'Estação de Trabalho', dataIndex: 'workStation' },
  { title: 'Natureza da Tarefa', dataIndex: 'nature' },
  { title: 'Data de Início', dataIndex: 'startDate' },
  { title: 'Data do Término', dataIndex: 'endDate' },
  { title: 'Prazo Para Conclusão', dataIndex: 'deadline' },
  { title: 'Finalização', dataIndex: 'completed' },
  { title: 'Verificação', dataIndex: 'approved' },
  {
    title: 'Ações',
    dataIndex: 'actions',
    render: (_: any, workstation) => (
      <Space size={'middle'}>
        <Tooltip title={'Editar'}>
          <Button type={'primary'} shape={'circle'} icon={<EditOutlined />} />
        </Tooltip>
        <Tooltip title={'Excluir'}>
          <Button type={'primary'} shape={'circle'} icon={<DeleteOutlined />} />
        </Tooltip>
        <Tooltip title={'Atribuir Tarefa'}>
          <Button type={'primary'} shape={'circle'} icon={<ReconciliationOutlined />} />
        </Tooltip>
      </Space>
    ),
  },
];

const data: TaskType[] = [];

for (let i = 1; i < 20; i++) {
  data.push({
    key: i,
    id: i,
    title: 'string',
    workStation: `Bloco B${i * 3} Apto ${i * 9}`,
    nature: i % 2 == 0 ? 'OBRAS' : 'LIMPEZA',
    startDate: '22/01/2022',
    deadline: new Date(Date.now().toLocaleString),
    endDate: new Date(Date.now().toLocaleString),
    completed: 'FINALIZADA',
    approved: 'APROVADA',
  });
}

export default function TaskView() {
  return (
    <TableCustom
      data={data}
      columns={columns}
      buttonAndTableColWidth={18}
      createButtonLabel={'CRIAR TAREFAS'}
      tablePageSize={7}
    />
  );
}
