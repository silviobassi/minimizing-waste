import { Col, Divider, Form, Row, Select } from 'antd';
import { useState } from 'react';
import usePageTitle from '../../core/usePageTitle';
import ApprovedTasks from '../features/ApprovedTasks';
import CompletionOfTasks from '../features/CompletionOfTasks';
import EmployeeAllocationNotification from '../features/EmployeeAllocationNotification';
import EmployeeTasksAssignNotification from '../features/EmployeeTasksAssignNotification.tsx';
import ExpiredTasksNotification from '../features/ExpiredTasksNotification';
import SupplyAvailableNotification from '../features/SupplyAvailableNotification';

export default function NotificationListView() {
  usePageTitle('Listas de Notificações');
  const [notificationType, setNotificationType] = useState<any>('available');

  const notifications: any = {
    available: <SupplyAvailableNotification />,
    allocation: <EmployeeAllocationNotification />,
    taskCompleted: <CompletionOfTasks />,
    approvedTasks: <ApprovedTasks />,
    expiredTasks: <ExpiredTasksNotification />,
    tasksAssign: <EmployeeTasksAssignNotification />,
  };

  const handleChange = (value: string) => {
    setNotificationType(value);
    console.log(notifications[notificationType]);
  };

  return (
    <>
      <Row justify={'start'}>
        <Col xs={7}>
          <Form layout="vertical">
            <Form.Item label="Tipo da Notificações:*">
              <Select
                size="large"
                defaultValue="available"
                onChange={handleChange}
                options={[
                  {
                    label: 'Disponibilidade de Recursos',
                    value: 'available',
                  },
                  {
                    label: 'Alocação de Colaboradores',
                    value: 'allocation',
                  },
                  {
                    label: 'Conclusão de Tarefas',
                    value: 'taskCompleted',
                  },
                  {
                    label: 'Tarefas Aprovadas',
                    value: 'approvedTasks',
                  },
                  {
                    label: 'Tarefas com Prazos Expirados',
                    value: 'expiredTasks',
                  },
                  {
                    label: 'Atribuição de Tarefas aos Colaboradores',
                    value: 'tasksAssign',
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Divider />
        </Col>
      </Row>
      {notifications[notificationType]}
    </>
  );
}
