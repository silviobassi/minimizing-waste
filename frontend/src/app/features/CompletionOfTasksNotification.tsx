import { useEffect } from 'react';
import useCommunications from '../../core/hooks/useCommunications';

import NotificationAssignments from '../components/NotificationAssignments';

export default function CompletionOfTasksNotification() {
  const { assignmentsCompleted, fetchAssignmentsCompleted } =
    useCommunications();

  useEffect(() => {
    fetchAssignmentsCompleted();
  }, [fetchAssignmentsCompleted]);

  return (
    <NotificationAssignments
      title="Tarefas Concluídas"
      assignments={assignmentsCompleted}
    />
  );
}
