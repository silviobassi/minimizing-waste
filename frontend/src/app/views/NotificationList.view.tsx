import { Col, Divider, Form, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import usePageTitle from '../../core/usePageTitle';
import ApprovedTasksNotification from '../features/ApprovedTasksNotification';
import CompletionOfTasksNotification from '../features/CompletionOfTasksNotification';
import EmployeeTasksAssignNotification from '../features/EmployeeTasksAssignNotification.tsx';
import ExpiredTasksNotification from '../features/ExpiredTasksNotification';
import SupplyAvailableNotification from '../features/SupplyAvailableNotification';

export default function NotificationListView() {
  usePageTitle('Listas de Notificações');
  const [notificationType, setNotificationType] = useState<any>('available');
  const [accessDeniedError, setAccessDeniedError] = useState(false);

  useEffect(() => {
    // implementar o component de acesso negado
  });

  const notifications: any = {
    available: <SupplyAvailableNotification />,
    taskCompleted: <CompletionOfTasksNotification />,
    approvedTasks: <ApprovedTasksNotification />,
    expiredTasks: <ExpiredTasksNotification />,
    tasksAssign: <EmployeeTasksAssignNotification />,
  };

  const handleChange = (value: string) => {
    setNotificationType(value);
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
