import { useEffect } from 'react';
import useCommunications from '../../core/hooks/useCommunications';

import NotificationAssignments from '../components/NotificationAssignments';

export default function ApprovedTasksNotification() {
  const { assignmentsApproved, fetchAssignmentsApproved } = useCommunications();

  useEffect(() => {
    fetchAssignmentsApproved();
    console.log(assignmentsApproved);
  }, [fetchAssignmentsApproved]);

  return (
    <NotificationAssignments
      title="Tarefas Aprovadas"
      assignments={assignmentsApproved}
    />
  );
}
